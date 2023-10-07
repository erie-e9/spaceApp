import { Platform } from 'react-native';
import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Tappable } from '@components/atoms';

export const CloseButtonContainer = styled.View`
  padding: ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 35 : 26)}px
    ${getNormalizedHorizontalSize(0)}px ${getNormalizedVerticalSize(0)}px
    ${getNormalizedHorizontalSize(Platform.OS === 'ios' ? 5 : 10)}px;
`;

export const CloseButtonPressable = styled(Tappable)``;
