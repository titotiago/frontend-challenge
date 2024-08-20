import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(module-to-transform)/)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
