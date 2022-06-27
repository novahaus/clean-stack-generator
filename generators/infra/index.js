const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');
const infraData = require('../../source/constants/infra');

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
  }

  writing() {
    this._writeInfraFiles();
  }

  _writeInfraFiles() {
    this.answers.services.forEach((service) => {
      const serviceData = this._getServiceData(service);

      this.fs.copy(
        this.templatePath(`${serviceData.fileName}.ts`),
        this.destinationPath(`${this.rootPath}/${serviceData.fileName}.ts`)
      );
    });
  }

  _getServiceData(serviceName) {
    return infraData.infras.find((service) => service.value === serviceName);
  }
};
