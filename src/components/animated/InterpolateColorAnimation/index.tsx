import React, { memo } from 'react';
import { StyleSheet, useColorScheme, Platform } from 'react-native';
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
  children?: string | React.ReactElement | React.ReactElement[];
  initialColor?: string | keyof DefaultTheme['tokens']['colors'];
  finalColor?: string | keyof DefaultTheme['tokens']['colors'];
  duration?: number;
  style?: any;
  animationType?: 'text' | 'background';
  isScreen?: boolean;
  props?: any;
}

export const InterpolateColorAnimation: React.FC<
  InterpolateColorAnimationProps
> = ({
  testID = 'InterpolateColorAnimationID',
  children = undefined,
  initialColor = 'backgroundColorLight',
  finalColor = 'backgroundColorDark',
  duration = undefined,
  style = { ...StyleSheet.absoluteFillObject },
  animationType = 'background',
  props = undefined,
  isScreen = false,
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
        // initial color
        typeof initialColor === 'string' && !initialColor.includes('#')
          ? theme.tokens.colors?.[
              animationType === 'background'
                ? initialColor || 'backgroundColorLight'
                : initialColor || 'backgroundColorLight'
            ]
          : initialColor,

        // final color
        typeof finalColor === 'string' && !finalColor.includes('#')
          ? theme.tokens.colors?.[
              animationType === 'background'
                ? finalColor || 'backgroundColorDark'
                : finalColor || 'backgroundColorDark'
            ]
          : finalColor,
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
    paddingTop: Platform.OS === 'ios' ? 100 : 75,
    paddingBottom: 15,
  };

  const AnimatedChildren =
    animationType === 'background' ? (
      <StyledBackgroundContainer
        testID={testID}
        style={[style, reanimatedViewStyle, isScreen ? insetStyles : null]}
      >
        {children && children}
      </StyledBackgroundContainer>
    ) : (
      <StyledTextContainer
        testID={testID}
        style={[reanimatedViewStyle]}
        {...props}
      >
        {children && children}
      </StyledTextContainer>
    );

  return <SafeAreaContainer>{AnimatedChildren}</SafeAreaContainer>;
};

export default memo(InterpolateColorAnimation);
