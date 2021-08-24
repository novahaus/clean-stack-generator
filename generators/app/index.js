const Generator = require('yeoman-generator');
const terminal = require('../../source/utils/terminal');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.composeWith(require.resolve('../core'));
    this.composeWith(require.resolve('../domain'));
    this.composeWith(require.resolve('../presentation'));

    this._logStart();
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

    // .gitignore
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

  _logStart() {
    const packageFile = this.fs.readJSON(require.resolve('../../package.json'));
    const titleLines = [];

    titleLines.push(
      `${terminal.chalk.title('LOREM IPSUM')} @${packageFile.version}\n`
    );
    titleLines.push(
      `${terminal.chalk.label('Node Version')} ${process.version}`
    );

    this.log(terminal.boxen(titleLines.join('\n')));
  }

  async installDeps() {
    await this.addDependencies(['dotenv']);
    await this.addDevDependencies([
      '@commitlint/config-conventional',
      '@types/faker',
      '@types/jest',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'cypress',
      'env-cmd',
      'eslint',
      'eslint-config-prettier',
      'eslint-config-standard-with-typescript',
      'eslint-plugin-import',
      'eslint-plugin-jest',
      'eslint-plugin-node',
      'eslint-plugin-promise',
      'eslint-plugin-react',
      'husky',
      'jest',
      'jest-mock-extended',
      'lint-staged',
      'prettier',
      'standard-version',
      'ts-jest',
      'typescript',
    ]);
  }
};
