import { DeviceEventEmitter } from 'react-native';
import { ToastProps } from '@components/molecules/Toast';

export const useToast = {
  info: ({ message, duration, vibration }: ToastProps): void => {
    DeviceEventEmitter.emit('SHOW_TOAST_MESSAGE', {
      message,
      duration,
      vibration,
      type: 'info',
    });
  },
  success: ({ message, duration, vibration }: ToastProps): void => {
    DeviceEventEmitter.emit('SHOW_TOAST_MESSAGE', {
      message,
      duration,
      vibration,
      type: 'success',
    });
  },
  error: ({ message, duration, vibration }: ToastProps): void => {
    DeviceEventEmitter.emit('SHOW_TOAST_MESSAGE', {
      message,
      duration,
      vibration,
      type: 'error',
    });
  },
  warning: ({ message, duration, vibration }: ToastProps) => {
    DeviceEventEmitter.emit('SHOW_TOAST_MESSAGE', {
      message,
      duration,
      vibration,
      type: 'warning',
    });
  },
  close: (): void => {
    DeviceEventEmitter.emit('HIDE_TOAST_MESSAGE', {
      message: null,
    });
  },
};
