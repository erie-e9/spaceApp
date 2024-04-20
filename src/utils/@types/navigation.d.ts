// import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SharedParamsList } from '@navigators/Shared';
import { SettingsParamsList } from '@components/screens/Shared/Settings';
import { InfoAndSupportParamsList } from '@components/screens/Shared/Settings/InfoAndSupport';

export type ApplicationStackParamList = {
  Shared: NavigatorScreenParams<SharedParamsList>;
} & SharedParamsList &
  SettingsParamsList &
  InfoAndSupportParamsList;

export type ApplicationScreenProps =
  StackNavigationProp<ApplicationStackParamList>;
