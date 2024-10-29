import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

export const ModalHeaderContainer = styled.View`
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px;
  background-color: transparent;
  width: 100%;
`;

export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const DescriptionContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const StyledText = styled(Typography)`
  text-align: center;
  justify-content: center;
`;
