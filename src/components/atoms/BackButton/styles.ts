import { Platform } from 'react-native';
import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Tappable } from '@components/atoms';

export const BackButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(30)}px;
  width: ${getNormalizedHorizontalSize(30)}px;
  margin: ${getNormalizedVerticalSize(30)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px
    ${getNormalizedHorizontalSize(Platform.OS === 'ios' ? 5 : 5)}px;
  justify-content: center;
  align-items: center;
`;

export const BackButtonPressable = styled(Tappable)``;
