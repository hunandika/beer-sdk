module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    es6: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'import/no-unresolved': 'off',
    'rest-spread-spacing': ['error', 'never'],
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
  },
};
