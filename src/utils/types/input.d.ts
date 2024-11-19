import { TextInputProps, ViewStyle } from 'react-native';

export interface CommonControllerProps {
  testID?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  editable?: boolean;
  maintainFocus?: boolean;
}

export interface InputProps extends CommonControllerProps, TextInputProps {
  name?: string;
  showPasswordStrength?: boolean;
  removeBlankSpaces?: boolean;
  numberOfLines?: number;
  fontSize?: number;
  leftIcon?: JSX.Element;
  rightIcon?: any;
  contextMenuHidden?: boolean;
  styledFocus?: boolean;
  onFocused?: () => void;
  onFocusOut?: () => void;
  rightIconHandler?: () => void;
}

export interface DropDownProps extends CommonControllerProps {
  type?: 'textinput' | 'button';
  data: Array<string | number | null | { [key: string]: string | number; value: string | number }>;
  isNumeric?: boolean;
  value?: string | number;
  width?: ViewStyle['width'];
  description?: string;
  dropdownHeight?: number;
  openDropdown?: boolean;
  disableInput?: boolean;
  bottomSheet?: boolean;
  showButton?: boolean;
  onSelect: (item: any) => void;
  setOpenDropdown?: (isOpen: boolean) => void;
}
