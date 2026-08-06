module.exports = {
  extends: ["eslint:recommended"],
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
