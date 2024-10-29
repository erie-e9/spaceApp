import React, { memo, useEffect, useMemo } from 'react';
import { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { PasswordStrengthProps } from '@hooks/utils/usePasswordStrength';
import { Container, StrengthBar } from './styles';

const PasswordStrengthAnimation: React.FC<PasswordStrengthProps> = ({ passwordStrength }) => {
  const theme = useTheme();
  const colors = useMemo(() => {
    return {
      weak: theme.tokens.colors.danger_status,
      medium: theme.tokens.colors.warning_status,
      good: theme.tokens.colors.info_status,
      strong: theme.tokens.colors.success_status,
    };
  }, []);

  const width = useSharedValue(0);

  useEffect(() => {
    let strengthValue = 0;
    switch (passwordStrength) {
      case 'weak':
        strengthValue = 25;
        break;
      case 'medium':
        strengthValue = 50;
        break;
      case 'good':
        strengthValue = 75;
        break;
      case 'strong':
        strengthValue = 100;
        break;
    }

    width.value = withTiming(strengthValue, {
      duration: 500,
      easing: Easing.linear,
    });
  }, [passwordStrength]);

  const animatedStyle = useAnimatedStyle(() => {
    return passwordStrength !== null
      ? {
          width: `${width.value}%`,
          backgroundColor: colors[passwordStrength],
        }
      : {};
  });

  return (
    <Container>
      <StrengthBar style={animatedStyle} />
    </Container>
  );
};

export default memo(PasswordStrengthAnimation);
