import { useCallback } from 'react';
import JailMonkey from 'jail-monkey';
import { isNotEmulator } from '@hooks';
import { Logger } from '@services';

interface CheckPhoneIntegrityProps {
  callback?: () => void;
  fallback?: () => void;
}

export const useDeviceSecurity = (): {
  checkIsReliableDevice: ({ callback, fallback }: CheckPhoneIntegrityProps) => Promise<boolean>;
} => {
  const isDeviceSecure = useCallback(async (): Promise<boolean> => {
    try {
      const isDevEnv = (await process.env.DEBUGGER_MODE) ? false : JailMonkey?.isDebuggedMode();
      const trustDeviceFall = (await process.env.DEBUGGER_MODE) ? false : JailMonkey.trustFall();
      const isJailbroken = await JailMonkey?.isJailBroken();
      const isRooted = await JailMonkey?.androidRootedDetectionMethods?.rootBeer
        ?.detectRootManagementApps;
      const detectDangerousApps = await JailMonkey?.androidRootedDetectionMethods?.rootBeer
        ?.detectPotentiallyDangerousApps;
      const isExternalStorage = await JailMonkey?.isOnExternalStorage();

      return !(isDevEnv || isJailbroken || isRooted || detectDangerousApps || isExternalStorage || trustDeviceFall);
    } catch (error) {
      Logger.error('isDeviceSecure Error', { error });
      return false; // it's not reliable
    }
  }, []);

  const checkMockLocation = useCallback(() => {
    const isMockLocationAppRunning = JailMonkey?.canMockLocation();
    return isMockLocationAppRunning;
  }, []);

  const checkIsReliableDevice = useCallback(
    async ({ callback, fallback }: CheckPhoneIntegrityProps): Promise<boolean> => {
      try {
        const [deviceSecure, notEmulator, mockLocation] = await Promise.all([
          isDeviceSecure(),
          checkMockLocation(),
          isNotEmulator(),
        ]);

        if (deviceSecure && notEmulator && mockLocation) {
          callback?.();
          return true;
        }

        fallback?.();
        return false; // it's not reliable
      } catch (error) {
        Logger.error('checkIsReliableDevice Error', { error });
        fallback?.();
        return false; // it's not reliable
      }
    },
    [isDeviceSecure, checkMockLocation],
  );

  return { checkIsReliableDevice };
};
