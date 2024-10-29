const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

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

    minifierPath: require.resolve('metro-minify-terser'), // Use Terser for minification
    minifierConfig: {
      keep_classnames: false, // Option to control class name preservation
      keep_fnames: false, // Option to control function name preservation
      mangle: {
        toplevel: true, // Enable variable name mangling at the top level
      },
      output: {
        comments: false, // Remove all comments
      },
    },
  },
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'), 'lottie'],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'cjs'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
