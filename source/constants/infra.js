const InfraEnum = {
  AXIOS: 'axios',
  RECATPCHA: 'recaptcha',
};

module.exports = {
  folder: 'infra',
  infraEnum: InfraEnum,
  infras: [
    {
      value: InfraEnum.AXIOS,
      name: 'Axios',
      dependencies: ['axios'],
      devDependencies: ['@types/axios'],
      fileName: 'HttpClientAxios',
    },
    {
      value: InfraEnum.RECATPCHA,
      name: 'Recaptcha',
      dependencies: [],
      devDependencies: ['@types/grecaptcha'],
      fileName: 'RecaptchaToken',
    },
  ],
};
