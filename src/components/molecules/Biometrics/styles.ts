import styled from 'styled-components/native';
import { getNormalizedVerticalSize } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export const FormActionTouchable = styled(Touchable)`
  z-index: 100;
  background-color: transparent;
`;

export const BiometricsButtonContainer = styled.View`
  margin-vertical: ${getNormalizedVerticalSize(25)}px;
  align-items: center;
  align-self: center;
`;

export const TitleText = styled(Typography)<{
  underline?: boolean;
}>`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;
