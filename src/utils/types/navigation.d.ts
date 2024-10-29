// import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { AuthenticationParamsList } from '@navigators/Auth';
import { SharedParamsList } from '@navigators/Shared';
import { MenuParamsList } from '@components/screens/Shared/Settings';
import { HelpCenterParamsList } from '@components/screens/Shared/Settings/HelpCenter';
import { PrivateParamsList } from '@navigators/Private';

export type ApplicationStackParamList = {
  Auth: NavigatorScreenParams<AuthenticationParamsList>;
  HelpCenter: NavigatorScreenParams<HelpCenterParamsList>;
  Private: NavigatorScreenParams<PrivateParamsList>;
  Settings: NavigatorScreenParams<MenuParamsList>;
  Shared: NavigatorScreenParams<SharedParamsList>;
} & AuthenticationParamsList &
  HelpCenterParamsList &
  PrivateParamsList &
  MenuParamsList &
  SharedParamsList;

export type ApplicationScreenProps = StackNavigationProp<ApplicationStackParamList>;
