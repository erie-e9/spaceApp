import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export const ModeContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  padding-vertical: ${getNormalizedVerticalSize(5)}px;
`;

export const ModeButton = styled(Touchable)<{
  selected?: boolean;
}>`
  height: auto;
  width: auto;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  border-width: ${({ selected }) => (selected ? 1.5 : 0)}px;
  border-color: ${({ theme }) => theme.tokens.colors.primary500};
`;

export const ModeButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(80)}px;
  width: auto;
  align-items: center;
`;

export const ModeButtonLabel = styled(Typography)`
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const SelectedIndicator = styled.View<{
  selected?: boolean;
}>`
  margin-bottom: ${getNormalizedVerticalSize(10)}px;
  min-height: auto;
  width: auto;
  border-radius: 10px;
`;
