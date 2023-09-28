// import { setUniqueId } from '@redux/slices/deviceInfo';
// import { store } from '@redux/store';
import { Platform } from 'react-native';
import {
  getUniqueId as getUniqueIdDeviceInfo,
  getModel as getModelInfo,
  isEmulator as getIsEmulator,
  getReadableVersion,
  getPhoneNumber as getPhoneNumberInfo,
  getIpAddress as getIpAddressInfo,
  getSystemVersion as getSystemVersionInfo,
  hasNotch as hasNotchInfo,
  hasDynamicIsland as hasDynamicIslandInfo,
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

export const getOSVersion = (): string => {
  return getSystemVersionInfo();
};

export const getPhoneNumber = async (): Promise<string | void> => {
  return getPhoneNumberInfo().then(phoneNumber => {
    Logger.log({ phoneNumber });
  });
};

export const getIpAddress = async (): Promise<string | void> => {
  return getIpAddressInfo().then(ipAddress => {
    Logger.log({ ipAddress });
  });
};

export const getHasNotch = (): boolean => {
  return hasNotchInfo();
};

export const hasDynamicIsland = (): boolean => {
  return hasDynamicIslandInfo();
};

export const getDeviceInfo = (): Promise<any> => {
  const promises = [
    initDeviceInfo(),
    getUniqueId(),
    getModel(),
    getDeviceLabel(),
    isNotEmulator(),
    getAppVersion(),
    getPhoneNumber(),
    getIpAddress(),
    getOSVersion(),
    getHasNotch(),
    hasDynamicIsland(),
  ];
  return Promise.all(promises)
    .then(results => {
      Logger.log('getDeviceInfo', { results });
      return results;
    })
    .catch(error => {
      Logger.error('getDeviceInfo', { error });
    });
};
