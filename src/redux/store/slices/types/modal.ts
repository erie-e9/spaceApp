import { ReactElement } from 'react';
import { ModalProps, ViewStyle } from 'react-native';
import { DefaultTheme } from 'styled-components/native';
import { FontWeight } from 'react-native-svg';

export interface ListProps {
  predefinedList?: 'languages';
  data: Array<string>;
  onPressItem: any;
  horizontal: boolean;
}

export interface OptionsMap {
  text: string;
  handler?: () => void | Promise<void>;
  handleAsync?: () => Promise<void>;
  minWidth?: number;
  fontWeight?: number | 'bold' | 'semi-bold' | 'normal';
  isSimpleButton?: boolean;
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
  justifyContent?: string;
  alignItems?: string;
  numColumns?: number;
}

export interface ModalPayload {
  title?: string;
  titleColor?: keyof DefaultTheme['tokens']['colors'];
  isVisible?: boolean;
  description?: string;
  Icon?: SVGElement;
  showCloseModalIcon?: boolean;
  body?: ReactElement;
  options?: Partial<OptionsMap[]>;
  list?: Partial<ListProps>;
  expandible?: boolean;
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
  onModalHide?: () => void;
  onCloseIcon?: () => void;
  bodyHasScrollView?: boolean;
  width?: number;
}
