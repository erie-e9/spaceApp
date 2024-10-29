import React, { Fragment, memo } from 'react';
import { StyleSheet, useColorScheme, Platform, StyleProp, ViewStyle } from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AnimatedStyle,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { testProperties } from '@utils/functions';
import { useTheme as useThemeVariables, useAppPreferences } from '@hooks';
import { StyledBackgroundContainer, StyledTextContainer } from './styles';

export interface InterpolateColorAnimationProps {
  testID?: string;
  children?: string | React.ReactElement | React.ReactElement[];
  initialColor?: keyof DefaultTheme['tokens']['colors'];
  finalColor?: keyof DefaultTheme['tokens']['colors'];
  duration?: number;
  animationType?: 'text' | 'background';
  isScreen?: boolean;
  props?: any;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle | any>>>;
  dimensions?: object;
}

export const InterpolateColorAnimation: React.FC<InterpolateColorAnimationProps> = ({
  testID = 'InterpolateColorAnimationID',
  children = undefined,
  initialColor,
  finalColor,
  duration = undefined,
  style = { ...StyleSheet.absoluteFillObject },
  animationType = 'background',
  props = undefined,
  isScreen = false,
  dimensions,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { NavigationProps, darkMode } = useThemeVariables();
  const { mode, theme: themeApp } = useAppPreferences();
  const colorScheme = useColorScheme();

  const progress = useDerivedValue(() => {
    return withTiming(darkMode ? 1 : 0, {
      duration: duration || NavigationProps.interpolationTime,
    });
  }, [mode, colorScheme]);

  const reanimatedViewStyle = useAnimatedStyle(() => {
    const interpolatorColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        // initial color
        !initialColor
          ? theme.tokens.colors?.[
              animationType === 'background'
                ? darkMode
                  ? 'backgroundColor'
                  : 'backgroundColor'
                : darkMode
                ? 'backgroundColor'
                : 'backgroundColor'
            ]
          : theme.tokens.colors?.[initialColor],

        // final color
        !finalColor
          ? theme.tokens.colors?.[
              animationType === 'background'
                ? finalColor || darkMode
                  ? 'backgroundColor'
                  : 'backgroundColor'
                : finalColor || darkMode
                ? 'backgroundColor'
                : 'backgroundColor'
            ]
          : theme.tokens.colors?.[finalColor],
      ],
    );

    return {
      backgroundColor: animationType === 'background' ? interpolatorColor : 'transparent',
      color: animationType === 'text' ? interpolatorColor : null,
    };
  }, [mode, colorScheme, themeApp, theme]);

  const insetStyles = {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 65 : 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
  };

  const AnimatedChildren =
    animationType === 'background' ? (
      <StyledBackgroundContainer
        {...testProperties(testID)}
        style={[style, reanimatedViewStyle, isScreen && (dimensions ? dimensions : insetStyles)]}
      >
        {children && children}
      </StyledBackgroundContainer>
    ) : (
      <StyledTextContainer {...testProperties(testID)} style={[reanimatedViewStyle]} {...props}>
        {children && children}
      </StyledTextContainer>
    );

  return <Fragment>{AnimatedChildren}</Fragment>;
};

export default memo(InterpolateColorAnimation);
