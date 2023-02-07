const { infraEnum } = require("./infra");

module.exports = {
  folder: 'data',
  dataSources: [
    {
      value: "remote",
      name: "Remote",
      serviceDependency: [infraEnum.HTTP_CLIENT]
    },
    {
      value: "local",
      name: "Local",
      serviceDependency: []
    },
    {
      value: "mock",
      name: "Mock",
      serviceDependency: []
    },
  ]
}