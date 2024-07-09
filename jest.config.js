/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/__test__/jest.setup.ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { isolatedModules: true, useESM: true }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@databases/(.*)$": "<rootDir>/src/databases/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@scripts/(.*)$": "<rootDir>/src/scripts/$1",
  },
};
