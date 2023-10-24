import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export const ItemLabelContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${getNormalizedVerticalSize(7)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(7)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const ItemButton = styled(Touchable)``;

export const ItemLabel = styled(Typography)``;
