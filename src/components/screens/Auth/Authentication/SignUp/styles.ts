import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export const LinkButton = styled(Touchable)``;

export const TermsPolicyContainer = styled.View`
  justify-self: center;
  justify-content: center;
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const TermsPolicyText = styled(Typography)``;
