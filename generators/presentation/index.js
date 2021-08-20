const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');
const presentationData = require('../../source/constants/presentation');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  get rootPath() {
    const { baseSourcePath } = rootData;
    const { folder } = presentationData;

    return `${baseSourcePath}/${folder}`;
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'ui',
        message: 'Css lib',
        choices: presentationData.cssLibs,
      },
      {
        type: 'confirm',
        name: 'pwa',
        message: 'Setup PWA ?',
      },
    ]);
  }

  configuring() {
    const packageFile = this.fs.readJSON(this.destinationPath('package.json'));

    this.fs.extendJSON(this.destinationPath('package.json'), {
      ...packageFile,
      scripts: {
        ...packageFile.scripts,
        dev: 'env-cmd next dev $npm_package_config_nextpath',
        build:
          'env-cmd --no-override next build $npm_package_config_nextpath && next export $npm_package_config_nextpath -o dist',
        start: 'env-cmd next start $npm_package_config_nextpath',
      },
    });
  }

  writing() {
    this._setupFolderStructure();
    this._writeConfigFiles();
    this._writeHomeFile();
    this._writeUiFrameworkFiles();
  }

  _setupFolderStructure() {
    presentationData.foldersToGitKeep.forEach((folderName) =>
      this.fs.write(`${this.rootPath}/${folderName}/.gitkeep`, '')
    );
  }

  _writeConfigFiles() {
    // next-env
    this.fs.copy(
      this.templatePath('next-env.d.ts'),
      this.destinationPath(`${this.rootPath}/next-env.d.ts`)
    );

    // tsconfig
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath(`${this.rootPath}/tsconfig.json`)
    );
  }

  _writeHomeFile() {
    this.fs.copy(
      this.templatePath('pages/index.tsx'),
      this.destinationPath(`${this.rootPath}/pages/index.tsx`)
    );
  }

  _writeUiFrameworkFiles() {
    this[`_${this.answers.ui}`]();
  }

  async installDeps() {
    const uiData = this._getUiData();

    await this.addDependencies([
      '@next/bundle-analyzer',
      '@svgr/webpack',
      'next',
      'react',
      'react-dom',
      ...uiData.dependencies,
    ]);
    await this.addDevDependencies(['@types/react', ...uiData.devDependencies]);
  }

  _getUiData() {
    return presentationData.cssLibs.find(
      (cssLib) => cssLib.value === this.answers.ui
    );
  }

  [`_${presentationData.cssLibEnum.MUI}`]() {
    this.fs.copy(
      this.templatePath('ui/mui/_document.tsx'),
      this.destinationPath(`${this.rootPath}/pages/_document.tsx`)
    );

    this.fs.copyTpl(
      this.templatePath('ui/mui/_app.tsx'),
      this.destinationPath(`${this.rootPath}/pages/_app.tsx`)
    );

    this.fs.copy(
      this.templatePath('ui/mui/theme/**/*.ts'),
      this.destinationPath(`${this.rootPath}/theme`)
    );
  }

  [`_${presentationData.cssLibEnum.TAILWIND}`]() {
    this.fs.copyTpl(
      this.templatePath('ui/tailwind/_app.tsx'),
      this.destinationPath(`${this.rootPath}/pages/_app.tsx`)
    );

    this.fs.copy(
      this.templatePath('ui/tailwind/styles/**/*.css'),
      this.destinationPath(`${this.rootPath}/styles`)
    );

    // tailwind config
    this.fs.copy(
      this.templatePath('ui/tailwind/tailwind.config.js'),
      this.destinationPath('tailwind.config.js')
    );

    // postcss config
    this.fs.copy(
      this.templatePath('ui/tailwind/postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );
  }
};
