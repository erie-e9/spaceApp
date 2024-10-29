import { StyleSheet, ViewStyle } from 'react-native';
import styled, { css } from 'styled-components/native';
import {
  screen_width,
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { type ButtonContainerProps } from '@store/slices/types/modal';
import { ActionButton, List } from '@components/molecules';

export const MODAL_STYLE: ViewStyle = {
  flex: 1,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  ...StyleSheet.absoluteFillObject,
};

export const StyledModal = styled.Modal`
  position: absolute;
  z-index: 500;
`;

export const ModalBodyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.View<{ width?: number }>`
  min-height: auto;
  width: ${({ width }) => width || screen_width - 20 + 'px'};
  z-index: 1000;
  border-radius: ${getNormalizedHorizontalSize(15)}px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 3;
  shadow-offset: ${getNormalizedVerticalSize(1)}px ${getNormalizedHorizontalSize(1)}px;
  padding: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(5)}px;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary50};
`;

export const HeaderContainer = styled.View<{ paddingBottom?: number }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(10)}px;
  background-color: transparent;
`;

export const CloseIconContainer = styled.View`
  height: ${getNormalizedVerticalSize(30)}px;
  width: ${getNormalizedHorizontalSize(30)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  z-index: 2;
  align-items: center;
  right: ${getNormalizedHorizontalSize(10)}px;
  top: ${getNormalizedVerticalSize(10)}px;
  position: absolute;
`;

export const ActionsWrapper = styled.View<{ optionsLenght: number }>`
  min-height: ${getNormalizedVerticalSize(60)}px;
  /* width: 75%; */
  justify-content: center;
  margin-top: ${getNormalizedVerticalSize(0)}px;
  align-self: ${({ optionsLenght }) => (optionsLenght === 1 ? 'center' : 'flex-end')};
  padding: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(10)}px;
`;

export interface StyledButtonProps {
  minWidth?: number;
}

export const StyledButton = styled(ActionButton)<StyledButtonProps>`
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(3)}px
    ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(3)}px;
  align-self: center;
  border: ${({ theme }) => theme.tokens.colors.secondary950};
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.tokens.colors.secondary900 : '#67686b')};
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${getNormalizedHorizontalSize(minWidth)};
    `}
`;

export const StyledList = styled(List)`
  flex: 1;
  background-color: transparent;
`;

export const ButtonContainer = styled.View<ButtonContainerProps>`
  flex-direction: row;
  align-items: flex-end;
  justify-items: flex-end;
  justify-content: flex-end;
  justify-content: ${({ alignment }) => {
    switch (alignment) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return alignment;
    }
  }};
`;

export const StyledActionButton = styled(ActionButton)`
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(20)}px;
`;
