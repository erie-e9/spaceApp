import styled from 'styled-components/native';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
} from '@utils/functions';
import { Typography } from '@components/atoms';

export const SettingItemContainer = styled.View`
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(2)}px;
  background-color: transparent;
`;

export const SettingHeadContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  align-items: center;
  background-color: transparent;
`;

interface SettingItemTitleProps {
  leftIcon: boolean;
}

export const TitleContainer = styled.View<SettingItemTitleProps>`
  justify-content: center;
  width: auto;
  min-height: ${getNormalizedVerticalSize(10)}px;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(0)}px
    ${({ leftIcon }) => getNormalizedHorizontalSize(leftIcon ? 7 : 0)}px;
`;

export const SettingItemTitle = styled(Typography)``;
