import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter, Vibration } from 'react-native';
import { useTheme } from 'styled-components/native';
import { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { getHasNotch, useTheme as useThemeApp } from '@hooks';
import {
  StyledAnimatedContainer,
  TouchableAreaContainer,
  ToastBodyContainer,
  ToastTextContainer,
  ToastText,
} from './styles';

export type ToastStatus = 'info' | 'success' | 'error' | 'warning';
export interface ColorStatus {
  info: string;
  success: string;
  error: string;
  warning: string;
}

export interface ToastProps {
  message?: string | null;
  type?: ToastStatus;
  duration?: number;
  vibration?: number | boolean;
}

export const Toast = () => {
  const hasNotch = getHasNotch();
  const { darkMode } = useThemeApp();
  const [{ message, type }, setToast] = useState<ToastProps>({
    message: null,
    type: 'info',
  });
  const [duration, setDuration] = useState<number | undefined>();
  const timeOutRef = useRef<any>();
  const animatedOpacity = useSharedValue(0);
  const theme = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: animatedOpacity.value };
  });

  const colorTextStatus: ColorStatus = {
    info: 'secondary900',
    success: darkMode ? 'tertiary50' : 'secondary950',
    error: 'secondary900',
    warning: 'tertiary50',
  };

  const colorStatus: ColorStatus = {
    info: theme.tokens.colors.info_status,
    success: theme.tokens.colors.success_status,
    error: theme.tokens.colors.danger_status,
    warning: theme.tokens.colors.warning_status,
  };

  const OnNewToast = (data: any) => {
    if (data.duration) {
      setDuration(data.duration);
    }
    if (data.vibration) {
      Vibration.vibrate(typeof data.vibration === 'boolean' ? 40 : data.vibration, true);
    }
    setToast({ message: data.message, type: data.type });
  };

  const closeToast = useCallback(async () => {
    animatedOpacity.value = await withTiming(0, {
      duration: 300,
    });
    setDuration(undefined);
    setTimeout(() => {
      setToast({
        message: null,
      });
    }, 1000);
    clearInterval(timeOutRef.current);
  }, [animatedOpacity.value]);

  useEffect(() => {
    if (message && duration !== undefined) {
      timeOutRef.current = setInterval(() => {
        if (duration <= 0) {
          closeToast();
        } else {
          setDuration((prev) => prev && prev - 1000);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timeOutRef.current);
    };
  }, [closeToast, message, duration]);

  useEffect(() => {
    if (message) {
      animatedOpacity.value = withTiming(1, {
        duration: 300,
      });
    }
  }, [message, animatedOpacity.value]);

  useEffect(() => {
    DeviceEventEmitter.addListener('SHOW_TOAST_MESSAGE', OnNewToast);
    DeviceEventEmitter.addListener('HIDE_TOAST_MESSAGE', closeToast);

    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  if (!message) return;

  return (
    <StyledAnimatedContainer
      hasNotch={hasNotch}
      style={[
        {
          backgroundColor: colorStatus[type || 'success'],
        },
        animatedStyle,
      ]}
    >
      <TouchableAreaContainer onPress={closeToast} hasNotch={hasNotch}>
        <ToastBodyContainer onStartShouldSetResponder={closeToast}>
          <ToastTextContainer hasNotch={hasNotch}>
            <ToastText
              type="Subtitle3"
              color={colorTextStatus[type || 'success']}
              textAlign="center"
              numberOfLines={1}
              weight={500}
            >
              {message}
            </ToastText>
          </ToastTextContainer>
        </ToastBodyContainer>
      </TouchableAreaContainer>
    </StyledAnimatedContainer>
  );
};

export default memo(Toast);
