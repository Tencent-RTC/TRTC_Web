module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint-config-tencent',
    'plugin:vue/essential',
    'plugin:vue/base',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    "max-len": ["error", { "code": 300 }]
  },
};
