import styled from 'styled-components/native';

export const StyledTouchable = styled.Pressable<{
  isGreyed?: boolean;
}>`
  background-color: ${({ theme }) => theme.tokens.colors.darkBlueD1};
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
  min-width: 100%;
  height: 60px;
`;
