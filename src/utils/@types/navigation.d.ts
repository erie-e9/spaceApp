// import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SharedParamsList } from '@navigators/Shared';

export type ApplicationStackParamList = {
  Shared: NavigatorScreenParams<SharedParamsList>;
} & SharedParamsList;

export type ApplicationScreenProps =
  StackNavigationProp<ApplicationStackParamList>;
