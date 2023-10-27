import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type MainParamsList = {
  HomeScreen: undefined;
};

export type ApplicationStackParamList = {
  StartupScreen: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
  WarningScreen: undefined;
  HomeScreen: undefined;
  CustomFallbackScreen: {
    testID?: string;
    size?: number;
  };
};

export type ApplicationScreenProps =
  StackNavigationProp<ApplicationStackParamList>;
