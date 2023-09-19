import styled from 'styled-components/native';

interface Props {
  isOpacity?: boolean;
  background?: string;
}

const StyledSafeAreaView = styled.SafeAreaView<Props>`
  flex: 1;
  background: ${({ background, isOpacity }) =>
    background || (isOpacity ? 'transparent' : 'transparent')};
`;

export { StyledSafeAreaView };
