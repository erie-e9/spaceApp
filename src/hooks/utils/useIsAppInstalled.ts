import { useCallback } from 'react';
import { Platform } from 'react-native';
import { AppInstalledChecker } from '@bokuhe/react-native-check-app-install';
import { Logger } from '@services';

interface UseIsAppInstalledProps {
  packageName: string;
  appSchemeIOS: string;
}

export const useIsAppInstalled = (): {
  isAppInstalledByName(props: UseIsAppInstalledProps): Promise<boolean>;
  isAppInstalledByURL(props: UseIsAppInstalledProps): Promise<boolean>;
} => {
  // Check if app is installed by package name (Android) or app scheme (iOS)
  const isAppInstalledByName = useCallback(
    async ({ packageName, appSchemeIOS }: UseIsAppInstalledProps): Promise<boolean> => {
      try {
        const platformSpecificCheck = Platform.select({
          ios: () => AppInstalledChecker.checkURLScheme(appSchemeIOS),
          android: () => AppInstalledChecker.isAppInstalledAndroid(packageName),
        });

        if (!platformSpecificCheck) {
          throw new Error('Unsupported platform');
        }

        const isInstalled = await platformSpecificCheck();
        return isInstalled;
      } catch (error) {
        Logger.warn(
          `Error checking if ${Platform.select({
            ios: appSchemeIOS,
            android: packageName,
          })} is installed in ${Platform.OS === 'ios' ? 'iOS' : 'Android'}:`,
          error,
        );
        return false;
      }
    },
    [],
  );

  // Check if app is installed by URL scheme (both platforms)
  const isAppInstalledByURL = useCallback(
    async ({ packageName, appSchemeIOS }: UseIsAppInstalledProps): Promise<boolean> => {
      try {
        const appScheme = Platform.select({
          ios: appSchemeIOS,
          android: packageName,
        });

        if (!appScheme) {
          throw new Error('Unsupported platform');
        }

        const isInstalled = await AppInstalledChecker.checkURLScheme(appScheme);
        return isInstalled;
      } catch (error) {
        Logger.error(
          `Error checking if ${Platform.select({
            ios: appSchemeIOS,
            android: packageName,
          })} is installed via URL scheme:`,
          error,
        );
        return false;
      }
    },
    [],
  );

  return { isAppInstalledByName, isAppInstalledByURL };
};
