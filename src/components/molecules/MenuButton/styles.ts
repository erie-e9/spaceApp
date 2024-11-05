import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export const BodyContainer = styled.View`
  align-items: center;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  padding: ${getNormalizedVerticalSize(4)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(4)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const TouchableAreaContainer = styled(Touchable)`
  min-height: ${getNormalizedVerticalSize(10)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  min-height: ${getNormalizedVerticalSize(30)}px;
  justify-content: space-between;
`;

export const LabelContainer = styled.View`
  flex: 1;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  min-height: ${getNormalizedVerticalSize(30)}px;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;

export const LeftContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: transparent;
`;

export const LeftIconContainer = styled.View<{
  leftPadding?: boolean;
}>`
  height: auto;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(7)}px
    ${({ leftPadding }) => getNormalizedHorizontalSize(leftPadding ? 10 : 0)}px;
`;

interface TitleContainerProps {
  leftIcon: boolean;
}

export const TitleContainer = styled.View<TitleContainerProps>`
  width: 100%;
  min-height: ${getNormalizedVerticalSize(20)}px;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(0)}px
    ${({ leftIcon }) => getNormalizedHorizontalSize(leftIcon ? 0 : 0)}px;
  background-color: transparent;
`;

export const SelectedOptionContainer = styled.View`
  justify-content: center;
  align-items: flex-end;
  width: auto;
  min-width: auto;
  min-height: ${getNormalizedVerticalSize(25)}px;
`;

export const StyledTitleText = styled(Typography)`
  text-align: left;
`;

export const SelectedOptionText = styled(Typography)``;

export const SubTitleContainer = styled.View`
  width: 100%;
  min-height: ${getNormalizedVerticalSize(10)}px;
  justify-content: center;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const StyledSubTitleText = styled(Typography)`
`;

export const ArrowContainer = styled.View`
  width: ${getNormalizedHorizontalSize(10)}px;
  justify-content: center;
  align-items: center;
`;
export const RightContainer = styled.View`
  min-width: ${getNormalizedHorizontalSize(50)}px;
  align-items: flex-end;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const RightBodyContainer = styled.View`
  width: auto;
  height: auto;
  align-items: center;
`;
