import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const OptionContainer = styled.View`
  justify-content: center;
  align-items: center;
  min-height: auto;
  min-width: auto;
`;

export const OptionButton = styled(ActionButton)``;

export const OptionButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const OptionButtonLabel = styled(Typography)`
  margin: ${getNormalizedVerticalSize(7)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;
