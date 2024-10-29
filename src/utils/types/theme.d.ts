import Variables from '@theme/Variables';
import { DefaultVariables, Images, Animations } from '@theme';
import { Theme as ReactNavigationTheme } from '@react-navigation/native/src/types';

export type ThemeVariables = {
  NavigationColors: typeof Variables.NavigationColors;
};

export type Variables = {
  NavigationProps: typeof Variables.NavigationProps;
};

export type Theme<I, A, C> = ThemeVariables &
  Variables & {
    Images: I;
    Animations: A;
    Common: C;
    Variables?: Partial<ThemeVariables & Variables>;
  };

type NavigationProps<T> = T extends { colors: infer U } ? U : never;
type ThemeNavigationColors = NavigationProps<ReactNavigationTheme>;

export type ThemeNavigationTheme = {
  dark: boolean;
  colors: ThemeNavigationColors;
};

const images = Images(DefaultVariables);
const animations = Animations(DefaultVariables);

export type CommonParams<C> = ThemeVariables &
  Pick<Theme<typeof images, typeof animations, C>, 'Images' | 'Animations'>;
