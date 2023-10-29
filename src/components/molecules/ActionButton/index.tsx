import React, { useState, useEffect, useCallback, memo } from 'react';
import { DefaultTheme, useTheme } from 'styled-components/native';
import type * as CSS from 'csstype';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useCopy } from '@services';
import { screen_width } from '@utils/functions';
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
  readonly disabledColor?: keyof DefaultTheme['colors'];
  disabled?: boolean;
  grouped?: boolean;
  fontWeight?: CSS.StandardProperties['fontWeight'];
  lineHeight?: CSS.StandardProperties['lineHeight'];
  Icon?: JSX.Element;
  buttonType?: string;
  textTransform?: CSS.StandardProperties['textTransform'] | undefined;
  featureFlags?: string[];
  [x: string]: unknown;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  testID,
  title,
  subtitle,
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
  disabledColor,
  Icon,
  buttonType,
  buttonTheme,
  textTransform,
  featureFlags = [],
  ...rest
}) => {
  const { getCopyValue } = useCopy();
  const theme = useTheme();
  const colorScheme = theme.mode;
  const width = useSharedValue(screen_width - 50);
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
      width: type === 'Icon' ? 50 : width.value,
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
      width.value = withSpring(50, { stiffness: 100, damping: 15 });
    } else {
      width.value = withSpring(screen_width - 50, {
        stiffness: 100,
        damping: 15,
      });
    }
  }, [loading]);

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
        {!loading && !asyncDisabled && title && (
          <>
            <StyledText
              testID="actionbutton-title"
              fontWeight={fontWeight}
              color={textColor || btnTheme.txtColor}
              type="Body2"
              disabled={disabled || asyncDisabled}
              disabledColor={disabledColor}
              buttonType={buttonType}
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

ActionButton.defaultProps = {
  testID: 'ActionButtonID',
  title: undefined,
  subtitle: undefined,
  textColor: '',
  numberOfLines: 1,
  textTransform: undefined,
  onPress: undefined,
  onPressType: 'onPress',
  onPressAsync: undefined,
  buttonTheme: 'Primary',
  type: 'Button',
  disabledColor: 'primaryD5',
  loading: false,
  disabled: false,
  grouped: false,
  fontWeight: 'normal',
  lineHeight: 'normal',
  buttonType: undefined,
  backgroundColor: '',
  Icon: undefined,
  featureFlags: [],
};

export default memo(ActionButton);
