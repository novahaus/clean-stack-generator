const Generator = require("yeoman-generator");
const rootData = require("../../source/constants/root");
const dataLayerData = require("../../source/constants/data");
const { usedServices } = require("../../source/constants/infra");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  get rootPath() {
    const { baseSourcePath } = rootData;
    const { folder } = dataLayerData;

    return `${baseSourcePath}/${folder}`;
  }

  _filterAvailableDataSources() {
    return dataLayerData.dataSources.filter((source) => {
      if (!source.serviceDependency.length) return true;

      return usedServices.some((service) =>
        source.serviceDependency.includes(service)
      );
    });
  }

  _writeDataFiles() {
    const { baseSourcePath } = rootData;

    this.answers.dataSources.forEach((service) => {
      this.fs.write(`${baseSourcePath}/data/${service}/models/.gitkeep`, '');

      try {
        this.fs.copy(
          this.templatePath(`${service}/modules/**`),
          this.destinationPath(`${baseSourcePath}/data/${service}/modules`)
        );
      } catch (error) {
        this.fs.write(`${baseSourcePath}/data/${service}/modules/.gitkeep`, '');
      }
    });
  }

  async prompting() {
    const choices = this._filterAvailableDataSources(dataLayerData.dataSources);

    this.answers = await this.prompt([
    {
        type: "checkbox",
        name: "dataSources",
        message: "Data sources",
        choices,
      },
    ]);
  }

  writing() {
    this._writeDataFiles();
  }

  async installDeps() {}
};
