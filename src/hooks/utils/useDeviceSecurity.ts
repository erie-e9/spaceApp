import JailMonkey from 'jail-monkey';
import { isNotEmulator } from '@hooks';
import { Logger } from '@services';

interface CheckPhoneIntegrityProps {
  callback?: () => void;
  fallback?: () => void;
}

export const useDeviceSecurity = (): {
  checkPhoneIntegrity: ({
    callback,
    fallback,
  }: CheckPhoneIntegrityProps) => Promise<boolean>;
} => {
  const isNotJailbroken = async (): Promise<boolean> => {
    const isDevEnv = await JailMonkey.isDebuggedMode();

    if (isDevEnv) return true;
    return !JailMonkey.isJailBroken();
  };

  const checkPhoneIntegrity = async ({
    callback,
    fallback,
  }: CheckPhoneIntegrityProps): Promise<boolean> => {
    try {
      const promises = [isNotJailbroken(), isNotEmulator()];
      const results = await Promise.all(promises);

      if (!results.includes(false)) {
        if (callback) callback();
        return true;
      }
      if (fallback) fallback();
      return false;
    } catch (error) {
      Logger.error('checkPhoneIntegrity', { error });
      return false;
    }
  };

  return { checkPhoneIntegrity };
};
