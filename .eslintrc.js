module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'no-empty': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'prefer-const': 'warn',
    'no-const-assign': 'warn',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  extends: ['plugin:vue/strongly-recommended', '@vue/prettier', '@vue/typescript']
};
