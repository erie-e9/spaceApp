import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
} from '@utils/functions';
import { Platform } from 'react-native';

export const StyledBackgroundContainer = styled(Animated.View)`
  padding: ${getNormalizedVerticalSize(0)}px
    ${getNormalizedHorizontalSize(15)}px
    ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 13 : 7)}px
    ${getNormalizedHorizontalSize(15)}px;
  background-color: ${({ theme }) => theme.tokens.colors.none};
`;

export const StyledTextContainer = styled(Animated.Text)``;
