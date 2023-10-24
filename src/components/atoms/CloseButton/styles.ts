import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Touchable } from '@components/atoms';

export const CloseButtonContainer = styled.View`
  padding: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(2)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(2)}px;
`;

export const CloseButtonPressable = styled(Touchable)``;
