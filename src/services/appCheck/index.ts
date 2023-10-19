import { firebase } from '@react-native-firebase/app-check';
import { Logger } from '@services';

const {
  DEBUGGER_MODE,
  APP_CHECK_IOS_DEBUG_TOKEN,
  APP_CHECK_ANDROID_DEBUG_TOKEN,
} = process.env;

const initAppCheck = (useDebugToken: boolean): void => {
  const isDebug = DEBUGGER_MODE || useDebugToken;
  try {
    const rnfbProvider = firebase
      .appCheck()
      .newReactNativeFirebaseAppCheckProvider();

    rnfbProvider.configure({
      android: {
        provider: isDebug ? 'debug' : 'playIntegrity',
        debugToken: APP_CHECK_ANDROID_DEBUG_TOKEN,
      },
      apple: {
        provider: isDebug ? 'debug' : 'appAttestWithDeviceCheckFallback',
        debugToken: APP_CHECK_IOS_DEBUG_TOKEN,
      },
      web: {
        provider: 'reCaptchaV3',
        siteKey: 'unknown',
      },
    });

    firebase.appCheck().initializeAppCheck({
      provider: rnfbProvider,
      isTokenAutoRefreshEnabled: true,
    });
  } catch (error) {
    Logger.error('initAppCheck', { error });
  }
};

const getAppCheckToken = async (): Promise<string> => {
  const { token } = await firebase.appCheck().getToken(true);
  if (token.length <= 0) {
    throw new Error('Empty token');
  }
  Logger.log('getAppCheckToken', { token });
  return token;
};

export { initAppCheck, getAppCheckToken };
