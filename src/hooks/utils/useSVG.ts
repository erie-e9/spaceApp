import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';
import QRCodeIconLight from '@assets/light/svg/qrcode-icon.svg';
import QRCodeIconDark from '@assets/dark/svg/qrcode-icon.svg';
import AlertTriangleIconLight from '@assets/light/svg/alert-triangle.svg';
import AlertTriangleIconDark from '@assets/dark/svg/alert-triangle.svg';
import LanguageIconLight from '@assets/light/svg/language.svg';
import LanguageIconDark from '@assets/dark/svg/language.svg';
import LightThemeIcon from '@assets/light/svg/light-mode.svg';
import LightThemeIconDark from '@assets/dark/svg/light-mode.svg';
import DarkThemeIcon from '@assets/light/svg/dark-mode.svg';
import DarkThemeIconDark from '@assets/dark/svg/dark-mode.svg';
import CellPhoneIconLight from '@assets/light/svg/cellphone.svg';
import CellPhoneIconDark from '@assets/dark/svg/cellphone.svg';
import BackIcon from '@assets/light/svg/back-button.svg';
import BackIconDark from '@assets/dark/svg/back-button.svg';
import CloseIcon from '@assets/light/svg/close.svg';
import CloseIconDark from '@assets/dark/svg/close.svg';
import BrowserIconLight from '@assets/light/svg/browser.svg';
import BrowserIconDark from '@assets/dark/svg/browser.svg';
import ReloadIconLight from '@assets/light/svg/reload.svg';
import ReloadIconDark from '@assets/dark/svg/reload.svg';
import SettingsLight from '@assets/light/svg/settings.svg';
import SettingsDark from '@assets/dark/svg/settings.svg';
import ShareIconLight from '@assets/light/svg/share.svg';
import ShareIconDark from '@assets/dark/svg/share.svg';
import InfoIconLight from '@assets/light/svg/info.svg';
import InfoIconDark from '@assets/dark/svg/info.svg';
import ChatIconLight from '@assets/light/svg/chat.svg';
import ChatIconDark from '@assets/dark/svg/chat.svg';
import RightIconLight from '@assets/light/svg/right.svg';
import RightIconDark from '@assets/dark/svg/right.svg';
import HelpIconLight from '@assets/light/svg/help.svg';
import HelpIconDark from '@assets/dark/svg/help.svg';
import EmailIconLight from '@assets/light/svg/email.svg';
import EmailIconDark from '@assets/dark/svg/email.svg';
import FacebookIconLight from '@assets/light/svg/facebook.svg';
import FacebookIconDark from '@assets/dark/svg/facebook.svg';
import InstagramIconLight from '@assets/light/svg/instagram.svg';
import InstagramIconDark from '@assets/dark/svg/instagram.svg';
import PhoneIconLight from '@assets/light/svg/phone.svg';
import PhoneIconDark from '@assets/dark/svg/phone.svg';
import TelegramIconLight from '@assets/light/svg/telegram.svg';
import TelegramIconDark from '@assets/dark/svg/telegram.svg';
import WhatsAppIconLight from '@assets/light/svg/whatsapp.svg';
import WhatsAppIconDark from '@assets/dark/svg/whatsapp.svg';
import XIconLight from '@assets/light/svg/x.svg';
import XIconDark from '@assets/dark/svg/x.svg';
import ExtraIconLight from '@assets/light/svg/extra.svg';
import ExtraIconDark from '@assets/dark/svg/extra.svg';

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
  LightThemeIcon: {
    light: LightThemeIcon,
    dark: LightThemeIconDark,
  },
  DarkThemeIcon: {
    light: DarkThemeIcon,
    dark: DarkThemeIconDark,
  },
  CellPhoneIcon: {
    light: CellPhoneIconLight,
    dark: CellPhoneIconDark,
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
  SettingsIcon: {
    light: SettingsLight,
    dark: SettingsDark,
  },
  ShareIcon: {
    light: ShareIconLight,
    dark: ShareIconDark,
  },
  InfoIcon: {
    light: InfoIconLight,
    dark: InfoIconDark,
  },
  ChatIcon: {
    light: ChatIconLight,
    dark: ChatIconDark,
  },
  RightIcon: {
    light: RightIconLight,
    dark: RightIconDark,
  },
  HelpIcon: {
    light: HelpIconLight,
    dark: HelpIconDark,
  },
  EmailIcon: {
    light: EmailIconLight,
    dark: EmailIconDark,
  },
  FacebookIcon: {
    light: FacebookIconLight,
    dark: FacebookIconDark,
  },
  InstagramIcon: {
    light: InstagramIconLight,
    dark: InstagramIconDark,
  },
  PhoneIcon: {
    light: PhoneIconLight,
    dark: PhoneIconDark,
  },
  TelegramIcon: {
    light: TelegramIconLight,
    dark: TelegramIconDark,
  },
  WhatsAppIcon: {
    light: WhatsAppIconLight,
    dark: WhatsAppIconDark,
  },
  XIcon: {
    light: XIconLight,
    dark: XIconDark,
  },
  ExtraIcon: {
    light: ExtraIconLight,
    dark: ExtraIconDark,
  },
};

export const useSVG = (svgName: string): React.FC<SvgProps> => {
  const colorScheme = useTheme()?.mode || 'light';
  return svgLibrary[svgName][colorScheme];
};

export default useSVG;
