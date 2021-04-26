module.exports = {
    extends: [
      'airbnb-base',
      'prettier'
    ],
    plugins: ["prettier"],
    parserOptions: {
        "ecmaVersion": 2017
    },
    env: {
        "es6": true
    },
    rules: {
      "prettier/prettier": ["error"]
    },
  }
  