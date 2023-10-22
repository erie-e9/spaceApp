import {
  setInternetCredentials,
  getInternetCredentials,
  hasInternetCredentials,
  resetInternetCredentials,
  Result,
  ACCESS_CONTROL,
  ACCESSIBLE,
  AUTHENTICATION_TYPE,
} from 'react-native-keychain';
import { Logger } from '@services';
import { getBundleId } from '@hooks';

interface keyChainCredential {
  username: string;
  password: string;
}

export const useKeyChainStore = (): {
  setCredentials: ({ username, password }: keyChainCredential) => Promise<void>;
  getCredentials: () => Promise<keyChainCredential | null>;
  hasCredentials: () => Promise<Result | boolean>;
  removeCredentials: () => Promise<void>;
} => {
  const bundleId = getBundleId();
  const { API_URL } = process.env;
  const server = API_URL + bundleId;

  const setCredentials = async ({
    username,
    password,
  }: keyChainCredential): Promise<void> => {
    try {
      await setInternetCredentials(server, username, password, {
        accessControl: ACCESS_CONTROL.USER_PRESENCE,
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      Logger.log('Stored credentials');
    } catch (error) {
      Logger.log(`Could not save credentials: ${error}`);
    }
  };

  const getCredentials = async (): Promise<keyChainCredential | null> => {
    try {
      const options = {
        authenticationPrompt: {
          title: 'Authentication needed',
          subtitle: 'Please validate your identity',
          description: 'Confirm using your fingerprint',
          cancel: 'Cancel',
        },
        authenticationType: AUTHENTICATION_TYPE.BIOMETRICS,
      };
      const credentials = await getInternetCredentials(server, options);
      if (credentials) {
        return {
          username: credentials.username,
          password: credentials.password,
        };
      } else {
        Logger.log('Keychain: No credentials stored');
      }
      return null;
    } catch (error) {
      Logger.log(`Keychain: Couldn't be accessed!: ${error}`);
      return null;
    }
  };

  const hasCredentials = async (): Promise<Result | boolean> => {
    const appHasCredentials = await hasInternetCredentials(server);
    return appHasCredentials;
  };

  const removeCredentials = async (): Promise<void> => {
    await resetInternetCredentials(server);
  };

  return {
    setCredentials,
    getCredentials,
    hasCredentials,
    removeCredentials,
  };
};
