import styled from 'styled-components/native';
import { Touchable, Typography } from '@components/atoms';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
} from '@utils/functions';

export const BodyContainer = styled.View`
  align-items: center;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(2)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const TouchableAreaContainer = styled(Touchable)`
  min-height: ${getNormalizedVerticalSize(10)}px;
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px;
  align-items: center;
`;

export const ContentContainer = styled.View`
  flex-direction: row;
`;

export const LabelContainer = styled.View`
  width: 95%;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  min-height: ${getNormalizedVerticalSize(10)}px;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;

export const LeftContainer = styled.View`
  flex-direction: row;
  min-height: ${getNormalizedVerticalSize(10)}px;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
`;

interface TitleContainerProps {
  leftIcon: boolean;
}

export const TitleContainer = styled.View<TitleContainerProps>`
  justify-content: center;
  width: auto;
  min-height: ${getNormalizedVerticalSize(20)}px;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(0)}px
    ${({ leftIcon }) => getNormalizedHorizontalSize(leftIcon ? 7 : 0)}px;
  background-color: transparent;
`;

export const SelectedOptionContainer = styled.View`
  justify-content: center;
  align-items: flex-end;
  width: auto;
  min-width: ${getNormalizedHorizontalSize(100)}px;
  min-height: ${getNormalizedVerticalSize(25)}px;
  border-radius: ${getNormalizedHorizontalSize(7)}px;
  border-color: gray;
  border-width: 0px;
`;

export const StyledTitleText = styled(Typography)`
  text-align: left;
`;

export const SelectedOptionText = styled(Typography)``;

export const SubTitleContainer = styled.View`
  width: 100%;
  min-height: ${getNormalizedVerticalSize(5)}px;
  justify-content: center;
  padding: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(1)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px;
  background-color: transparent;
`;

export const StyledSubTitleText = styled(Typography)`
  font-weight: 100;
  color: ${({ theme }) => theme.tokens.colors.surfaceL2};
`;

export const ArrowContainer = styled.View`
  width: ${getNormalizedHorizontalSize(20)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px;
  justify-content: center;
  align-items: center;
`;
