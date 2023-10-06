import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { DefaultTheme, useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppPreferencesState } from '@redux/store/slices/types/appPreferences';
import { useTheme as themeVariables } from '@hooks';
import { StyledBackgroundContainer } from './styles';

export interface InterpolateColorAnimationProps {
  children: string | React.ReactElement | React.ReactElement[];
  initialColor: keyof DefaultTheme['tokens']['colors'];
  finalColor: keyof DefaultTheme['tokens']['colors'];
  trigger?: boolean;
  duration?: number;
  styleProps?: any;
  animationType?: 'text' | 'background';
  props?: any;
}

const InterpolateColorAnimation: React.FC<InterpolateColorAnimationProps> = ({
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

  const progress = useDerivedValue(() => {
    return isDarkMode
      ? withTiming(1, {
          duration: duration || NavigationProps.interpolationTime,
        })
      : withTiming(0, {
          duration: duration || NavigationProps.interpolationTime,
        });
  }, [isDarkMode]);

  const reanimatedViewStyle = useAnimatedStyle(() => {
    const interpolatorColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        theme.tokens.colors?.[
          animationType === 'background'
            ? initialColor || 'primaryD1'
            : initialColor || 'textLabelNeutral'
        ],
        theme.tokens.colors?.[
          animationType === 'background'
            ? finalColor || 'primaryD1'
            : finalColor || 'textLabelNeutral'
        ],
      ],
    );

    return {
      backgroundColor:
        animationType === 'background' ? interpolatorColor : 'transparent',
      color: animationType === 'text' ? interpolatorColor : null,
    };
  }, [isDarkMode]);

  const insetStyles = {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: insets.top,
    paddingBottom: 20,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const AnimatedChildren =
    animationType === 'background' ? (
      <StyledBackgroundContainer
        style={[styleProps, reanimatedViewStyle, insetStyles]}
      >
        {children}
      </StyledBackgroundContainer>
    ) : (
      <Animated.Text style={[reanimatedViewStyle]} {...props}>
        {children}
      </Animated.Text>
    );
  return AnimatedChildren;
};

InterpolateColorAnimation.defaultProps = {
  trigger: false,
  duration: undefined,
  styleProps: { ...StyleSheet.absoluteFillObject },
  animationType: 'background',
};

export default InterpolateColorAnimation;
