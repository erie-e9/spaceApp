import { PressableProps, TextStyle } from 'react-native';
import { DefaultTheme } from 'styled-components';

export type ButtonType = 'Button' | 'Fab' | 'Link' | 'Text' | 'Icon' | string | null;

export interface TouchableProps extends PressableProps {
  testID?: string;
  title?: string;
  subtitle?: string;
  numberOfLines?: number;
  textColor?: keyof DefaultTheme['tokens']['colors'];
  gradientColors?: Array<any>;
  backgroundColor?: keyof DefaultTheme['tokens']['colors'];
  onPressType?: 'onPress' | 'onPressIn' | 'onLongPress' | 'onPressOut';
  buttonTheme?: 'Primary' | 'Secondary' | 'Dark';
  type?: ButtonType;
  icon?: JSX.Element | string | any;
  iconType?: 'svg' | 'lottie' | 'image';
  disabledColor?: keyof DefaultTheme['colors'];
  loading?: boolean;
  grouped?: boolean;
  fontWeight?: TextStyle['fontWeight'];
  lineHeight?: TextStyle['lineHeight'];
  widthButton?: string | number;
  heightButton?: string | number;
  widthIcon?: number;
  heightIcon?: number;
  startFrameAnimation?: number;
  endFrameAnimation?: number;
  buttonType?: string;
  textTransform?: TextStyle['textTransform'] | undefined;
  remoteFeatureFlags?: Array<string>;
  minHeight?: number;
  titleFontSize?: number;
  component?: Element;
  [x: string]: unknown;
  onPressAsync?: () => Promise<void>;
  opposingIconColor?: boolean;
}
