import { Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';

export const StyledBackgroundContainer = styled(Animated.View)`
  /* flex: 1; */
  /* padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(15)}px
    ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 13 : 7)}px
    ${getNormalizedHorizontalSize(15)}px; */
`;

export const StyledTextContainer = styled(Animated.Text)``;
