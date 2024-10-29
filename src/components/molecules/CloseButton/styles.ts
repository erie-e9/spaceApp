import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Touchable } from '@components/atoms';

export const CloseButtonContainer = styled.View`
  padding: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(2)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(2)}px;
  z-index: 100;
  align-items: center;
  justify-content: center;
`;

export const CloseButtonPressable = styled(Touchable)`
  z-index: 100;
  min-height: ${getNormalizedVerticalSize(20)}px;
`;
