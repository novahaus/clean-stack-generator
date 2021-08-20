const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  writing() {
    const { baseSourcePath } = rootData;

    this.fs.copy(
      this.templatePath('**/*.ts'),
      this.destinationPath(`${baseSourcePath}/core`)
    );
  }
};
