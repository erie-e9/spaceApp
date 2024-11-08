import React, { Fragment, forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import { useCopy } from '@services';
import { type InputProps } from '@types';
import { removeBlankSpaces as removeBlankSpacesHandler, testProperties } from '@utils/functions';
import { usePasswordStrength } from '@hooks';
import useAutoFocus from './hooks/useAutoFocus';
import { StrengthLevelProps } from '@hooks/utils/usePasswordStrength';
import { PasswordStrengthAnimation } from '@components/animated';
import { FieldInputMask, CloseButton, EyeButton } from '@components/molecules';
import {
  LeftIcon,
  RightIconStyled,
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
      name,
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
    const [passwordStrength, setPasswordStrength] = useState<StrengthLevelProps>('weak');

    const handlePasswordChange = useCallback((text: string) => {
      const strenth: StrengthLevelProps = getPasswordStrength(text);
      setPasswordStrength(strenth);
    }, []);

    const handleChangeTextInput = useCallback((text: string) => {
      if (secureTextEntry) {
        handlePasswordChange(text);
      }
      if (onChangeText) {
        onChangeText(removeBlankSpaces ? removeBlankSpacesHandler(text) : text);
      }
    }, []);

    const placeholderTextColor = useMemo(() => {
      return value === '' && !!error
        ? theme.tokens.colors.danger_status
        : theme.tokens.colors.secondary500;
    }, [value, error]);

    const autoCapitalizeDefault = autoCapitalize || 'none';
    const placeholderText = placeholder || label;
    const autoCompleteType = props.keyboardType === 'phone-pad' ? 'telephoneNumber' : autoComplete;

    return (
      <FieldInputMask
        {...testProperties(testID || 'FieldInputMaslTextInputID')}
        value={value}
        required={required}
        label={label}
        maintainFocus={maintainFocus || !!value}
        error={error}
        touched={touched}
        editable={props.editable}
        focused={focused || !!value}
        heightExpansible={false}
        footerComponent={
          showPasswordStrength &&
          passwordStrength !== null &&
          value !== '' && (
            <FooterContainer>
              <PasswordStrengthAnimation passwordStrength={passwordStrength} />
              <FooterTextContainer>
                <StyledText type="Label" font="Primary" color="typography700" textAlign="justify">
                  {`signup:SignUp.form.fields.password.validations.status.${passwordStrength}`}
                </StyledText>
              </FooterTextContainer>
            </FooterContainer>
          )
        }
        characterCounter={
          props.maxLength ? `${(value && String(value).length) || 0}/${props.maxLength}` : undefined
        }
        style={style}
      >
        {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
        <StyledTextInput
          ref={ref}
          {...testProperties(testID || 'TextInputID')}
          name={name}
          multiline={multiline}
          colorTextOpposing
          autoCapitalize={autoCapitalizeDefault}
          error={!!error}
          value={String(value || '')}
          onChangeText={(text: string) => handleChangeTextInput(text)}
          placeholder={
            getCopyValue(
              String(!focused ? placeholderText : placeholder !== undefined ? placeholder : ''),
            ) + `${required && !focused ? '*' : ''}`
          }
          placeholderTextColor={placeholderTextColor}
          onFocus={onFocus}
          fontSize={fontSize}
          secureTextEntry={secureTextEntry ? !showPassword : false}
          styledFocus={styledFocus}
          textTextInputContainerType={autoCompleteType}
          textContentType={textContentType || 'none'}
          {...props}
        />

        {rightIcon && !!value && (
          <RightIconStyled multiline={String(value).length > 35 && multiline}>
            {rightIcon === 'clear' ? (
              <CloseButton onPress={rightIconHandler} />
            ) : rightIcon === 'passwordToggle' ? (
              <EyeButton
                size={25}
                visible={showPassword}
                onPress={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Fragment></Fragment>
            )}
          </RightIconStyled>
        )}
      </FieldInputMask>
    );
  },
);

export default memo(TextInput);
