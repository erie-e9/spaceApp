module.exports = {
  project: {
    android: {
      unstable_reactLegacyComponentNames: ['SkiaDomView'],
    },
    ios: {
      unstable_reactLegacyComponentNames: ['SkiaDomView'],
    },
  },
  assets: ['./src/assets/fonts'],
  dependencies: {
    ...(process.env.DEBUGGER_MODE
      ? { 'react-native-flipper': { platforms: { ios: null } } }
      : {}),
  },
};
