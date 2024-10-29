import styled from 'styled-components/native';
import { Typography } from '@components/atoms';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';

export const BodyContainer = styled.View`
  width: 100%;
  min-height: ${getNormalizedVerticalSize(400)}px;
  align-items: center;
  justify-content: center;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const HeaderContainer = styled.View<{ paddingBottom?: number }>`
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: ${getNormalizedVerticalSize(30)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const StyledText = styled(Typography)<{
  underline?: boolean;
}>`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

export const ErrorContainer = styled.View`
  height: auto;
  width: 100%;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;
