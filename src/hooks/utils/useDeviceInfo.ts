import { Platform } from 'react-native';
import { getLocales } from 'react-native-localize';
import {
  getUniqueId as getUniqueIdDeviceInfo,
  getModel as getModelInfo,
  isEmulator as getIsEmulator,
  getReadableVersion,
  getIpAddress as getIpAddressInfo,
  getSystemVersion as getSystemVersionInfo,
  hasNotch as hasNotchInfo,
  hasDynamicIsland as hasDynamicIslandInfo,
  getBundleId as getBundleIdInfo,
} from 'react-native-device-info';
import { Logger } from '@services';
import { Language } from '@slices/types';

export const getUniqueId = (): Promise<string> => {
  return getUniqueIdDeviceInfo();
};

export const getModel = (): string => {
  return getModelInfo();
};

export const getDeviceLabel = async (): Promise<string> => {
  const uniqueId = await getUniqueId();
  return `${Platform.OS}_${uniqueId}`;
};

export const isNotEmulator = async (): Promise<boolean> => {
  const isEmulator = await getIsEmulator();
  return __DEV__ ? true : !isEmulator;
};

export const getAppVersion = (): string => {
  return getReadableVersion();
};

export const getOSVersion = (): string => {
  return getSystemVersionInfo();
};

export const getIpAddress = async (): Promise<string | null> => {
  try {
    return await getIpAddressInfo();
  } catch (error) {
    Logger.error('Failed to get IP address', { error });
    return null;
  }
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

export const getDeviceLanguage = (): Language => {
  try {
    const languageCode = getLocales()[0]?.languageCode;
    const validLanguages: Language[] = ['de', 'en', 'es', 'fr', 'pt'];

    return validLanguages.includes(languageCode as Language) ? (languageCode as Language) : 'en';
  } catch (e) {
    Logger.error('Failed to get device language', e);
    return 'en';
  }
};

export const getDeviceInfo = async (): Promise<any> => {
  try {
    const [
      uniqueId,
      model,
      deviceLabel,
      isEmulator,
      appVersion,
      ipAddress,
      osVersion,
      hasNotch,
      dynamicIsland,
      bundleId,
      deviceLanguage,
    ] = await Promise.all([
      getUniqueId(),
      getModel(),
      getDeviceLabel(),
      isNotEmulator(),
      getAppVersion(),
      getIpAddress(),
      getOSVersion(),
      getHasNotch(),
      hasDynamicIsland(),
      getBundleId(),
      getDeviceLanguage(),
    ]);

    return {
      uniqueId,
      model,
      deviceLabel,
      isEmulator,
      appVersion,
      ipAddress,
      osVersion,
      hasNotch,
      dynamicIsland,
      bundleId,
      deviceLanguage,
    };
  } catch (error) {
    Logger.error('Failed to get device info', { error });
    return null;
  }
};
