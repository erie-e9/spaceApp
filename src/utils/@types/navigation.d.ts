import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SharedParamsList } from '@navigators/Shared';

export type ApplicationStackParamList = {
  Shared: NavigatorScreenParams<SharedParamsList>;
};

export type ApplicationScreenProps = StackNavigationProp<
  ApplicationStackParamList & SharedParamsList
>;
