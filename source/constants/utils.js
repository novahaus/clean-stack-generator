const UtilsEnum = {
  QUERY_STRING: 'QUERY_STRING',
};

const usedUtils = [];

module.exports = {
  usedUtils,
  enum: UtilsEnum,
  utils: [
    {
      value: UtilsEnum.QUERY_STRING,
      fileName: 'queryString',
      name: 'Query string',
      dependencies: ['qs'],
      devDependencies: [],
    },
  ],
};
