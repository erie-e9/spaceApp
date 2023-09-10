const defaults = require('metro-config/src/defaults/defaults');

module.exports = {
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
    assetExts: defaults.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaults.sourceExts, 'svg', 'cjs'],
  },
};
