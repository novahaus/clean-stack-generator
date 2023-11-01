const { enum: utilsEnum } = require('./utils');

const InfraEnum = {
  HTTP_CLIENT: 'httpClient',
  CAPTCHA: 'captcha',
};

const usedServices = [];

module.exports = {
  folder: 'infra',
  infraEnum: InfraEnum,
  usedServices,
  setUsedServices: (services) => {
    usedServices.push(...services);
  },
  infras: [
    {
      value: InfraEnum.HTTP_CLIENT,
      name: 'HTTP Client',
      dependencies: ['axios', 'js-cookie'],
      devDependencies: [],
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
