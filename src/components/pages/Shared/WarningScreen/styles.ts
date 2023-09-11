import styled from 'styled-components/native';
import { Typography } from '@components/atoms';
import { PixelRatio } from 'react-native';

export const BodyContainer = styled.View`
  flex: 1;
  padding: 20px 7px;
  align-items: center;
`;

export const TitleText = styled(Typography)<{
  underline?: boolean;
  isGreyed?: boolean;
}>`
  margin-vertical: ${PixelRatio.roundToNearestPixel(1)}px;
  padding: 20px 30px;
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;
