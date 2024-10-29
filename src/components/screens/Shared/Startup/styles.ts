import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Image } from '@components/atoms';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Brand = styled(Image)`
  height: ${getNormalizedVerticalSize(200)}px;
  width: ${getNormalizedHorizontalSize(200)}px;
`;
