import { Platform, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
} from '@utils/functions';

export const SafeAreaContainer = styled(SafeAreaView).attrs({
  ...StyleSheet.absoluteFillObject,
})`
  flex: 1;
`;

export const StyledBackgroundContainer = styled(Animated.View)`
  flex: 1;
  padding: ${getNormalizedVerticalSize(0)}px
    ${getNormalizedHorizontalSize(15)}px
    ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 13 : 7)}px
    ${getNormalizedHorizontalSize(15)}px;
`;

export const StyledTextContainer = styled(Animated.Text)``;
