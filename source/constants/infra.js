const InfraEnum = {
  AXIOS: 'axios',
  RECATPCHA: 'recaptcha',
};

module.exports = {
  infraEnum: InfraEnum,
  infras: [
    {
      value: InfraEnum.AXIOS,
      name: 'Axios',
      dependencies: ['axios'],
      devDependencies: [],
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
