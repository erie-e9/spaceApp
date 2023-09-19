import { DeviceEventEmitter } from 'react-native';

export const useToast = {
  info: (options: any) => {
    DeviceEventEmitter.emit('SHOW_TOAST_MESSAGE', { ...options, type: 'info' });
  },
  success: (options: any) => {
    DeviceEventEmitter.emit('SHOW_TOAST_MESSAGE', {
      ...options,
      type: 'success',
    });
  },
  error: (options: any) => {
    DeviceEventEmitter.emit('SHOW_TOAST_MESSAGE', {
      ...options,
      type: 'error',
    });
  },
  warning: (options: any) => {
    DeviceEventEmitter.emit('SHOW_TOAST_MESSAGE', {
      ...options,
      type: 'warning',
    });
  },
  close: (options: any) => {
    DeviceEventEmitter.emit('HIDE_TOAST_MESSAGE', {
      ...options,
      message: null,
    });
  },
};
