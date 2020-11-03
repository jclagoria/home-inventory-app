module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    camelcase: 0,
  },
};
