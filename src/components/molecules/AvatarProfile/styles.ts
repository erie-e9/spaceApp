import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Image } from '@components/atoms';

export interface StyledButtonProps {
  error?: boolean;
  align?: 'left' | 'center';
  focused?: boolean;
}

export const Container = styled.View<{
  size: number;
}>`
  width: ${({ size }) => getNormalizedHorizontalSize(size + 7)}px;
  height: ${({ size }) => getNormalizedVerticalSize(size + 7)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ size }) => size + 7 / 2}px;
  background-color: ${({ theme }) => theme.tokens.colors.primary500};
`;

export const UserImage = styled(Image)<{
  size: number;
}>`
  width: ${({ size }) => getNormalizedHorizontalSize(size)}px;
  height: ${({ size }) => getNormalizedVerticalSize(size)}px;
  border-radius: ${({ size }) => size / 2}px;
`;

export const ImagePickerButtonContainer = styled.View`
  position: absolute;
  bottom: ${getNormalizedHorizontalSize(-5)}px;
  right: ${getNormalizedHorizontalSize(10)}px;
  padding: ${getNormalizedHorizontalSize(5)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedHorizontalSize(5)}px ${getNormalizedHorizontalSize(5)}px;
  border-radius: 20px;
  border-width: 0.5px;
  border-color: #767676;
  background-color: ${({ theme }) => `${theme.tokens.colors.tertiary50 + 'ab'}`};
`;
