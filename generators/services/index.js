const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  writing() {
    this._setupServiceFiles();
  }

  _setupServiceFiles() {
    const { baseSourcePath } = rootData;

    this.fs.copy(
      this.templatePath('services/**/*.ts'),
      this.destinationPath(`${baseSourcePath}/services`)
    );
  }
};
