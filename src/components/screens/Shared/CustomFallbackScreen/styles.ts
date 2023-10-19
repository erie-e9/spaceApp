import styled from 'styled-components/native';
import { Typography, ActionButton } from '@components/atoms';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})``;

export const BodyContainer = styled.View`
  flex: 1;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.View<{ paddingBottom?: number }>`
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: ${getNormalizedVerticalSize(10)}px
    ${getNormalizedHorizontalSize(0)}px ${getNormalizedVerticalSize(10)}px
    ${getNormalizedHorizontalSize(0)}px;
`;

export const StyledText = styled(Typography)<{
  underline?: boolean;
  isGreyed?: boolean;
}>`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;

export const ErrorContainer = styled.View`
  height: auto;
  padding: ${getNormalizedVerticalSize(10)}px
    ${getNormalizedHorizontalSize(0)}px;
`;
export const TryAgainButton = styled(ActionButton)``;
