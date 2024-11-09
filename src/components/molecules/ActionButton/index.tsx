import React, { useState, useEffect, useCallback, memo, useRef, Fragment } from 'react';
import { useTheme } from 'styled-components/native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { testProperties } from '@utils/functions';
import { type TouchableProps } from '@types';
import { LoaderDots, Lottie, SVGIcon } from '@components/atoms';
import {
  AnimatedContainer,
  StyledButton,
  LoadingContainer,
  IconContainer,
  StyledText,
  StyledImage,
} from './styles';

const ActionButton: React.FC<TouchableProps> = ({
  testID = 'ActionButtonID',
  title,
  subtitle,
  textColor,
  numberOfLines = 1,
  backgroundColor,
  onPressType = 'onPress',
  type = 'Button',
  loading = false,
  disabled = false,
  style,
  grouped = false,
  fontWeight = 'normal',
  disabledColor = 'primary700',
  icon,
  iconType = 'svg',
  widthButton,
  widthIcon = 40,
  heightIcon = 40,
  startFrameAnimation,
  endFrameAnimation,
  buttonType,
  buttonTheme = 'Primary',
  textTransform,
  remoteFeatureFlags = [],
  onPress,
  onPressAsync,
  ...props
}) => {
  const animationRef = useRef<LottieView>(null);
  const theme = useTheme();
  const colorScheme = theme.mode;
  const widthOfButton = '100%';
  const width = useSharedValue(widthOfButton);
  const [asyncDisabled, setAsyncDisabled] = useState<boolean>(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 400);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const getButtonTheme = (): {
    backgroundColor: string;
    buttonTextColor: string;
    hasBorder: boolean;
  } => {
    let backgroundColor = 'primary500';
    let buttonTextColor = 'secondary950';
    let hasBorder = false;
    const typeButton = type ?? 'Button';

    const disableButtonTextColor =
      buttonTheme === 'Secondary'
        ? 'secondary950'
        : colorScheme === 'dark'
        ? 'tertiary50' // text button disabled dark
        : 'secondary950'; // text button disabled light

    const notDisableButtonTextColor =
      buttonTheme === 'Secondary'
        ? 'secondary950'
        : colorScheme === 'dark'
        ? 'tertiary50' // text button dark
        : 'secondary950'; // text button light

    const backgroundColorLightScondary =
      buttonTheme === 'Secondary' ? 'transparent' : 'transparent'; // color enable button

    const backgroundDisabledColors =
      buttonTheme === 'Primary'
        ? colorScheme === 'dark'
          ? 'primary400' // button disabled dark
          : 'primary100' // button disabled light
        : 'transparent';

    const backgroundColorLight =
      (disabled || asyncDisabled) && !loading
        ? backgroundDisabledColors
        : backgroundColorLightScondary;

    const backgroundColorDarkSecondary =
      !disabled && buttonTheme === 'Secondary'
        ? 'transparent'
        : buttonTheme === 'Primary'
        ? 'primary500'
        : 'transparent'; // color enable button

    const backgroundColorDark = //? here
      (disabled || asyncDisabled) && !loading
        ? backgroundDisabledColors
        : backgroundColorDarkSecondary;

    switch (typeButton) {
      case 'Button':
        buttonTextColor =
          disabled || asyncDisabled ? disableButtonTextColor : notDisableButtonTextColor;
        backgroundColor = colorScheme === 'light' ? backgroundColorLight : backgroundColorDark;
        hasBorder = buttonTheme === 'Secondary';
        break;
      case 'Text':
        hasBorder = false;
        if (buttonTheme === 'Secondary') {
          buttonTextColor = 'secondary950';
        } else if (buttonTheme === 'Dark') {
          buttonTextColor = buttonTheme === 'Dark' ? 'tertiary200' : 'primary500';
        } else {
          buttonTextColor = buttonTheme === 'Primary' ? 'secondary950' : 'primary500';
        }
        backgroundColor = 'transparent';
        break;
      case 'Icon':
        hasBorder = true;
        if (buttonTheme === 'Secondary') {
          buttonTextColor = buttonTheme === 'Secondary' ? 'tertiary200' : 'primary500';
          backgroundColor = 'transparent';
        } else if (buttonTheme === 'Dark') {
          buttonTextColor = buttonTheme === 'Dark' ? 'tertiary200' : 'primary500';
          backgroundColor = 'transparent';
        } else {
          buttonTextColor = buttonTheme === 'Primary' ? 'tertiary200' : 'primary500';
          backgroundColor = 'transparent';
        }
        break;
      default:
        buttonTextColor = buttonTheme === 'Dark' ? 'tertiary200' : 'primary500';
        backgroundColor = 'tertiary50';
        hasBorder = buttonTheme === 'Secondary';
        break;
    }

    return {
      backgroundColor,
      buttonTextColor,
      hasBorder,
    };
  };

  const customButtonTheme = getButtonTheme();

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
      width: type === 'Icon' ? '10%' : widthButton ? widthButton : width.value,
    };
  }, [widthButton]);

  useEffect(() => {
    if (asyncDisabled && onPressAsync) {
      onPressAsync()
        .then(() => setAsyncDisabled(false))
        .catch(() => setAsyncDisabled(false));
    }
  }, [asyncDisabled]);

  useEffect(() => {
    if (loading) {
      width.value = withSpring('10%', { stiffness: 100, damping: 15 });
    } else {
      width.value = withSpring(widthOfButton, {
        stiffness: 100,
        damping: 15,
      });
    }
  }, [loading]);

  return (
    <AnimatedContainer {...testProperties(testID)} style={[buttonAnimation]}>
      <StyledButton
        onPress={handlePress}
        backgroundColor={backgroundColor ? backgroundColor : customButtonTheme.backgroundColor}
        disabled={remoteFeatureFlags?.length === 0 ? disabled || asyncDisabled : false}
        colorScheme={colorScheme ?? 'light'}
        disabledColor={disabledColor}
        onPressType={onPressType}
        type={type}
        hasBorder={disabled && buttonTheme === 'Primary' ? false : customButtonTheme.hasBorder}
        style={style}
        grouped={grouped}
        loading={loading}
        remoteFeatureFlags={remoteFeatureFlags}
        {...props}
      >
        {(loading || asyncDisabled) && (
          <LoadingContainer>
            <LoaderDots
              animationScale={1}
              animationTranslateY={-6}
              color={textColor || customButtonTheme.buttonTextColor}
            />
          </LoadingContainer>
        )}
        {!loading && icon && iconType === 'svg' && (
          <IconContainer>
            {typeof icon === 'string' ? <SVGIcon icon={icon || ''} /> : icon}
          </IconContainer>
        )}
        {!loading && icon && iconType === 'lottie' && (
          <Lottie
            ref={animationRef}
            source={icon}
            autoPlay={!false}
            renderMode="AUTOMATIC"
            loop={false}
            resizeMode="contain"
            width={widthIcon + 5 || 40}
            height={heightIcon + 5 || 40}
            startFrame={startFrameAnimation}
            endFrame={endFrameAnimation}
          />
        )}
        {!loading && icon && iconType === 'image' && (
          <StyledImage source={icon} size={widthIcon || 40} />
        )}
        {!loading && !asyncDisabled && title && iconType !== 'lottie' && (
          <Fragment>
            <StyledText
              testID="actionbutton-title"
              fontWeight={fontWeight}
              color={textColor || customButtonTheme.buttonTextColor}
              type="Button"
              textTransform={textTransform}
              numberOfLines={numberOfLines}
            >
              {title}
            </StyledText>
            {!!subtitle && (
              <StyledText
                testID="actionbutton-subtitle"
                type="Subtitle2"
                color={textColor || customButtonTheme.buttonTextColor}
              >
                {subtitle}
              </StyledText>
            )}
          </Fragment>
        )}
      </StyledButton>
    </AnimatedContainer>
  );
};

export default memo(ActionButton);
