import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { DefaultTheme, useTheme } from 'styled-components/native';
import { useTheme as useThemeVariables } from '@hooks';
import type * as CSS from 'csstype';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useCopy } from '@services';
import { screen_width } from '@utils/functions';
import { LoaderDots, Lottie } from '@components/atoms';
import {
  AnimatedActionButton,
  StyledButton,
  LoadingContainer,
  IconContainer,
  StyledText,
} from './styles';

export interface ActionButtonProps {
  testID?: string;
  title?: string;
  subtitle?: string;
  loading?: boolean;
  textColor?: string;
  numberOfLines?: number;
  backgroundColor?: string;
  onPress?: () => void;
  onPressAsync?: () => Promise<void>;
  onPressType?: 'onPress' | 'onPressIn' | 'onLongPress' | 'onPressOut';
  buttonTheme?: 'Primary' | 'Secondary' | 'Dark';
  type?: 'Button' | 'Fab' | 'Link' | 'Text' | 'Icon';
  disabledColor?: keyof DefaultTheme['colors'];
  disabled?: boolean;
  style?: any;
  grouped?: boolean;
  fontWeight?: CSS.StandardProperties['fontWeight'];
  lineHeight?: CSS.StandardProperties['lineHeight'];
  icon?: JSX.Element | string | any;
  iconType?: 'svg' | 'lottie';
  widthIcon?: number;
  heightIcon?: number;
  startFrameAnimation?: number;
  endFrameAnimation?: number;
  buttonType?: string;
  textTransform?: CSS.StandardProperties['textTransform'] | undefined;
  featureFlags?: string[];
}

const ActionButton: React.FC<ActionButtonProps> = ({
  testID = 'ActionButtonID',
  title,
  subtitle,
  textColor = '',
  numberOfLines = 1,
  backgroundColor = '',
  onPress,
  onPressAsync,
  onPressType = 'onPress',
  loading = false,
  type,
  disabled = false,
  style,
  grouped = false,
  fontWeight = 'normal',
  disabledColor = 'primaryL2',
  icon,
  iconType = 'svg',
  widthIcon = 40,
  heightIcon = 40,
  startFrameAnimation,
  endFrameAnimation,
  buttonType,
  buttonTheme = 'Primary',
  textTransform,
  featureFlags = [],
  ...rest
}) => {
  const { getCopyValue } = useCopy();
  const animationRef = useRef<LottieView>(null);
  const { Animations } = useThemeVariables();
  const theme = useTheme();
  const colorScheme = theme.mode;
  const width = useSharedValue(screen_width - 50);
  const [asyncDisabled, setAsyncDisabled] = useState(false);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 400);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const getButtonTheme = (): {
    bgColor: string;
    txtColor: string;
    hasBorder: boolean;
  } => {
    let bgColor = theme.tokens.colors.surfaceL4;
    let txtColor = theme.tokens.colors.surfaceL5;
    let hasBorder = false;
    const typeButton = type ?? 'Button';

    const disableButtonTextColor =
      buttonTheme === 'Secondary'
        ? theme.tokens.colors.opposing
        : theme.tokens.colors.disabledButtonTextColor;

    const notDisableButtonTextColor =
      buttonTheme === 'Secondary'
        ? theme.tokens.colors.opposing
        : theme.tokens.colors.none;

    const bgColorLightScondary =
      buttonTheme === 'Secondary'
        ? theme.tokens.colors.transparent
        : theme.tokens.colors.primaryD1;

    const bgDisabledColors =
      buttonTheme === 'Primary'
        ? theme.tokens.colors.primaryD1
        : theme.tokens.colors.transparent;

    const bgColorLight =
      disabled || asyncDisabled ? bgDisabledColors : bgColorLightScondary;

    const bgColorDarkSecondary =
      !disabled && buttonTheme === 'Secondary'
        ? 'transparent'
        : theme.tokens.colors.primaryD1;

    const bgColorDark =
      disabled || asyncDisabled ? bgDisabledColors : bgColorDarkSecondary;

    switch (typeButton) {
      case 'Button':
        txtColor =
          disabled || asyncDisabled
            ? disableButtonTextColor
            : notDisableButtonTextColor;
        bgColor = colorScheme === 'light' ? bgColorLight : bgColorDark;
        hasBorder = buttonTheme === 'Secondary';
        break;
      case 'Text':
        hasBorder = false;
        if (buttonTheme === 'Secondary') {
          txtColor = theme.tokens.colors.opposing;
        } else if (buttonTheme === 'Dark') {
          txtColor =
            buttonTheme === 'Dark'
              ? theme.tokens.colors.secondaryL5
              : theme.tokens.colors.primaryD1;
        } else {
          txtColor =
            buttonTheme === 'Primary'
              ? theme.tokens.colors.surfaceL4
              : theme.tokens.colors.primaryD1;
        }
        bgColor = 'transparent';
        break;
      case 'Icon':
        hasBorder = true;
        if (buttonTheme === 'Secondary') {
          txtColor =
            buttonTheme === 'Secondary'
              ? theme.tokens.colors.surfaceL4
              : theme.tokens.colors.primaryD1;
          bgColor = 'transparent';
        } else if (buttonTheme === 'Dark') {
          txtColor =
            buttonTheme === 'Dark'
              ? theme.tokens.colors.secondaryL5
              : theme.tokens.colors.primaryD1;
          bgColor = 'transparent';
        } else {
          txtColor =
            buttonTheme === 'Primary'
              ? theme.tokens.colors.surfaceL4
              : theme.tokens.colors.primaryD1;
          bgColor = 'transparent';
        }
        break;
      default:
        txtColor =
          buttonTheme === 'Dark'
            ? theme.tokens.colors.secondaryL5
            : theme.tokens.colors.primaryD1;
        bgColor = theme.tokens.colors.none;
        hasBorder = buttonTheme === 'Secondary';
        break;
    }

    return {
      bgColor,
      txtColor,
      hasBorder,
    };
  };

  const btnTheme = getButtonTheme();

  const handlePress = useCallback((): void => {
    if (onPressAsync) {
      setAsyncDisabled(true);
    }
    if (onPress) {
      onPress();
    }
  }, [onPress, asyncDisabled]);

  const buttonAnimation = useAnimatedStyle(() => {
    return {
      width: type === 'Icon' ? 40 : width.value,
    };
  }, []);

  useEffect(() => {
    if (asyncDisabled && onPressAsync) {
      onPressAsync()
        .then(() => setAsyncDisabled(false))
        .catch(() => setAsyncDisabled(false));
    }
  }, [asyncDisabled]);

  useEffect(() => {
    if (loading) {
      width.value = withSpring(40, { stiffness: 100, damping: 15 });
    } else {
      width.value = withSpring(screen_width - 40, {
        stiffness: 100,
        damping: 15,
      });
    }
  }, [loading]);

  return (
    <AnimatedActionButton testID={testID} style={[buttonAnimation]}>
      <StyledButton
        backgroundColor={
          backgroundColor === '' ? btnTheme.bgColor : backgroundColor
        }
        disabled={
          featureFlags?.length === 0 ? disabled || asyncDisabled : false
        }
        disabledColor={disabledColor}
        onPress={handlePress}
        onPressType={onPressType}
        hasBorder={
          disabled && buttonTheme === 'Primary' ? false : btnTheme.hasBorder
        }
        style={style}
        type={type}
        grouped={grouped}
        colorScheme={colorScheme ?? 'light'}
        loading={loading}
        featureFlags={featureFlags}
        {...rest}
      >
        {(loading || asyncDisabled) && (
          <LoadingContainer>
            <LoaderDots
              animationScale={1}
              animationTranslateY={-6}
              color={textColor || btnTheme.txtColor}
            />
          </LoadingContainer>
        )}
        {!loading && icon && iconType === 'svg' && (
          <IconContainer>{icon}</IconContainer>
        )}
        {icon && iconType === 'lottie' && (
          <Lottie
            ref={animationRef}
            source={icon}
            autoPlay={!false}
            renderMode="AUTOMATIC"
            loop={false}
            resizeMode="contain"
            width={widthIcon || 40}
            height={heightIcon || 40}
            startFrame={startFrameAnimation}
            endFrame={endFrameAnimation}
          />
        )}
        {!loading && !asyncDisabled && title && iconType !== 'lottie' && (
          <>
            <StyledText
              testID="actionbutton-title"
              fontWeight={fontWeight}
              color={textColor || btnTheme.txtColor}
              type="Body2"
              textTransform={textTransform}
              numberOfLines={numberOfLines}
            >
              {getCopyValue(title)}
            </StyledText>
            {!!subtitle && (
              <StyledText
                testID="actionbutton-subtitle"
                type="Subtitle2"
                color={textColor || btnTheme.txtColor}
              >
                {getCopyValue(subtitle)}
              </StyledText>
            )}
          </>
        )}
      </StyledButton>
    </AnimatedActionButton>
  );
};

export default memo(ActionButton);
