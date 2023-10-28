import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
  Warning: undefined;
  Home: undefined;
  CustomFallback: {
    error: Error;
    resetError: () => void;
  };
};

export type ApplicationScreenProps =
  StackNavigationProp<ApplicationStackParamList>;
