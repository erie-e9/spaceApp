import styled from 'styled-components/native';

export const StyledTouchable = styled.Pressable<{
  isGreyed?: boolean;
}>`
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;
