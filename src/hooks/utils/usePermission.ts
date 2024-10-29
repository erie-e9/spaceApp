import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import {
  check,
  request,
  RESULTS,
  openSettings,
  Permission,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import { useAppAlerts } from './useAppAlerts';

interface PermissionStatus {
  status: 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';
  openAppSettings: () => void;
  checkPermission: (permission: Permission) => Promise<string>;
  requestPermission: (permission: Permission) => Promise<string>;
  requestCameraPermission: () => void;
  requestPhotoLibraryPermission: () => Promise<string | void>;
  requestLocationPermission: (useBackgroundLocationApproved: boolean) => void;
  requestMicrophonePermission: () => void;
}

export const usePermission = (): PermissionStatus => {
  const { showBlockedPermissionAlert, showDeniedPermissionAlert } = useAppAlerts();
  const [status, setStatus] = useState<
    'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked'
  >('unavailable');

  const openAppSettings = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  const handlePermissionResponse = useCallback((result: string, permission: Permission) => {
    if (result === RESULTS.BLOCKED) {
      showBlockedPermissionAlert(openAppSettings);
    } else if (result === RESULTS.DENIED) {
      showDeniedPermissionAlert(() => requestPermission(permission));
    }
  }, []);

  const checkPermission = useCallback(async (permission: Permission) => {
    const result = await check(permission);
    setStatus(result);
    return result;
  }, []);

  const requestPermission = useCallback(async (permissions: Permission | Array<Permission>) => {
    let result;
    if (Array.isArray(permissions)) {
      result = await requestMultiple(permissions);
    }
    result = await request(permissions as Permission);
    await setStatus(result);
    await handlePermissionResponse(result, permissions as Permission);
    return result;
  }, []);

  const requestCameraPermission = useCallback(() => {
    const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    requestPermission(permission);
  }, []);

  const requestPhotoLibraryPermission = useCallback(async (): Promise<string | void> => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    const photoLibraryPermission = await checkPermission(permission);

    if (photoLibraryPermission === 'granted' || photoLibraryPermission === 'limited') {
      return photoLibraryPermission;
    } else {
      requestPermission(permission);
    }
  }, [checkPermission, requestPermission]);

  const requestLocationPermission = useCallback((useBackgroundLocationApproved: boolean) => {
    if (Platform.OS === 'ios') {
      return [PERMISSIONS.IOS.LOCATION_ALWAYS];
    } else {
      const permissions: Array<Permission> = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ];

      // For android we show a warning about using background location which the user needs to approve according to
      // the play store guidelines
      if (useBackgroundLocationApproved) {
        permissions.push(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
      }
      requestPermission(permissions);
    }
  }, []);

  const requestMicrophonePermission = useCallback(() => {
    const permission =
      Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;
    requestPermission(permission);
  }, []);

  return {
    status,
    openAppSettings,
    checkPermission,
    requestPermission,
    requestCameraPermission,
    requestPhotoLibraryPermission,
    requestLocationPermission,
    requestMicrophonePermission,
  };
};
