import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter, TouchableOpacity } from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { ToastBodyContainer, ToastTextContainer, ToastText } from './styles';

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

const Toast = () => {
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
      duration: 350,
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
    if (message) {
      animatedOpacity.value = withTiming(1, {
        duration: 350,
      });
    }
  }, [message, animatedOpacity.value]);

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
    DeviceEventEmitter.addListener('SHOW_TOAST_MESSAGE', OnNewToast);
    DeviceEventEmitter.addListener('HIDE_TOAST_MESSAGE', closeToast);

    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  if (!message) return;

  return (
    <Animated.View
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          position: 'absolute',
          height: 70,
          width: '100%',
          zIndex: 1,
          elevation: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: colorStatus[type || 'info'],
        },
        animatedStyle,
      ]}
    >
      <TouchableOpacity onPress={closeToast}>
        <ToastBodyContainer>
          <ToastTextContainer>
            <ToastText
              type="Subtitle2"
              font="secondary"
              color="textLabelNeutral"
              textAlign="auto"
              numberOfLines={2}
            >
              {message}
            </ToastText>
          </ToastTextContainer>
        </ToastBodyContainer>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;
