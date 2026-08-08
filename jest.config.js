module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-vector-icons|@react-native-community/async-storage|react-native-screens|react-native-gesture-handler|react-router-native|react-router)",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/src/**/__tests__/**/*.test.js?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/rate-repository-api/"],
  moduleNameMapper: {
    "^test-renderer$": "<rootDir>/node_modules/react-test-renderer",
  },
};
