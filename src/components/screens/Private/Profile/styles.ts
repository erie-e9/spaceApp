import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';

export const BodyContainer = styled.View`
  flex: 1;
  align-items: center;
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
  width: 100%;
  z-index: 1000;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  background-color: transparent;
`;

export const ProfileContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ProfileImageContainer = styled.View`
  justify-content: center;
  align-self: flex-start;
  margin-bottom: ${getNormalizedVerticalSize(20)}px;
  height: auto;
  width: auto;
`;

export const ImagePickerButtonContainer = styled.View`
  position: absolute;
  bottom: ${getNormalizedVerticalSize(-5)}px;
  right: ${getNormalizedHorizontalSize(10)}px;
  padding: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(5)}px;
  border-radius: 20px;
  border-width: 0.75px;
  border-color: #767676;
  background-color: ${({ theme }) => `${theme.tokens.colors.tertiary50 + 'ab'}`};
`;

export const ProfileDetailContainer = styled.View`
  min-height: ${getNormalizedVerticalSize(30)}px;
  width: 100%;
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(20)}px;
  border-radius: 10px;
  margin-bottom: ${getNormalizedVerticalSize(2)}px;
  justify-content: center;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary100};
`;
