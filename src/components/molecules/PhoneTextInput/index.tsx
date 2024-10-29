import React, { JSXElementConstructor, ReactElement } from 'react';
import { useTheme } from 'styled-components';
import { PhoneStyledTextInput } from './styles';

interface Props {
  placeholder: string;
  autoComplete:
    | 'name'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off'
    | undefined;
  autoFocus: boolean;
  value: string;
  onChangeText: (text: string) => void;
  editable: boolean;
}

const CustomPhoneTextInput: React.FC<Props> = (
  { placeholder, autoComplete, autoFocus, value, onChangeText, editable },
  ref,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ReactElement<any, string | JSXElementConstructor<any>> => {
  const handleChangeText = (text: string): void => {
    if (text.replace(/[^0-9]/g, '').length < 17) {
      onChangeText(text);
    }
  };
  const theme = useTheme();
  const isDarkMode = theme.mode === 'dark';
  return (
    <PhoneStyledTextInput
      ref={ref}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoCompleteType={autoComplete}
      keyboardType="phone-pad"
      onChangeText={handleChangeText}
      editable={editable}
      value={value}
      isDarkMode={isDarkMode}
      placeholderTextColor={
        isDarkMode ? theme.tokens.colors.tertiary600 : theme.tokens.colors.tertiary400
      }
    />
  );
};

const PhoneTextInput = React.forwardRef(CustomPhoneTextInput as never);

export default PhoneTextInput;
