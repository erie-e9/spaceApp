import { DefaultTheme } from 'styled-components';
import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { ActionButton, List } from '@components/molecules';

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const ListItems = styled(List)``;

export const FeaturesContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  background-color: transparent;
`;

export const FeatureButton = styled(ActionButton)`
  border-width: ${getNormalizedHorizontalSize(0)}px;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const SwipeButton = styled.TouchableOpacity<{
  backgroundColor?: keyof DefaultTheme['tokens']['colors'];
}>`
  height: 100%;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 0px;
  opacity: 1;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? theme.tokens.colors[backgroundColor] : 'transparent'};
`;

export const SkeletonContainer = styled.View`
  height: auto;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${getNormalizedVerticalSize(10)}px;
`;

export const SkeletonChildContainer = styled.View`
  flex-direction: row;
  height: auto;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${getNormalizedVerticalSize(2)}px;
`;

export const SkeletonLeftContentData = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: auto;
`;

export const RightSkeletonContainer = styled.View`
  width: auto;
  align-items: flex-end;
`;

export const FooterSkeletonContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;
