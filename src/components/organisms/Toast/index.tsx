import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { getHasNotch } from '@hooks';
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

interface ToastProps {
  message: string | null;
  type?: ToastStatus;
}

export const Toast = () => {
  const hasNotch = getHasNotch();
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

  const colorStatus: ColorStatus = {
    info: theme.tokens.states.info_accent,
    success: theme.tokens.states.success_accent,
    error: theme.tokens.states.danger_accent,
    warning: theme.tokens.states.warning_accent,
  };

  const OnNewToast = (data: any) => {
    if (data.duration) {
      setDuration(data.duration);
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
          setDuration(prev => prev && prev - 1000);
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
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          position: 'absolute',
          height: hasNotch ? 55 : 45,
          width: '100%',
          backgroundColor: colorStatus[type || 'info'],
        },
        animatedStyle,
      ]}
    >
      <TouchableAreaContainer onPress={closeToast}>
        <ToastBodyContainer>
          <ToastTextContainer hasNotch={hasNotch}>
            <ToastText
              onPress={closeToast}
              type="Subtitle2"
              color="textColor"
              textAlign="center"
              numberOfLines={1}
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
