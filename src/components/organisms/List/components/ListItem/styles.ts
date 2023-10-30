import { View } from 'react-native';
import styled from 'styled-components/native';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
} from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const ContainerWithOutPress = styled(View)`
  height: 88px;
  flex-direction: row;
  padding: 0 24px;
  align-items: center;
`;

export const TextContainer = styled(View)`
  flex: 1;
  margin-left: 16px;
  justify-content: center;
  font-size: 14px;
  line-height: 20.56px;
  font-weight: 500;
  height: auto;
  width: 100%;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledTitle = styled(Typography)``;

export const StyledSubtitle = styled(Typography)``;

export const RightContainer = styled.View`
  position: absolute;
  right: 24px;
  height: 100%;
  justify-content: center;
`;

export const StyledSafeAreaView = styled.View`
  position: relative;
`;

export const StyledButton = styled(ActionButton)`
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(3)}px
    ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(3)}px;
  align-self: center;
  border: ${({ theme: { colors } }) => colors.opposing};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.tokens.colors.surfaceL5 : '#67686b'};
`;
