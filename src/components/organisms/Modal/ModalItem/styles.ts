import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export const ItemButton = styled(Touchable)`
  height: ${getNormalizedVerticalSize(35)}px;
  width: 100%;
  align-self: center;
  justify-content: center;
  background-color: transparent;
`;

export const ItemLabelContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const ItemLabel = styled(Typography)``;
