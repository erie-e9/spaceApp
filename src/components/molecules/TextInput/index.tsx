import React, { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { useCopy } from '@services';
import type { InputProps } from '@types';
import { removeBlankSpaces as removeBlankSpacesHandler, testProperties } from '@utils/functions';
import { usePasswordStrength, StrengthLevelProps, useWhyDidYouUpdate } from '@hooks';
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

export const TextInput = forwardRef<typeof StyledTextInput, InputProps>(
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
      autoCapitalize = 'none',
      secureTextEntry,
      fontSize,
      leftIcon,
      rightIcon,
      removeBlankSpaces,
      styledFocus,
      showPasswordStrength = false,
      style,
      onFocused,
      onFocusOut,
      rightIconHandler,
      onChangeText,
      multiline,
      textContentType = 'none',
      ...props
    },
    ref,
  ) => {
    useWhyDidYouUpdate('TextInput', props);
    const theme = useTheme();
    const { getCopyValue } = useCopy();
    const { getPasswordStrength } = usePasswordStrength();
    const { focused, onFocus } = useAutoFocus(onFocused, onFocusOut);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const passwordStrength = useRef<StrengthLevelProps>('weak');

    const handlePasswordChange = useCallback(
      (text: string) => {
        passwordStrength.current = getPasswordStrength(text);
      },
      [getPasswordStrength],
    );

    const handleChangeText = useCallback(
      (text: string) => {
        if (secureTextEntry) {
          handlePasswordChange(text);
        }
        onChangeText?.(removeBlankSpaces ? removeBlankSpacesHandler(text) : text);
      },
      [secureTextEntry, handlePasswordChange, onChangeText, removeBlankSpaces],
    );

    const placeholderTextColor = useMemo(
      () =>
        value === '' && error
          ? theme.tokens.colors.danger_status
          : theme.tokens.colors.typography700,
      [value, error, theme.tokens.colors],
    );

    const placeholderText = useMemo(
      () =>
        getCopyValue(
          String(!focused ? placeholder || label : placeholder !== undefined ? placeholder : ''),
        ) + `${required && !focused ? '*' : ''}`,

      [getCopyValue, focused, placeholder, label, required],
    );

    const togglePassword = useCallback(() => setShowPassword((prev) => !prev), []);

    const footerComponent = useMemo(() => {
      if (!showPasswordStrength || value === '') {
        return null;
      }

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
        characterCounter={props.maxLength ? `${value?.length || 0}/${props.maxLength}` : undefined}
        style={style}
      >
        {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
        <StyledTextInput
          ref={ref}
          {...testProperties(testID || 'TextInputID')}
          multiline={multiline}
          colorTextOpposing
          autoCapitalize={autoCapitalize}
          error={!!error}
          value={String(value || '')}
          onChangeText={handleChangeText}
          placeholder={getCopyValue(placeholderText)}
          placeholderTextColor={placeholderTextColor}
          selectionColor={theme.tokens.colors.typography800}
          onFocus={onFocus}
          fontSize={fontSize}
          secureTextEntry={secureTextEntry ? !showPassword : false}
          styledFocus={styledFocus}
          textContentType={textContentType}
          {...props}
        />
      </FieldInputMask>
    );
  },
);

TextInput.displayName = 'TextInput';
export default memo(TextInput);
