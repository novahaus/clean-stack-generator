const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  writing() {
    this._writeUtilsFiles();
  }

  _writeUtilsFiles() {
    const { baseSourcePath } = rootData;

    this.fs.copy(
      this.templatePath('queryString.ts'),
      this.destinationPath(`${baseSourcePath}/utils/queryString.ts`)
    );
  }

  async installDeps() {
    await this.addDependencies(['qs']);
  }
};
