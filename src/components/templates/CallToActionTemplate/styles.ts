import { Platform } from 'react-native';
import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Typography, ActionButton } from '@components/atoms';

export const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px ${getNormalizedHorizontalSize(10)}px;
`;

export const HeaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const IconContainer = styled.View<{
  iconSpacing: string;
}>`
  justify-content: center;
  align-items: center;
  min-height: ${({ iconSpacing }) =>
    iconSpacing || getNormalizedVerticalSize(200) + 'px'};
`;

export const TitleContainer = styled.View`
  padding: ${getNormalizedVerticalSize(15)}px
    ${getNormalizedHorizontalSize(0)}px ${getNormalizedVerticalSize(0)}px
    ${getNormalizedHorizontalSize(Platform.OS === 'ios' ? 15 : 20)}px;
`;

export const TitleTypography = styled(Typography)``;

export const BodyContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.View``;

export const StyledActionButton = styled(ActionButton)<{ isGreyed?: boolean }>`
  margin: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(10)}px;
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;

export const LegendActionButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${getNormalizedVerticalSize(10)}px;
`;
