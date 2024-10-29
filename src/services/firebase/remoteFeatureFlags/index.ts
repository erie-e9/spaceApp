import remoteFeatureFlags from '@react-native-firebase/remote-config';
import { Logger } from '@services';
import { initialState } from '@slices/shared/remoteConfigFeatures';
import { type RemoteConfigFeatures, type FeatureStatus } from '@slices/types/remoteConfigFeatures';

const firebaseRemoteConfig = {} as Record<keyof RemoteConfigFeatures, string | number>;

Object.keys(initialState).forEach((configKey: keyof RemoteConfigFeatures): void => {
  const configValue = initialState[configKey];
  const [value] = Object.values(configValue);
  firebaseRemoteConfig[configKey] = value as string | number;
});

remoteFeatureFlags().setDefaults(firebaseRemoteConfig);

export const remoteConfigFeatures = async (): Promise<any> => {
  const { REMOTE_CONFIG_CACHE_TIME } = process.env;
  return new Promise<any>((resolve, reject) => {
    const cacheTime = parseFloat(`${REMOTE_CONFIG_CACHE_TIME}`.trim());
    const fetchConfigs = remoteFeatureFlags().fetch(cacheTime);

    fetchConfigs
      .then(() => remoteFeatureFlags().activate())
      .then(() => {
        return remoteFeatureFlags().getAll();
      })
      .then((snapshot) => {
        const resolution = {} as RemoteConfigFeatures;
        Object.keys(snapshot).forEach((configKey: keyof RemoteConfigFeatures): void => {
          const initialConfigValue = initialState[configKey];
          if (!initialConfigValue) {
            Logger.log('Inital remote config missing for', configKey);
            return;
          }
          if (Object.keys(initialConfigValue).includes('status')) {
            resolution[configKey] = {
              status: snapshot[configKey].asString() as FeatureStatus,
            };
          }
        });
        resolve({ ...resolution });
      })
      .catch((error) => {
        reject(new Error(error.toString()));
        resolve({ ...initialState });
      });
  });
};
