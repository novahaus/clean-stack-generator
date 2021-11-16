const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');
const infraData = require('../../source/constants/infra');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
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
    const { baseSourcePath } = rootData;

    this.fs.write(`${baseSourcePath}/infra/index.ts`, '');

    this.answers.services.forEach((service) => {
      const serviceData = this._getServiceData(service);
      const async = this.async();

      this.fs.append(
        `${baseSourcePath}/infra/index.ts`,
        `export * from './${serviceData.fileName}'`
      );

      async();
    });
  }

  _getServiceData(serviceName) {
    return infraData.infras.find((service) => service.value === serviceName);
  }
};
