module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "./source",
  resetMocks: false,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/core/"],
  coveragePathIgnorePatterns: ["<rootDir>/core/"],
};
