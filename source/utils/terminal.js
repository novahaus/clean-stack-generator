const boxen = require('boxen');
const chalk = require('chalk');

const chankConfig = {
  titleColor: 'blue',
  color: 'cyan',
};

module.exports = {
  boxen: (content, opts) => {
    const baseOptions = {
      padding: 1,
      margin: 0,
      borderColor: 'blue',
      borderStyle: 'round',
      align: 'left',
    };

    return boxen(content, Object.assign({}, baseOptions, opts));
  },
  chalk: {
    label(name, color) {
      return chalk[color || chankConfig.color](name);
    },
    title(title) {
      return chalk.bold[chankConfig.titleColor](title);
    },
    change(file) {
      return `${chalk.bold[chankConfig.color]('↻')} Updated ${chalk.bold[
        chankConfig.color
      ](file)}`;
    },
  },
};
