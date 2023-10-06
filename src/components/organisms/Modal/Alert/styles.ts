import { PixelRatio, Platform, StyleSheet, ViewStyle } from 'react-native';
import { SCREEN_WIDTH } from '@utils/functions';
import styled, { css } from 'styled-components/native';
import { ActionButton, Typography } from '@components/atoms';

export const MODAL_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
};

export const StyledModal = styled.Modal``;

export const ModalBodyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.View<{ paddingBottom?: number; width?: number }>`
  width: ${({ width }) => width || SCREEN_WIDTH - 40 + 'px'};
  height: auto;
  z-index: 100;
  border-radius: 15px;
  padding-top: 20px;
  padding-horizontal: 10px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 10}px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  background-color: ${({ theme: { tokens, mode } }) =>
    mode === 'dark' ? tokens.colors.none : tokens.colors.none};
  ${() =>
    Platform.OS === 'ios' &&
    css`
      shadow-offset: {
        height: -10px;
        width: -20px;
      }
    `};
`;

export const CloseIconContainer = styled.View`
  position: absolute;
  right: -65px;
  top: 15px;
  font-size: 20px;
  width: 100px;
  height: 100px;
  font-weight: bold;
  z-index: 2;
`;

export const ActionsWrapper = styled.View`
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const StyledButton = styled(ActionButton)<{ minWidth?: number }>`
  margin-right: 3px;
  margin-left: 3px;
  margin-top: 10px;
  margin-bottom: 15px;
  align-self: center;
  border: ${({ theme: { colors } }) => colors.opposing};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.tokens.colors.surfaceL5 : '#67686b'};
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth}px;
    `}
`;

export const TextButton = styled(Typography)<{
  isSimpleButton?: boolean;
}>`
  margin-top: ${({ isSimpleButton }) => (isSimpleButton ? 20 : 0)}px;
  font-weight: ${({ isSimpleButton }) => (isSimpleButton ? 'bold' : 'normal')};
  ${({ isSimpleButton, theme }) => {
    const colorByTheme =
      theme.mode === 'dark'
        ? `color: ${theme.tokens.colors.darkBlueL3}`
        : `color: ${theme.tokens.colors.darkBlueD2}`;
    return isSimpleButton ? colorByTheme : undefined;
  }}
`;

export const TypographyStyled = styled(Typography)<{
  lineHeight?: number;
  fontSize?: number;
}>`
  text-align: center;
  ${({ lineHeight }) =>
    lineHeight &&
    css`
      line-height: ${lineHeight}px;
    `}
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `}
`;

export const StyledActionButton = styled(ActionButton)<{
  mainBtn: boolean;
  backgroundForMainBtn?: string;
  elevation?: string;
}>`
  width: 100%;
  height: ${PixelRatio.roundToNearestPixel(48)}px;
  margin-horizontal: 0px;
  margin-vertical: 10px;
  text-transform: uppercase;
  border-color: ${({ mainBtn }) => (mainBtn ? '#5b707b' : 'transparent')};
  border-width: ${({ mainBtn }) => (mainBtn ? '1px' : '0px')};
  ${({ elevation }) =>
    elevation &&
    css`
      elevation: ${elevation};
    `}
`;
