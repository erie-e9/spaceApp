import styled from 'styled-components/native';

export const StyledTouchable = styled.Pressable<{
  isGreyed?: boolean;
  width?: number | string;
}>`
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
  width: 100%;
  max-width: 370px;
`;
