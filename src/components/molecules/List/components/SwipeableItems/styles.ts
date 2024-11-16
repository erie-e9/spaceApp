import styled from 'styled-components/native';
import { SwipeableFullContainerProps } from '.';

export const SwipeableFullContainer = styled.View<SwipeableFullContainerProps>`
  /* flex: 1; */
    background-color: ${({ theme, backgroundColor }) => theme.tokens.colors[backgroundColor || 'primary500']};
`;

export const SwipeButton = styled.TouchableOpacity`
    height: 100%;
    width: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    opacity: 0.8;
    /* background-color: ${({ theme }) => theme.tokens.colors.tertiary200}; */
`;
