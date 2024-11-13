import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
  screen_width,
} from '@utils/functions';
import { List } from '@components/molecules';
import { Typography } from '@components/atoms';

export const OptionSelectorList = styled(List)``;

export const BodyContainer = styled.View`
  width: 100%;
  height: auto;
  border-radius: 20px;
  align-items: flex-start;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(20)}px ${getNormalizedHorizontalSize(10)}px;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary100};
`;

export const TitleContainer = styled.View`
  align-items: flex-start;
  width: 100%;
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(10)}px;
`;

export const ModeListContainer = styled.View`
  flex-direction: row;
`;

export const ThemeListContainer = styled.View`
  height: ${getNormalizedVerticalSize(75)}px;
  align-items: center;
`;

export const StyledFlatList = styled(FlatList)``;

export const StyledTitle = styled(Typography)``;

export const StyledTouchableOpacity = styled(TouchableHighlight).attrs({
  underlayColor: 'transparent',
})`
  align-items: center;
`;

export const ModeSelectorContainer = styled.View`
  height: 140px; // change size
  width: auto;
`;

export const TitleNameContainer = styled.View<{
  selected?: boolean;
}>`
  height: auto;
  width: ${getNormalizedHorizontalSize(64)}px;
  align-items: center;
  justify-content: center;
  padding: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(0)}px;
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  border-radius: 8px;
  border-width: ${({ selected }) => (selected ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.tokens.colors.primary400};
`;

export const ThemeIconContainer = styled.View`
  max-height: ${getNormalizedVerticalSize(50)}px;
  width: ${getNormalizedHorizontalSize(40)}px;
  align-items: center;
  justify-content: center;
`;

export const Separator = styled.View`
  height: ${getNormalizedVerticalSize(1)}px;
  width: ${screen_width - 100}px;
  align-self: center;
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
  opacity: 0.7;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary400};
`;
