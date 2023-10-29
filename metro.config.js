const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
      'lottie',
    ],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'cjs'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
