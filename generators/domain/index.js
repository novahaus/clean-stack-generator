const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');
const domainData = require('../../source/constants/domain');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  writing() {
    this._setupFolderStructure();
  }

  _setupFolderStructure() {
    const { baseSourcePath } = rootData;

    domainData.foldersToGitkeep.forEach((folderName) =>
      this.fs.write(`${baseSourcePath}/domain/${folderName}/.gitkeep`, '')
    );
  }
};
