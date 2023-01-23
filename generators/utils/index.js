const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');
const utilsData = require('../../source/constants/utils');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  writing() {
    this._writeUtilsFiles();
  }

  _writeUtilsFiles() {
    const { baseSourcePath } = rootData;
    const importedUtils = utilsData.usedUtils;

    importedUtils.forEach((util) => {
      const { fileName, dependencies } = this._getUtilData(util);

      this.fs.copy(
        this.templatePath(`${fileName}.ts`),
        this.destinationPath(`${baseSourcePath}/utils/${fileName}.ts`)
      );
    });
  }

  _getUtilData(utilName) {
    return utilsData.utils.find((util) => util.value === utilName);
  }

  async installDeps() {
    const deps = this._getSelectedServicesDependencies();

    await this.addDependencies(deps.dependencies);
    await this.addDevDependencies(deps.devDependencies);
  }

  _getSelectedServicesDependencies() {
    return utilsData.usedUtils.reduce(
      (acc, util) => {
        const { dependencies, devDependencies } = this._getUtilData(util);

        acc.dependencies.push(...dependencies);
        acc.devDependencies.push(...devDependencies);

        return acc;
      },
      { dependencies: [], devDependencies: [] }
    );
  }
};
