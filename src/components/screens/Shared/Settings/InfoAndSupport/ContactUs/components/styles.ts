import styled from 'styled-components/native';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
} from '@utils/functions';
import { Typography } from '@components/atoms';

export const ContentContainer = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
`;

export const BodyContainer = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
`;

export const LabelContainer = styled.View`
  padding: ${getNormalizedVerticalSize(20)}px
    ${getNormalizedHorizontalSize(0)}px;
`;

export const StyledText = styled(Typography)``;
