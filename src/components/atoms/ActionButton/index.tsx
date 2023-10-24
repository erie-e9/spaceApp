import React, { useState, useEffect, useCallback, memo } from 'react';
import { DefaultTheme, useTheme } from 'styled-components/native';
import type * as CSS from 'csstype';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from '@utils/functions';
import { LoaderThreeDots } from '@components/atoms';
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
  loading?: boolean;
  textColor?: string;
  numberOfLines?: number;
  backgroundColor?: string;
  onPress?: () => void;
  onPressAsync?: () => Promise<void>;
  onPressType?: 'onPress' | 'onPressIn' | 'onLongPress' | 'onPressOut';
  buttonTheme?: 'Primary' | 'Secondary' | 'Dark';
  type?: 'Button' | 'Fab' | 'Link' | 'Text' | 'Icon';
  readonly disabledColor?: keyof DefaultTheme['colors'];
  disabled?: boolean;
  grouped?: boolean;
  fontWeight?: CSS.StandardProperties['fontWeight'];
  fontSize?: CSS.StandardProperties['fontSize'];
  lineHeight?: CSS.StandardProperties['lineHeight'];
  fullWidth?: boolean;
  Icon?: JSX.Element;
  buttonType?: string;
  textTransform?: CSS.StandardProperties['textTransform'] | undefined;
  featureFlags?: string[];
  [x: string]: unknown;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  testID,
  title,
  textColor,
  numberOfLines,
  backgroundColor,
  onPress,
  onPressAsync,
  onPressType,
  loading,
  type,
  disabled,
  style,
  grouped,
  fontWeight,
  fontSize,
  disabledColor,
  Icon,
  fullWidth = true,
  buttonType,
  buttonTheme,
  textTransform,
  featureFlags = [],
  ...rest
}) => {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const width = useSharedValue(SCREEN_WIDTH - 50);
  const [asyncDisabled, setAsyncDisabled] = useState(false);

  const getButtonTheme = (): {
    bgColor: string;
    txtColor: string;
    hasBorder: boolean;
  } => {
    let bgColor = theme.tokens.colors.surfaceL4;
    let txtColor = theme.tokens.colors.surfaceL5;
    let hasBorder = false;
    const typeButton = type ?? 'Button';

    const buttomThemeSecondary =
      colorScheme === 'light'
        ? theme.tokens.colors.opposing
        : theme.tokens.colors.opposing;

    const disableButtonTextColor =
      buttonTheme === 'Secondary'
        ? buttomThemeSecondary
        : theme.tokens.colors.disabledButtonTextColor;

    const notDisableButtonTextColor =
      buttonTheme === 'Secondary'
        ? buttomThemeSecondary
        : theme.tokens.colors.none;

    const bgColorLightScondary =
      buttonTheme === 'Secondary'
        ? theme.tokens.colors.transparent
        : theme.tokens.colors.primaryD1;

    const bgDisabledColors =
      buttonTheme === 'Primary'
        ? theme.tokens.colors.primaryD1
        : theme.tokens.colors.tertiaryD5;

    const bgColorLight =
      disabled || asyncDisabled ? bgDisabledColors : bgColorLightScondary;

    const bgColorDarktSecondaryDisabled = theme.tokens.colors.surfaceL4
      ? theme.tokens.colors.primaryD1
      : theme.tokens.colors.none;

    const bgColorDarkSecondary =
      !disabled && buttonTheme === 'Secondary'
        ? 'transparent'
        : bgColorDarktSecondaryDisabled;

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
          bgColor = theme.tokens.colors.none;
        }
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

  useEffect(() => {
    if (asyncDisabled && onPressAsync) {
      onPressAsync()
        .then(() => setAsyncDisabled(false))
        .catch(() => setAsyncDisabled(false));
    }
  }, [asyncDisabled]);

  useEffect(() => {
    if (loading) {
      width.value = withSpring(50, { stiffness: 100, damping: 15 });
    } else {
      width.value = withSpring(SCREEN_WIDTH - 50, {
        stiffness: 100,
        damping: 15,
      });
    }
  }, [loading]);

  const buttonAnimation = useAnimatedStyle(() => {
    return {
      width: type === 'Icon' ? 50 : width.value,
    };
  }, []);

  return (
    <AnimatedActionButton testID={testID} style={[buttonAnimation]}>
      <StyledButton
        featureFlags={featureFlags}
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
        {...rest}
      >
        {(loading || asyncDisabled) && (
          <LoadingContainer>
            <LoaderThreeDots color={textColor || btnTheme.txtColor} />
          </LoadingContainer>
        )}
        {!loading && Icon && <IconContainer>{Icon}</IconContainer>}
        {!loading && !asyncDisabled && (
          <StyledText
            fontWeight={fontWeight}
            color={textColor || btnTheme.txtColor}
            fontSize={fontSize}
            fullWidth={fullWidth}
            disabled={disabled || asyncDisabled}
            disabledColor={disabledColor}
            buttonType={buttonType}
            textTransform={textTransform}
            numberOfLines={numberOfLines}
          >
            {title}
          </StyledText>
        )}
      </StyledButton>
    </AnimatedActionButton>
  );
};

ActionButton.defaultProps = {
  testID: 'ActionButtonID',
  title: '',
  loading: false,
  textColor: '',
  numberOfLines: 1,
  textTransform: undefined,
  onPress: undefined,
  onPressType: 'onPress',
  onPressAsync: undefined,
  buttonTheme: 'Primary',
  type: 'Button',
  disabledColor: 'primaryD5',
  disabled: false,
  grouped: false,
  fontSize: undefined,
  fontWeight: 'normal',
  lineHeight: 'normal',
  fullWidth: true,
  buttonType: undefined,
  backgroundColor: '',
  Icon: undefined,
  featureFlags: [],
};

export default memo(ActionButton);
