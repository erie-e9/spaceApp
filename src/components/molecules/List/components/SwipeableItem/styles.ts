import styled from 'styled-components/native';
import { SwipeableContainerProps } from '.';

export const SwipeableFullContainer = styled.View<SwipeableContainerProps>`
  /* flex: 1; */
  background-color: ${({ theme, backgroundColor }) => theme.tokens.colors[backgroundColor || 'primary500']};
`;

export const SwipeButton = styled.TouchableOpacity<SwipeableContainerProps>`
  height: 100%;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  opacity: 0.8;
  background-color: ${({ theme, backgroundColor }) => backgroundColor ? theme.tokens.colors[backgroundColor] : 'transparent'};
`;
