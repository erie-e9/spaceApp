module.exports = {
  root: true,
  // extends: '@react-native-community',
  env: {
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-inline-comments': 'off',
    semi: 0,
  },
};
