const { enum: utilsEnum } = require('./utils');

const InfraEnum = {
  HTTP_CLIENT: 'httpClient',
  CAPTCHA: 'captcha',
};

module.exports = {
  folder: 'infra',
  infraEnum: InfraEnum,
  infras: [
    {
      value: InfraEnum.HTTP_CLIENT,
      name: 'HTTP Client',
      dependencies: ['axios', 'js-cookie'],
      utils: [utilsEnum.QUERY_STRING],
    },
    {
      value: InfraEnum.CAPTCHA,
      name: 'captcha',
      dependencies: [],
      devDependencies: ['@types/grecaptcha'],
      utils: [],
    },
  ],
};
