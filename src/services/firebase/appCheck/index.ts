import { firebase } from '@react-native-firebase/app-check';
import { Logger } from '@services';

const DEBUGGER_MODE = process.env.DEBUGGER_MODE;
const APP_CHECK_IOS_DEBUG_TOKEN = process.env.APP_CHECK_IOS_DEBUG_TOKEN;
const APP_CHECK_ANDROID_DEBUG_TOKEN = process.env.APP_CHECK_ANDROID_DEBUG_TOKEN;
const debugger_mode = `${DEBUGGER_MODE}` === 'true';

const initAppCheck = (useDebugToken: boolean): void => {
  const isDebug = debugger_mode || useDebugToken;
  try {
    const rnFirebaseProvider = firebase
      .appCheck()
      .newReactNativeFirebaseAppCheckProvider();
    rnFirebaseProvider.configure({
      android: {
        provider: __DEV__ ? 'debug' : 'playIntegrity',
        debugToken: APP_CHECK_ANDROID_DEBUG_TOKEN,
      },
      apple: {
        provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
        debugToken: APP_CHECK_IOS_DEBUG_TOKEN,
      },
      web: {
        provider: 'reCaptchaV3',
        siteKey: 'unknown',
      },
    });

    firebase.appCheck().initializeAppCheck({
      provider: rnFirebaseProvider,
      isTokenAutoRefreshEnabled: true,
    });
  } catch (error) {
    Logger.error('initAppCheck', { error });
  }
};

const getAppCheckToken = async (): Promise<string> => {
  try {
    const { token } = await firebase.appCheck().getToken(true);

    if (token.length > 0) {
      Logger.log('getAppCheckToken', { token });
      return token;
    }
    throw new Error('Empty token');
  } catch (error) {
    console.log('AppCheck verification failed');
    throw new Error('Empty token');
  }
};

export { initAppCheck, getAppCheckToken };
