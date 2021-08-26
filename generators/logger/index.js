const Generator = require('yeoman-generator');
const terminal = require('../../source/utils/terminal');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this._logStart();
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

  configuring() {
    this.log('\n');
    this.log('⚙️  Configuring');
  }

  writing() {
    this.log('\n');
    this.log('🪡  Writing');
    this.log('\n');
  }

  end() {
    this.log('\n\n');
    this.log(terminal.chalk.title('✨ Successfully create mate project'));
    this.log(
      terminal.chalk.label('🚀 Get started with the following commands: \n')
    );
    this.log(terminal.chalk.label('  npm run dev', 'white'));
  }
};
