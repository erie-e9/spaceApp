import React, { memo } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { DefaultTheme, useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppPreferencesState } from '@redux/store/slices/types/appPreferences';
import { useTheme as themeVariables } from '@hooks';
import {
  SafeAreaContainer,
  StyledBackgroundContainer,
  StyledTextContainer,
} from './styles';

export interface InterpolateColorAnimationProps {
  testID?: string;
  children: string | React.ReactElement | React.ReactElement[];
  initialColor?: keyof DefaultTheme['tokens']['colors'];
  finalColor?: keyof DefaultTheme['tokens']['colors'];
  trigger?: boolean;
  duration?: number;
  styleProps?: any;
  animationType?: 'text' | 'background';
  props?: any;
}

export const InterpolateColorAnimation: React.FC<
  InterpolateColorAnimationProps
> = ({
  testID,
  children,
  initialColor,
  finalColor,
  duration,
  styleProps,
  animationType,
  props,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { NavigationProps } = themeVariables();
  const isDarkMode = useSelector(
    (state: { appPreferences: AppPreferencesState }) =>
      state.appPreferences.darkMode,
  );

  const colorScheme = useColorScheme();

  const progress = useDerivedValue(() => {
    return withTiming(
      isDarkMode === true || (colorScheme === 'dark' && isDarkMode === null)
        ? 1
        : 0,
      {
        duration: duration || NavigationProps.interpolationTime,
      },
    );
  }, [isDarkMode, colorScheme]);

  const reanimatedViewStyle = useAnimatedStyle(() => {
    const interpolatorColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        theme.tokens.colors?.[
          animationType === 'background'
            ? initialColor || 'backgroundColorLight'
            : initialColor || 'backgroundColorLight'
        ],
        theme.tokens.colors?.[
          animationType === 'background'
            ? finalColor || 'backgroundColorDark'
            : finalColor || 'backgroundColorDark'
        ],
      ],
    );

    return {
      backgroundColor:
        animationType === 'background' ? interpolatorColor : 'transparent',
      color: animationType === 'text' ? interpolatorColor : null,
    };
  }, [isDarkMode, colorScheme]);

  const insetStyles = {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: insets.top,
    paddingBottom: 15,
  };

  const AnimatedChildren =
    animationType === 'background' ? (
      <StyledBackgroundContainer
        testID={testID}
        style={[styleProps, reanimatedViewStyle, insetStyles]}
      >
        {children}
      </StyledBackgroundContainer>
    ) : (
      <StyledTextContainer
        testID={testID}
        style={[reanimatedViewStyle]}
        {...props}
      >
        {children}
      </StyledTextContainer>
    );

  return <SafeAreaContainer>{AnimatedChildren}</SafeAreaContainer>;
};

InterpolateColorAnimation.defaultProps = {
  testID: 'InterpolateColorAnimationID',
  initialColor: 'backgroundColorLight',
  finalColor: 'backgroundColorDark',
  trigger: false,
  duration: undefined,
  styleProps: { ...StyleSheet.absoluteFillObject },
  animationType: 'background',
  props: undefined,
};

export default memo(InterpolateColorAnimation);
