import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';
import QRCodeIconLight from '@assets/light/svg/qrcode-icon.svg';
import QRCodeIconDark from '@assets/dark/svg/qrcode-icon.svg';
import AlertTriangleIconLight from '@assets/light/svg/alert-triangle.svg';
import AlertTriangleIconDark from '@assets/dark/svg/alert-triangle.svg';
import LanguageIconLight from '@assets/light/svg/language.svg';
import LanguageIconDark from '@assets/dark/svg/language.svg';
import SwitchThemeIconLight from '@assets/light/svg/dark-mode.svg';
import SwitchThemeIconDark from '@assets/dark/svg/light-mode.svg';
import BackIcon from '@assets/light/svg/back-button.svg';
import BackIconDark from '@assets/dark/svg/back-button.svg';
import CloseIcon from '@assets/light/svg/close.svg';
import CloseIconDark from '@assets/dark/svg/close.svg';
import BrowserIconLight from '@assets/light/svg/browser.svg';
import BrowserIconDark from '@assets/dark/svg/browser.svg';
import ReloadIconLight from '@assets/light/svg/reload.svg';
import ReloadIconDark from '@assets/dark/svg/reload.svg';
import ShareIconLight from '@assets/light/svg/share.svg';
import ShareIconDark from '@assets/dark/svg/share.svg';

interface SvgObject {
  [key: string]: {
    [key: string]: React.FC<SvgProps>;
    light: React.FC<SvgProps>;
    dark: React.FC<SvgProps>;
  };
}

const svgLibrary: SvgObject = {
  QRCodeIcon: {
    light: QRCodeIconLight,
    dark: QRCodeIconDark,
  },
  AlertTriangleIcon: {
    light: AlertTriangleIconLight,
    dark: AlertTriangleIconDark,
  },
  LanguageIcon: {
    light: LanguageIconLight,
    dark: LanguageIconDark,
  },
  SwitchThemeIcon: {
    light: SwitchThemeIconLight,
    dark: SwitchThemeIconDark,
  },
  BackIcon: {
    light: BackIcon,
    dark: BackIconDark,
  },
  CloseIcon: {
    light: CloseIcon,
    dark: CloseIconDark,
  },
  BrowserIcon: {
    light: BrowserIconLight,
    dark: BrowserIconDark,
  },
  ReloadIcon: {
    light: ReloadIconLight,
    dark: ReloadIconDark,
  },
  ShareIcon: {
    light: ShareIconLight,
    dark: ShareIconDark,
  },
};

export const useSVG = (svgName: string): React.FC<SvgProps> => {
  const colorScheme = useTheme()?.mode || 'light';
  return svgLibrary[svgName][colorScheme];
};

export default useSVG;
