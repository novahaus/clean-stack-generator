const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');
const infraData = require('../../source/constants/infra');
const utilsData = require('../../source/constants/utils');

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
    this.answers = await this.prompt([
      {
        type: 'checkbox',
        name: 'services',
        message: 'Services',
        choices: infraData.infras,
      },
    ]);

    utilsData.usedUtils.push(
      ...this.answers.services
        .map((service) => this._getServiceData(service))
        .filter((serviceData) => serviceData.utils.length)
        .map((serviceData) => serviceData.utils)
        .flat()
    );
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
};
