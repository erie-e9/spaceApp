import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import AlertTriangle from '@assets/shared/svg/alerttriangle.svg';
import Apple from '@assets/shared/svg/apple.svg';
import Bell from '@assets/shared/svg/bell.svg';
import BellSettings from '@assets/shared/svg/bellsettings.svg';
import Browser from '@assets/shared/svg/browser.svg';
import BugFinder from '@assets/shared/svg/bugfinder.svg';
import Bug from '@assets/shared/svg/bug.svg';
import Camera from '@assets/shared/svg/camera.svg';
import CellPhone from '@assets/shared/svg/cellphone.svg';
import Chat from '@assets/shared/svg/chat.svg';
import Close from '@assets/shared/svg/close.svg';
import DarkMode from '@assets/shared/svg/darkmode.svg';
import Edit from '@assets/shared/svg/edit.svg';
import Email from '@assets/shared/svg/email.svg';
import ExclamationCircle from '@assets/shared/svg/exclamationcircle.svg';
import Extra from '@assets/shared/svg/extra.svg';
import EyeClosed from '@assets/shared/svg/eyeclosed.svg';
import Eye from '@assets/shared/svg/eye.svg';
import Facebook from '@assets/shared/svg/facebook.svg';
import FilePrivacy from '@assets/shared/svg/fileprivacy.svg';
import Google from '@assets/shared/svg/google.svg';
import HeartHandshake from '@assets/shared/svg/hearthandshake.svg';
import Help from '@assets/shared/svg/help.svg';
import InfoCircle from '@assets/shared/svg/infocircle.svg';
import Info from '@assets/shared/svg/info.svg';
import Instagram from '@assets/shared/svg/instagram.svg';
import Language from '@assets/shared/svg/language.svg';
import LayersIntersect from '@assets/shared/svg/layersintersect.svg';
import LightMode from '@assets/shared/svg/lightmode.svg';
import Lock from '@assets/shared/svg/lock.svg';
import Map from '@assets/shared/svg/map.svg';
import Phone from '@assets/shared/svg/phone.svg';
import QRCode from '@assets/shared/svg/qrcode.svg';
import Reload from '@assets/shared/svg/reload.svg';
import Right from '@assets/shared/svg/right.svg';
import Settings from '@assets/shared/svg/settings.svg';
import Share from '@assets/shared/svg/share.svg';
import ShieldLock from '@assets/shared/svg/shieldlock.svg';
import Star from '@assets/shared/svg/star.svg';
import Telegram from '@assets/shared/svg/telegram.svg';
import WhatsApp from '@assets/shared/svg/whatsapp.svg';
import X from '@assets/shared/svg/x.svg';
import Menu from '@assets/shared/svg/menu.svg';
import SunshineDevice from '@assets/shared/svg/sunshinedevice.svg';
import BugReport from '@assets/shared/svg/bugreport.svg';
import Logs from '@assets/shared/svg/logs.svg';
import Advice from '@assets/shared/svg/advice.svg';
import LockSquare from '@assets/shared/svg/locksquare.svg';
import Password from '@assets/shared/svg/password.svg';
import PasswordFingerPrint from '@assets/shared/svg/passwordfingerprint.svg';
import VersionsLogs from '@assets/shared/svg/versions.svg';
import Features from '@assets/shared/svg/features.svg';
import StarFilled from '@assets/shared/svg/starfilled.svg';
import Add from '@assets/shared/svg/add.svg';
import Remove from '@assets/shared/svg/remove.svg';
import Heart from '@assets/shared/svg/heart.svg';
import Heartfilled from '@assets/shared/svg/heartfilled.svg';
import Search from '@assets/shared/svg/search.svg';
import Check from '@assets/shared/svg/check.svg';
import Checks from '@assets/shared/svg/checks.svg';

interface SvgObject {
  [key: string]: React.FC<SvgProps> | {
    [key: string]: React.FC<SvgProps>;
    light: React.FC<SvgProps>;
    dark: React.FC<SvgProps>;
  };
}

const svgLibrary: SvgObject = {
  alerttriangle: AlertTriangle,
  apple: Apple,
  bellsettings: BellSettings,
  bell: Bell,
  browser: Browser,
  bug: Bug,
  bugfinder: BugFinder,
  camera: Camera,
  cellphone: CellPhone,
  chat: Chat,
  close: Close, darkmode: DarkMode,
  edit: Edit,
  email: Email,
  exclamationcircle: ExclamationCircle,
  extra: Extra,
  eye: Eye,
  eyeclosed: EyeClosed,
  facebook: Facebook,
  fileprivacy: FilePrivacy,
  google: Google,
  hearthandshake: HeartHandshake,
  help: Help,
  infocircle: InfoCircle,
  info: Info,
  instagram: Instagram,
  language: Language,
  layersintersect: LayersIntersect,
  lightmode: LightMode,
  lock: Lock,
  map: Map,
  phone: Phone,
  qrcode: QRCode,
  reload: Reload,
  right: Right,
  settings: Settings,
  share: Share,
  shieldlock: ShieldLock,
  star: Star,
  starfilled: StarFilled,
  telegram: Telegram,
  whatsapp: WhatsApp,
  x: X,
  menu: Menu,
  sunshinedevice: SunshineDevice,
  bugreport: BugReport,
  logs: Logs,
  advice: Advice,
  locksquare: LockSquare,
  password: Password,
  passwordfingerprint: PasswordFingerPrint,
  versions: VersionsLogs,
  features: Features,
  add: Add,
  remove: Remove,
  heart: Heart,
  heartfilled: Heartfilled,
  search: Search,
  check: Check,
  checks: Checks,
};

export const useSVG = (svgName: string): React.FC<SvgProps> => {
  const modeSchema = useTheme()?.mode || 'light';
  const svg = svgLibrary[svgName];
  if (typeof svg === 'object' && 'light' in svg && 'dark' in svg) {
    return svg[modeSchema];
  }

  return svg as React.FC<SvgProps>;
};
