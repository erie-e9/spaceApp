import React, { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { useCopy } from '@services';
import type { InputProps } from '@types';
import { removeBlankSpaces as removeBlankSpacesHandler, testProperties } from '@utils/functions';
import { usePasswordStrength, StrengthLevelProps } from '@hooks';
import { PasswordStrengthAnimation } from '@components/animated';
import { FieldInputMask } from '@components/molecules';
import useAutoFocus from './hooks/useAutoFocus';
import {
  LeftIcon,
  StyledTextInput,
  FooterContainer,
  FooterTextContainer,
  StyledText,
} from './styles';

export const TextInput: React.FC<InputProps> = forwardRef(
  (
    {
      value,
      testID,
      label,
      required,
      placeholder,
      error,
      touched,
      maintainFocus,
      autoCapitalize,
      secureTextEntry,
      fontSize,
      leftIcon,
      rightIcon,
      removeBlankSpaces,
      styledFocus,
      autoComplete,
      showPasswordStrength = false,
      style,
      onFocused,
      onFocusOut,
      rightIconHandler,
      onChangeText,
      multiline,
      textContentType,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const { getCopyValue } = useCopy();
    const { getPasswordStrength } = usePasswordStrength();
    const { focused, onFocus } = useAutoFocus(onFocused, onFocusOut);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const passwordStrength = useRef<StrengthLevelProps>('weak');

    const handlePasswordChange = useCallback(
      (text: string) => {
        const strength: StrengthLevelProps = getPasswordStrength(text);
        passwordStrength.current = strength;
      },
      [getPasswordStrength],
    );

    const handleChangeTextInput = useCallback(
      (text: string) => {
        if (secureTextEntry) {
          handlePasswordChange(text);
        }
        if (onChangeText) {
          onChangeText(removeBlankSpaces ? removeBlankSpacesHandler(text) : text);
        }
      },
      [secureTextEntry, handlePasswordChange, onChangeText, removeBlankSpaces],
    );

    const placeholderTextColor = useMemo(
      () =>
        value === '' && !!error
          ? theme.tokens.colors.danger_status
          : theme.tokens.colors.typography700,
      [value, error, theme.tokens.colors],
    );

    const autoCapitalizeDefault = autoCapitalize || 'none';
    const placeholderText = placeholder || label;

    const togglePassword = useCallback(() => {
      setShowPassword(!showPassword);
    }, [showPassword]);

    const footerComponent = useMemo(() => {
      if (showPasswordStrength && value !== '') {
        return (
          <FooterContainer>
            <PasswordStrengthAnimation passwordStrength={passwordStrength.current} />
            <FooterTextContainer>
              <StyledText type="Label" font="Primary" color="typography700" textAlign="justify">
                {`signup:SignUp.form.fields.password.validations.status.${passwordStrength.current}`}
              </StyledText>
            </FooterTextContainer>
          </FooterContainer>
        );
      }
      return null;
    }, [showPasswordStrength, value]);

    return (
      <FieldInputMask
        {...testProperties(testID || 'FieldInputMaskTextInputID')}
        value={value}
        required={required}
        label={label}
        maintainFocus={maintainFocus || !!value}
        error={error}
        touched={touched}
        editable={props.editable}
        focused={focused || !!value}
        heightExpansible={false}
        booleanToogle={showPassword}
        rightIcon={rightIcon}
        rightIconHandler={rightIcon === 'passwordToggle' ? togglePassword : rightIconHandler}
        footerComponent={footerComponent}
        characterCounter={
          props.maxLength ? `${(value && String(value).length) || 0}/${props.maxLength}` : undefined
        }
        style={style}
      >
        {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
        <StyledTextInput
          ref={ref}
          {...testProperties(testID || 'TextInputID')}
          multiline={multiline}
          colorTextOpposing
          autoCapitalize={autoCapitalizeDefault}
          error={!!error}
          value={String(value || '')}
          onChangeText={handleChangeTextInput}
          placeholder={
            getCopyValue(
              String(!focused ? placeholderText : placeholder !== undefined ? placeholder : ''),
            ) + `${required && !focused ? '*' : ''}`
          }
          placeholderTextColor={placeholderTextColor}
          selectionColor={theme.tokens.colors.typography800}
          onFocus={onFocus}
          fontSize={fontSize}
          secureTextEntry={secureTextEntry ? !showPassword : false}
          styledFocus={styledFocus}
          textContentType={textContentType || 'none'}
          {...props}
        />
      </FieldInputMask>
    );
  },
);

TextInput.displayName = 'TextInput';
export default memo(TextInput);
