/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'dynamic-import-node',
    'babel-plugin-styled-components',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
          '.jpeg',
          '.jpg',
          '.svg',
          'webp',
        ],
        alias: {
          root: ['./src'],
          '@hooks': './src/hooks',
          '@navigators': './src/navigators',
          '@components': './src/components',
          '@redux': './src/redux',
          '@store': './src/redux/store',
          '@slices': './src/redux/store/slices',
          '@env': '.env',
          '@assets': './src/assets',
          '@services': './src/services',
          '@libs': './src/utils/libs',
          '@utils': './src/utils',
          '@theme': './src/theme',
          '@types': './src/utils/types',
        },
      },
    ],
    'inline-dotenv',
    'react-native-reanimated/plugin', // needs to be last
  ],
  env: {
    development: {},
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
