import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
  WarningScreen: undefined;
  Home: undefined;
};

export type ApplicationScreenProps =
  StackNavigationProp<ApplicationStackParamList>;
