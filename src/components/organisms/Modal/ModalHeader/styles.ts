import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';
import { AlignHeaderType } from '@slices/types/modal';

export const ModalHeaderContainer = styled.View<{ alignHeader: AlignHeaderType }>`
  align-items: ${({ alignHeader }) => alignHeader || 'center'};
  justify-content: flex-start;
  width: 100%;
  min-height: 100px;
  min-height: ${getNormalizedVerticalSize(30)}px;
  z-index: 1;
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px;

`;

export const TitleContainer = styled.View`
  width: auto;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const DescriptionContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: auto;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const StyledText = styled(Typography)`
  text-align: center;
  justify-content: center;
`;
