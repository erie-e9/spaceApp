import React, { useState, useEffect } from 'react';
import type * as CSS from 'csstype';
import { DefaultTheme, useTheme } from 'styled-components/native';
import Loader from '@components/atoms/LoaderThreeDots';
import {
  LoadingContainer,
  StyledButton,
  StyledText,
  IconContainer,
} from './styles';

export interface ActionButtonProps {
  title?: string;
  loading?: boolean;
  textColor?: string;
  numberOfLines?: number;
  backgroundColor?: string;
  onPress?: () => void;
  onPressAsync?: () => Promise<void>;
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
  testID?: string;
  buttonType?: string;
  textTransform?: CSS.StandardProperties['textTransform'] | undefined;
  featureFlags?: string[];
  [x: string]: unknown;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  textColor,
  numberOfLines,
  backgroundColor,
  onPress,
  loading,
  onPressAsync,
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
  testID,
  featureFlags = [],
  ...rest
}) => {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const [asyncDisabled, setAsyncDisabled] = useState(false);

  const getButtonTheme = (): {
    bgColor: string;
    txtColor: string;
    hasBorder: boolean;
  } => {
    let bgColor = theme.tokens.colors.darkBlueD1;
    let txtColor = theme.tokens.colors.surfaceL5;
    let hasBorder = false;
    const typeButton = type ?? 'Button';

    const buttomThemeSecondary =
      colorScheme === 'light'
        ? theme.tokens.colors.darkBlueD1
        : theme.colors.text.white;
    const notDisbleButtonTextColor =
      buttonTheme === 'Secondary'
        ? buttomThemeSecondary
        : theme.tokens.colors.surfaceL4;

    const bgColorLightScondary =
      buttonTheme === 'Secondary'
        ? theme.tokens.colors.transparent
        : theme.tokens.colors.darkBlueD1;

    const bgColorLight =
      disabled || asyncDisabled
        ? theme.tokens.colors.disabledButtonColor
        : bgColorLightScondary;

    const bgColorDarktSecondaryDisabled = theme.tokens.colors.darkBlueD1
      ? theme.tokens.colors.primaryD1
      : theme.tokens.colors.none;

    const bgColorDarkSecondary =
      !disabled && buttonTheme === 'Secondary'
        ? 'transparent'
        : bgColorDarktSecondaryDisabled;

    const bgColorDark =
      disabled || asyncDisabled
        ? theme.tokens.colors.primaryD4
        : bgColorDarkSecondary;

    switch (typeButton) {
      case 'Button':
        txtColor =
          disabled || asyncDisabled
            ? theme.tokens.colors.disabledButtonTextColor
            : notDisbleButtonTextColor;
        bgColor = colorScheme === 'light' ? bgColorLight : bgColorDark;
        hasBorder = buttonTheme === 'Secondary';
        break;
      case 'Text':
        hasBorder = false;
        if (buttonTheme === 'Secondary') {
          txtColor =
            buttonTheme === 'Secondary'
              ? theme.tokens.colors.darkBlueD1
              : theme.tokens.colors.primaryD1;
          bgColor = 'transparent';
        } else if (buttonTheme === 'Dark') {
          txtColor =
            buttonTheme === 'Dark'
              ? theme.tokens.colors.lightBlueL5
              : theme.tokens.colors.primaryD1;
          bgColor = 'transparent';
        } else {
          txtColor =
            buttonTheme === 'Primary'
              ? theme.tokens.colors.darkBlueD1
              : theme.tokens.colors.primaryD1;
          bgColor = theme.tokens.colors.none;
        }
        break;
      case 'Icon':
        hasBorder = true;
        if (buttonTheme === 'Secondary') {
          txtColor =
            buttonTheme === 'Secondary'
              ? theme.tokens.colors.darkBlueD1
              : theme.tokens.colors.primaryD1;
          bgColor = colorScheme === 'light' ? bgColorLight : bgColorDark;
        } else if (buttonTheme === 'Dark') {
          txtColor =
            buttonTheme === 'Dark'
              ? theme.tokens.colors.lightBlueL5
              : theme.tokens.colors.primaryD1;
          bgColor = 'transparent';
        } else {
          txtColor =
            buttonTheme === 'Primary'
              ? theme.tokens.colors.darkBlueD1
              : theme.tokens.colors.primaryD1;
          bgColor = theme.tokens.colors.none;
        }
        break;
      default:
        txtColor =
          buttonTheme === 'Dark'
            ? theme.tokens.colors.lightBlueL5
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

  const handlePress = (): void => {
    if (onPressAsync) {
      setAsyncDisabled(true);
    }
    if (onPress) {
      onPress();
    }
  };

  useEffect(() => {
    if (asyncDisabled && onPressAsync) {
      onPressAsync()
        .then(() => setAsyncDisabled(false))
        .catch(() => setAsyncDisabled(false));
    }
  }, [asyncDisabled]);

  return (
    <StyledButton
      featureFlags={featureFlags}
      testID={testID}
      backgroundColor={
        backgroundColor === '' ? btnTheme.bgColor : backgroundColor
      }
      disabled={featureFlags?.length === 0 ? disabled || asyncDisabled : false}
      disabledColor={disabledColor}
      onPress={handlePress}
      hasBorder={disabled ? false : btnTheme.hasBorder}
      style={style}
      type={type}
      grouped={grouped}
      colorScheme={colorScheme ?? 'light'}
      loading={loading}
      {...rest}
    >
      {(loading || asyncDisabled) && (
        <LoadingContainer>
          <Loader />
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
  );
};

export default ActionButton;
ActionButton.defaultProps = {
  title: '',
  loading: false,
  textColor: '',
  numberOfLines: 1,
  textTransform: undefined,
  onPress: undefined,
  onPressAsync: undefined,
  buttonTheme: 'Primary',
  type: 'Button',
  disabledColor: 'primary',
  disabled: false,
  grouped: false,
  fontSize: undefined,
  fontWeight: 'normal',
  lineHeight: 'normal',
  fullWidth: true,
  testID: 'action-button-id',
  buttonType: undefined,
  backgroundColor: '',
  Icon: undefined,
  featureFlags: [],
};
