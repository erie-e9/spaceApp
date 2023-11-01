import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Touchable } from '@components/atoms';

export const BackButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(30)}px;
  padding: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(2)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(2)}px;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const BackButtonPressable = styled(Touchable)`
  z-index: 100;
`;
