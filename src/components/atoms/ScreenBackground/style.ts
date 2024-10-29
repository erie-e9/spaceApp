import styled from 'styled-components/native';

export const ScreenBackgroundContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    align-self: center;
    background-color: ${({ theme }) => theme.tokens.colors.tertiary50};
`;