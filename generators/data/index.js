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

    this.answers.dataSources.forEach(({data: source}) => {
      this.fs.write(`${baseSourcePath}/data/${source}/models/.gitkeep`, '');

      try {
        this.fs.copy(
          this.templatePath(`${source}/modules/**`),
          this.destinationPath(`${baseSourcePath}/data/${source}/modules`)
        );
      } catch (error) {
        this.fs.write(`${baseSourcePath}/data/${source}/modules/.gitkeep`, '');
      }
    });
  }

  async prompting() {
    this.answers = await this.prompt([
    {
        type: "checkbox",
        name: "dataSources",
        message: "Data sources",
        choices: dataLayerData.dataSources,
      },
    ]);

    dataLayerData.setUsedDataSources(this.answers.dataSources);
  }

  writing() {
    this._writeDataFiles();
  }

  async installDeps() {}
};
