import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';

import { Typography } from '@components/atoms';

export const ModalHeaderContainer = styled.View`
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const TitleWrapper = styled.View`
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
  align-items: center;
  justify-content: center;
`;

export const StyledText = styled(Typography)`
  text-align: center;
  justify-content: center;
`;
