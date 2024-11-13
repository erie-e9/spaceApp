import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
`;

export const ContentContainer = styled.View``;

export const TitleContainer = styled.View`
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const DescriptionContainer = styled.View`
  flex: 1;
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(8)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(8)}px;
`;

export const StyledText = styled(Typography)``;

export const FeaturesContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px;
`;

export const FeatureButton = styled(ActionButton)``;

export const FeatureIcon = styled.Image`
  tint-color: ${({ theme }) => theme.tokens.colors.secondary950};
`;
