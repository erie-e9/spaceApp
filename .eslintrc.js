module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    // 'unused-imports',
    // 'autofix',
  ],
  rules: {
    camelcase: 'off',
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['arrow-function', 'function-declaration', 'function-expression'],
        unnamedComponents: 'arrow-function',
      },
    ],
    // 'unused-imports/no-unused-imports': 'warn',
    // 'autofix/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/prop-types': 0,
    // '@typescript-eslint/no-explicit-any': 'error',
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'import/no-webpack-loader-syntax': 'off',
    'react/default-props-match-prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
