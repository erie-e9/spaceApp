import React, { useEffect, useState, memo, Fragment } from 'react';
import { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { TooltipContainer, TooltipText } from './styles';

interface TooltipProps {
  visible: boolean;
  message: string;
  duration?: number;
  onDismiss?: () => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
  visible,
  message,
  duration = 3000,
  onDismiss,
}) => {
  const opacity = useSharedValue(0);
  const [isVisible, setIsVisible] = useState<boolean>(visible);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      setIsVisible(true);
      const timer = setTimeout(() => {
        opacity.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        setTimeout(() => {
          setIsVisible(false);
          if (onDismiss) onDismiss();
        }, 300);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      opacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [visible, duration, opacity, onDismiss]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (!isVisible) return null;

  return (
    <Fragment>
      {message !== ' ' && (
        <TooltipContainer style={[animatedStyle]}>
          <TooltipText type="Label">{message}</TooltipText>
        </TooltipContainer>
      )}
    </Fragment>
  );
};

export default memo(Tooltip);
