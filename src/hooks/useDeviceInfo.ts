// import { setUniqueId } from '@redux/slices/deviceInfo';
// import { store } from '@redux/store';
import { Platform } from 'react-native';
import {
  getUniqueId as getUniqueIdDeviceInfo,
  getModel as getModelInfo,
  isEmulator as getIsEmulator,
  getReadableVersion,
} from 'react-native-device-info';
import Logger from '@services/logger';

export const initDeviceInfo = (): void => {
  getUniqueIdDeviceInfo().then(uniqueId => {
    // store.dispatch(setUniqueId(uniqueId))
    Logger.log('initDeviceInfo', { uniqueId });
  });
};

export const getUniqueId = (): string => {
  return 'hola';
  // return store.getState().deviceInfo.uniqueId;
};

export const getModel = (): string => {
  return getModelInfo();
};

export const getDeviceLabel = (): string => {
  return `${Platform.OS}_${getUniqueId()}`;
};

export const isNotEmulator = async (): Promise<boolean> => {
  if (__DEV__) return true;
  return !getIsEmulator();
};

export const getAppVersion = async (): Promise<string> => {
  return getReadableVersion();
};

export const getDeviceInfo = (): Promise<any> => {
  const promises = [
    initDeviceInfo(),
    getUniqueId(),
    getModel(),
    getDeviceLabel(),
    isNotEmulator(),
    getAppVersion(),
  ];
  return Promise.all(promises)
    .then(results => {
      console.log('getDeviceInfo', { results });
      return results;
    })
    .catch(error => {
      console.error('getDeviceInfo', { error });
    });
};
