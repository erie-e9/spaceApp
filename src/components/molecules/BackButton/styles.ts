import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Touchable } from '@components/atoms';

export const BackButtonPressable = styled(Touchable)`
  z-index: 100;
  height: ${getNormalizedVerticalSize(10)}px;
  width: ${getNormalizedVerticalSize(10)}px;
`;

export const BackButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(30)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(2)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(2)}px;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
