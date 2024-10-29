import styled from 'styled-components/native';
import { getNormalizedHorizontalSize } from '@utils/functions';
import { Touchable } from '@components/atoms';

export interface StyledButtonProps {
  error?: boolean;
  align?: 'left' | 'center';
  focused?: boolean;
}

export const StyledButton = styled(Touchable)<StyledButtonProps>`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  right: ${getNormalizedHorizontalSize(0)}px;
  elevation: 0;
  background-color: transparent;
`;
