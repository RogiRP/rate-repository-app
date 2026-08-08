module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-vector-icons|@react-native-community/async-storage|react-native-screens|react-native-gesture-handler)",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/src/**/__tests__/**/*.test.js?(x)"], // Solo pruebas en src/
  testPathIgnorePatterns: ["/node_modules/", "/rate-repository-api/"], // Ignora la API
  moduleNameMapper: {
    "^test-renderer$": "<rootDir>/node_modules/react-test-renderer", // Soluciona error de módulo
  },
};
