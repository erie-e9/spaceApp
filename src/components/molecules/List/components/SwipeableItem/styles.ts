import styled from 'styled-components/native';
import { SwipeableContainerProps } from '.';
import { getNormalizedHorizontalSize } from '@utils/functions';
import { TouchableHighlight } from 'react-native-gesture-handler';

export const SwipeableFullContainer = styled.View<SwipeableContainerProps>`
  background-color: ${({ theme, backgroundColor }) => theme.tokens.colors[backgroundColor || 'primary500']};
`;

export const SwipeButton = styled(TouchableHighlight) <SwipeableContainerProps>`
  height: 100%;
  width: ${getNormalizedHorizontalSize(60)}px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  opacity: 0.8;
  background-color: ${({ theme, backgroundColor }) => backgroundColor ? theme.tokens.colors[backgroundColor] : 'transparent'};
`;
