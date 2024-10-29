import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

export const TooltipContainer = styled(Animated.View)`
  position: absolute;
  width: auto;
  z-index: 1000;
  border-radius: ${getNormalizedHorizontalSize(6)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(5)}px;
  background-color: ${({ theme }) => theme.tokens.colors.danger_status};
`;

export const TooltipText = styled(Typography)`
  color: #ffffff;
`;
