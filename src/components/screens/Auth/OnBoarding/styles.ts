import styled from 'styled-components/native';
import { Typography } from '@components/atoms';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';

export const BodyContainer = styled.View`
  flex: 1;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  align-items: center;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const DescriptionContainer = styled.View`
  padding-vertical: ${getNormalizedVerticalSize(7)}px;
`;
export const SubDescriptionContainer = styled.View`
  padding-top: ${getNormalizedVerticalSize(15)}px;
`;

export const TitleText = styled(Typography)<{
  underline?: boolean;
}>`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;
