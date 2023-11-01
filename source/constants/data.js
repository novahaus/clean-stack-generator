const { infraEnum } = require("./infra");

const dataEnum = {
  REMOTE: "remote",
  LOCAL: "local",
  MOCK: "mock",
};

const chosenDataSources = [];

module.exports = {
  folder: "data",
  chosenDataSources,
  setUsedDataSources: (usedDataSources) => {
    chosenDataSources.push(...usedDataSources);
  },
  dataSources: [
    {
      value: {
        data: "remote",
        serviceDependency: [infraEnum.HTTP_CLIENT],
      },
      name: "Remote",
    },
    {
      value: {
        data: "local",
        serviceDependency: [],
      },
      name: "Local",
    },
    {
      value: {
        data: "mock",
        serviceDependency: [],
      },
      name: "Mock",
    },
  ],
};
