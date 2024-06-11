import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import Typography from '@components/atoms/Typography';

export default styled(Typography).attrs({
  type: 'Label'
})`
  min-height: auto;
  margin-top: ${PixelRatio.roundToNearestPixel(2)}px;
  margin-bottom: ${PixelRatio.roundToNearestPixel(3)}px;
  padding-left: ${PixelRatio.roundToNearestPixel(15)}px;
  color: ${({ theme }) => theme.tokens.colors.errorTextInput};
  background-color: transparent;
`;
