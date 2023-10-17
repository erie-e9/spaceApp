import remoteConfig from '@react-native-firebase/remote-config';
import { Logger } from '@services';
import { initialState } from '@slices/shared/remoteConfigFeatures';
import {
  RemoteConfigFeatures,
  FeatureStatus,
} from '@slices/types/remoteConfigFeatures';

const firebaseRemoteConfig = {} as Record<
  keyof RemoteConfigFeatures,
  string | number
>;

Object.keys(initialState).forEach(
  (configKey: keyof RemoteConfigFeatures): void => {
    const configValue = initialState[configKey];
    const [value] = Object.values(configValue);
    firebaseRemoteConfig[configKey] = value as string | number;
  },
);

remoteConfig().setDefaults(firebaseRemoteConfig);

export const remoteConfigFeatures = async (): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const cacheTime = parseFloat(
      `${process.env.REMOTE_CONFIG_CACHE_TIME}`.trim(),
    );
    const fetchConfigs = remoteConfig().fetch(cacheTime);

    fetchConfigs
      .then(() => remoteConfig().activate())
      .then(() => {
        return remoteConfig().getAll();
      })
      .then(snapshot => {
        const resolution = {} as RemoteConfigFeatures;
        Object.keys(snapshot).forEach(
          (configKey: keyof RemoteConfigFeatures): void => {
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
          },
        );
        resolve({ ...resolution });
      })
      .catch(err => {
        Logger.log('remoteConfig error: ', err.toString());
        reject(new Error('Error gettirng configuration'));
        resolve({ ...initialState });
      });
  });
};
