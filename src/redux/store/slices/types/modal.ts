import { ReactElement } from 'react';
import { ModalProps, ViewStyle } from 'react-native';
import { DefaultTheme } from 'styled-components/native';
import { FontWeight } from 'react-native-svg';

export interface ListProps {
  predefinedList?: 'languages';
  data: Array<string>;
  onPressItem: any;
}

export interface OptionsMap {
  text: string;
  handler?: () => void | Promise<void>;
  minWidth?: number;
  fontWeight?: number | 'bold' | 'semi-bold' | 'normal';
}

export interface DrawerOptions extends ModalProps {
  disabledArrow?: boolean;
  fontWeight?: FontWeight;
  showIcon?: boolean;
  options?: any[];
  handleCancel?: () => void;
  handleCorrectCredentials?:
    | ((type: any) => void)
    | ((type: any) => Promise<void>);
  handleAttemptFail?: () => void;
  hideCancelButton?: boolean;
  text?: string;
  hasIcon?: boolean;
  refreshCallback?: () => Promise<void>;
  height?: number;
}

export interface ModalPayload {
  title?: string;
  titleColor?: string;
  isVisible?: boolean;
  description?: string;
  Icon?: SVGElement;
  showCloseModalIcon?: boolean;
  body?: ReactElement;
  options?: Partial<OptionsMap[]>;
  list?: Partial<ListProps>;
  onClose?: () => void;
  timeout?: number;
  type?: 'alert' | 'bottomsheet' | null;
  drawerOptions?: Partial<DrawerOptions>;
  status?: 'success' | 'info' | 'warn' | 'error';
  style?: Record<string, string | number> | ViewStyle;
  showCancelIcon?: boolean;
  swipeDirection?: 'up' | 'down' | 'left' | 'right' | 'no-swipeDirection';
  lockBackdrop?: boolean;
  testID?: string;
  callback?: () => void;
  legacyOptions?: Record<
    string,
    | string
    | number
    | boolean
    | (() => void)
    | Record<string, string | number | boolean>
  >;
  bgColor?: string;
  ignoreHide?: boolean;
  loading?: boolean;
  isExchange?: boolean;
  colorTitle?: keyof DefaultTheme['tokens']['colors'];
  onModalHide?: () => void;
  onCloseIcon?: () => void;
  bodyHasScrollView?: boolean;
  width?: number;
}
