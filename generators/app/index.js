const Generator = require('yeoman-generator');
const rootData = require('../../source/constants/root');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.composeWith(require.resolve('../logger'));
    this.composeWith(require.resolve('../core'));
    this.composeWith(require.resolve('../domain'));
    this.composeWith(require.resolve('../presentation'));
    this.composeWith(require.resolve('../services'));
    this.composeWith(require.resolve('../infra'));
    this.composeWith(require.resolve('../utils'));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: 'Novahaus',
      },
    ]);

    // package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.answers.name,
        author: this.answers.author,
      }
    );
  }

  configuring() {
    this._writeConfigFiles();
  }

  _writeConfigFiles() {
    // .editorconfig
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    // // .gitignore
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    // tsconfig
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    // eslintrc
    this.fs.copy(
      this.templatePath('.eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );

    // eslintignore
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );

    // prettierrc
    this.fs.copy(
      this.templatePath('.prettierrc.json'),
      this.destinationPath('.prettierrc.json')
    );

    // prettierignore
    this.fs.copy(
      this.templatePath('.prettierignore'),
      this.destinationPath('.prettierignore')
    );

    // commitlint
    this.fs.copy(
      this.templatePath('commitlint.config.js'),
      this.destinationPath('commitlint.config.js')
    );

    // cypress
    this.fs.copy(
      this.templatePath('cypress.json'),
      this.destinationPath('cypress.json')
    );

    // jest
    this.fs.copy(
      this.templatePath('jest.config.js'),
      this.destinationPath('jest.config.js')
    );

    // env files
    this.fs.write('.env', '');
    this.fs.write('.env.example', '');
  }

  async installDeps() {
    await this.addDependencies(['dotenv']);
    await this.addDevDependencies(rootData.devDependencies);
    await this.addDevDependencies(rootData.devDependenciesSpecifics);
  }
};
