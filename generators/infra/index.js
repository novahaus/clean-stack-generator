const Generator = require("yeoman-generator");

const rootData = require("../../source/constants/root");
const infraData = require("../../source/constants/infra");
const utilsData = require("../../source/constants/utils");
const { chosenDataSources } = require("../../source/constants/data");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  get rootPath() {
    const { baseSourcePath } = rootData;
    const { folder } = infraData;

    return `${baseSourcePath}/${folder}`;
  }

  async prompting() {
    const autoIncludedServices = this._getChosenServices();

    this.answers = await this.prompt([
      {
        type: "checkbox",
        name: "services",
        message: "Services",
        choices: infraData.infras.map((choice) => ({
          ...choice,
          disabled:
            autoIncludedServices.includes(choice.value) &&
            `Automatically added.`,
        })),
      },
    ]);

    this.answers.services.push(...autoIncludedServices);

    utilsData.usedUtils.push(
      ...this.answers.services
        .map((service) => this._getServiceData(service))
        .filter((serviceData) => serviceData.utils.length)
        .map((serviceData) => serviceData.utils)
        .flat()
    );

    infraData.setUsedServices(this.answers.services);
  }

  writing() {
    this._writeInfraFiles();
  }

  _writeInfraFiles() {
    const { baseSourcePath } = rootData;

    this.answers.services.forEach((service) => {
      const serviceData = this._getServiceData(service);

      // service
      this.fs.copy(
        this.templatePath(`${serviceData.value}/services/**`),
        this.destinationPath(`${baseSourcePath}/services`)
      );

      // infra
      this.fs.copy(
        this.templatePath(`${serviceData.value}/infra/**`),
        this.destinationPath(this.rootPath)
      );
    });
  }

  async installDeps() {
    const deps = this._getSelectedServicesDependencies();

    await this.addDependencies(deps.dependencies);
    await this.addDevDependencies(deps.devDependencies);
  }

  _getSelectedServicesDependencies() {
    return this.answers.services.reduce(
      (acc, service) => {
        const { dependencies, devDependencies } = this._getServiceData(service);

        acc.dependencies.push(...dependencies);
        acc.devDependencies.push(...devDependencies);

        return acc;
      },
      { dependencies: [], devDependencies: [] }
    );
  }

  _getServiceData(serviceName) {
    return infraData.infras.find((service) => service.value === serviceName);
  }

  _getChosenServices() {
    return infraData.infras
      .filter((service) =>
        chosenDataSources.some((source) =>
          source.serviceDependency.includes(service.value)
        )
      )
      .map((source) => source.value);
  }
};
