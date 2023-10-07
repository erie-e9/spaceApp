import styled from 'styled-components/native';
import { getNormalizedHorizontalSize } from '@utils/functions';

export interface StyledTouchableProps {
  isGreyed?: boolean;
}

export const StyledTouchable = styled.Pressable<StyledTouchableProps>`
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
  width: 100%;
  max-width: ${getNormalizedHorizontalSize(370)}px;
`;
