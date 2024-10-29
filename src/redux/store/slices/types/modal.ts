import { ReactElement } from 'react';
import { ModalProps, StyleProp, ViewStyle } from 'react-native';
import { DefaultTheme } from 'styled-components/native';

export interface ButtonContainerProps {
  alignment: 'left' | 'center' | 'right';
  direction: 'column' | 'row';
}
export interface ListProps {
  predefinedList?: string;
  data: Array<string | number | null | { [key: string]: string | number; value: string | number }>;
  onPressItem: any;
  horizontal: boolean;
  numColumns?: number;
}

export interface OptionsMap {
  text: string;
  minWidth?: number;
  isSimpleButton?: boolean;
  color?: keyof DefaultTheme['tokens']['colors'];
  fontWeight?: number | 'bold' | 'semi-bold' | 'normal';
  handler?: () => void | Promise<void>;
  handleAsync?: () => Promise<void>;
}

export interface DrawerOptions extends ModalProps {
  disabledArrow?: boolean;
  fontWeight?: number | 'bold' | 'semi-bold' | 'normal';
  showIcon?: boolean;
  options?: any[];
  hideCancelButton?: boolean;
  text?: string;
  hasIcon?: boolean;
  height?: number;
  justifyContent?: string;
  alignItems?: string;
  numColumns?: number;
  horizontal: boolean;
  autoCloseOnSelect?: boolean;
  handleCancel?: () => void;
  handleAttemptFail?: () => void;
  refreshCallback?: () => Promise<void>;
}

export interface ModalPayload {
  title?: string;
  testID?: string;
  titleColor?: keyof DefaultTheme['tokens']['colors'];
  isVisible?: boolean;
  description?: string;
  Icon?: SVGElement;
  showCloseModalIcon?: boolean;
  body?: ReactElement;
  options?: Partial<OptionsMap[]>;
  list?: Partial<ListProps>;
  expandible?: boolean;
  timeout?: number;
  type?: 'alert' | 'bottomsheet' | null;
  dropdownOptions?: Partial<DrawerOptions>;
  status?: 'success' | 'info' | 'warn' | 'error';
  showCancelIcon?: boolean;
  swipeDirection?: 'up' | 'down' | 'left' | 'right' | 'no-swipeDirection';
  lockBackdrop?: boolean;
  loading?: boolean;
  bodyHasScrollView?: boolean;
  width?: number;
  style?: StyleProp<ViewStyle>;
  buttonsStyles?: ButtonContainerProps;
  onClose?: () => void;
  onModalHide?: () => void;
  onCloseIcon?: () => void;
  callback?: () => void;
}
