import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const OptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  height: auto;
`;

export const OptionButton = styled(ActionButton)``;

export const OptionButtonContainer = styled.View`
  max-width: ${getNormalizedHorizontalSize(80)}px;
  justify-content: center;
`;

export const OptionButtonLabel = styled(Typography)`
  margin: ${getNormalizedVerticalSize(7)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;
