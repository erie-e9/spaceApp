/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
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
        ],
        alias: {
          root: ['./src'],
          '@hooks': './src/hooks',
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
          '@types': './src/utils/@types',
        },
      },
    ],
    'inline-dotenv',
    'react-native-reanimated/plugin', // needs to be last
  ],
};
