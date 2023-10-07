module.exports = {
  assets: ['./src/assets/fonts'],
  dependencies: {
    ...(process.env.DEBUGGER_MODE
      ? { 'react-native-flipper': { platforms: { ios: null } } }
      : {}),
  },
};
