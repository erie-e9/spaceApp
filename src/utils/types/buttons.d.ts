import { PressableProps } from 'react-native';
import { DefaultTheme } from 'styled-components';
import type * as CSS from 'csstype';

export type ButtonType = 'Button' | 'Fab' | 'Link' | 'Text' | 'Icon' | string | null;

export interface TouchableProps extends PressableProps {
  testID?: string;
  title?: string;
  subtitle?: string;
  numberOfLines?: number;
  textColor?: keyof DefaultTheme['tokens']['colors'];
  backgroundColor?: keyof DefaultTheme['tokens']['colors'];
  onPressType?: 'onPress' | 'onPressIn' | 'onLongPress' | 'onPressOut';
  buttonTheme?: 'Primary' | 'Secondary' | 'Dark';
  type?: ButtonType;
  icon?: JSX.Element | string | any;
  iconType?: 'svg' | 'lottie' | 'image';
  disabledColor?: keyof DefaultTheme['colors'];
  loading?: boolean;
  grouped?: boolean;
  fontWeight?: CSS.StandardProperties['fontWeight'];
  lineHeight?: CSS.StandardProperties['lineHeight'];
  widthButton?: string | number;
  widthIcon?: number;
  heightIcon?: number;
  startFrameAnimation?: number;
  endFrameAnimation?: number;
  buttonType?: string;
  textTransform?: CSS.StandardProperties['textTransform'] | undefined;
  remoteFeatureFlags?: Array<string>;
  minHeight?: number;
  titleFontSize?: number;
  component?: Element;
  [x: string]: unknown;
  onPressAsync?: () => Promise<void>;
  opposingIconColor?: boolean;
}
