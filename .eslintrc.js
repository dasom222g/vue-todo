module.exports = {
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 6,
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js'],
      env: {
        browser: true,
        node: true,
        es6: true,
      },
    },
  ],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error',
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    semi: [2, 'never'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
