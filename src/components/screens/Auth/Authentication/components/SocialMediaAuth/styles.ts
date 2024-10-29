import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

interface StyledButtonProps {
  disabled?: boolean;
}

export const StyledButton = styled(ActionButton)<StyledButtonProps>`
  margin: ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(10)}px;
`;

export const SocialMediaContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  width: 100%;
  padding: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const SocialMediaButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  background-color: transparent;
`;

export const SocialMediaButtonContainer = styled.View`
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(15)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(15)}px;
  background-color: transparent;
`;

export const SocialMediaFooterTextContainer = styled.View`
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
  align-items: center;
  align-self: center;
  width: 100%;
`;

export const SocialMediaFooterText = styled(Typography)`
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(15)}px;
`;

export const FooterButtonsContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${getNormalizedVerticalSize(80)}px;
  background-color: transparent;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;
