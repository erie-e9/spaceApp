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
  getBundleId as getBundleIdInfo,
} from 'react-native-device-info';
import { Logger } from '@services';

export const getUniqueId = async (): Promise<string> => {
  const deviceId = await getUniqueIdDeviceInfo();
  Logger.log('getUniqueId: ', deviceId);
  return deviceId;
};

export const getModel = (): string => {
  return getModelInfo();
};

export const getDeviceLabel = (): string => {
  return `${Platform.OS}_${getUniqueId()}`;
};

export const isNotEmulator = async (): Promise<boolean> => {
  const isEmulator = await getIsEmulator();
  return __DEV__ ? true : !isEmulator;
};

export const getAppVersion = async (): Promise<string> => {
  return getReadableVersion();
};

export const getOSVersion = (): string => {
  return getSystemVersionInfo();
};

export const getPhoneNumber = async (): Promise<string | void> => {
  return getPhoneNumberInfo();
};

export const getIpAddress = async (): Promise<string | void> => {
  return getIpAddressInfo();
};

export const getHasNotch = (): boolean => {
  return hasNotchInfo();
};

export const hasDynamicIsland = (): boolean => {
  return hasDynamicIslandInfo();
};

export const getBundleId = (): string => {
  const bundleId = getBundleIdInfo();
  return bundleId;
};

export const getDeviceInfo = (): Promise<any> => {
  const promises = [
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
    getBundleIdInfo(),
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
