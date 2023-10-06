import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';
import QRCodeIcon from '@assets/light/svg/QRCodeIcon.svg';
import QRCodeIconDark from '@assets/dark/svg/QRCodeIcon.svg';
import QRCodeNavigator from '@assets/light/svg/QRCodeNavigator.svg';
import QRCodeNavigatorDark from '@assets/dark/svg/QRCodeNavigator.svg';
import AlertTriangle from '@assets/light/svg/alert-triangle.svg';
import AlertTriangleDark from '@assets/dark/svg/alert-triangle.svg';
import Language from '@assets/light/svg/language.svg';
import LanguageDark from '@assets/dark/svg/language.svg';
import DarkMode from '@assets/light/svg/dark-mode.svg';
import LightMode from '@assets/dark/svg/light-mode.svg';
import BackButton from '@assets/light/svg/back-button.svg';
import BackButtonDark from '@assets/dark/svg/back-button.svg';
import CloseButton from '@assets/light/svg/close.svg';
import CloseButtonDark from '@assets/dark/svg/close.svg';

interface SvgObject {
  [key: string]: {
    [key: string]: React.FC<SvgProps>;
    light: React.FC<SvgProps>;
    dark: React.FC<SvgProps>;
  };
}

const svgLibrary: SvgObject = {
  QRCodeIcon: {
    light: QRCodeIcon,
    dark: QRCodeIconDark,
  },
  QRCodeNavigator: {
    light: QRCodeNavigator,
    dark: QRCodeNavigatorDark,
  },
  AlertTriangle: {
    light: AlertTriangle,
    dark: AlertTriangleDark,
  },
  Language: {
    light: Language,
    dark: LanguageDark,
  },
  SwitchTheme: {
    light: DarkMode,
    dark: LightMode,
  },
  BackButton: {
    light: BackButton,
    dark: BackButtonDark,
  },
  CloseButton: {
    light: CloseButton,
    dark: CloseButtonDark,
  },
};

const useSVG = (svgName: string): React.FC<SvgProps> => {
  const colorScheme = useTheme()?.mode || 'light';
  return svgLibrary[svgName][colorScheme];
};

export default useSVG;
export { useSVG };
