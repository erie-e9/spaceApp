import { Platform } from 'react-native';
import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Touchable } from '@components/atoms';

export const BackButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(48)}px;
  width: ${getNormalizedHorizontalSize(48)}px;
  margin: ${getNormalizedVerticalSize(30)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px
    ${getNormalizedHorizontalSize(Platform.OS === 'ios' ? 0 : 0)}px;
  padding: ${getNormalizedVerticalSize(20)}px
    ${getNormalizedHorizontalSize(10)}px;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const BackButtonPressable = styled(Touchable)`
  z-index: 999;
`;
