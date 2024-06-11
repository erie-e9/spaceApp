import { PixelRatio, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';
import { Typography, Touchable } from '@components/atoms';
import { TextInput, ActionButton } from '@components/molecules';

export interface PropsStyled {
  error?: boolean;
  align?: 'left' | 'center';
  focused?: boolean;
}

export const ListMenuItemRightSide = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const ListMenuItemBadgeContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
`;

export const StyledTitle = styled(Typography)`
  align-self: flex-start;
  color: ${({ theme }) => theme.tokens.colors.primaryD2};
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
`;

export const ValueTextContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const TouchableItem = styled(Touchable)<{
  isGreyed?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #f4f4f4;
  ${({ isGreyed }) => (isGreyed ? 'opacity: 0.34' : '')};
`;

export const ItemContent = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const ListContainer = styled.View`
  margin-right: 10px;
  margin-left: 10px;
`;

export const TouchableEditItem = styled.TouchableOpacity`
  display: flex;
`;

export const DeleteItemButton = styled.TouchableOpacity`
  padding-right: 7px;
`;

export const MoveItemButton = styled.TouchableOpacity`
  padding-right: 7px;
`;

export const SorteableListView = styled.View<{
  heightList: number;
}>`
  justify-content: flex-end;
  height: ${({ heightList }) => heightList}px;
`;

export const CallToActionView = styled.View`
  align-items: center;
  margin-bottom: 0px;
  padding-bottom: 0px;
  margin-left: 12px;
`;

export const CallToActionButton = styled(Touchable)<{
  isGreyed?: boolean;
}>`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-top: 20px;
  padding-left: 32px;
  ${({ isGreyed }) => (isGreyed ? 'opacity: 0.34' : '')};
`;

export const CallToActionLabel = styled(Typography)`
  margin-bottom: 0px;
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.0125px;
  text-align: left;
`;

export const ButtonContainer = styled.View`
  min-height: ${PixelRatio.roundToNearestPixel(100)}px;
  justify-content: flex-end;
  bottom: 0px;
  padding-bottom: ${PixelRatio.roundToNearestPixel(20)}px;
`;

export const PrimaryButton = styled(ActionButton)<{
  isGreyed?: boolean;
}>`
  margin: ${PixelRatio.roundToNearestPixel(4)}px
    ${PixelRatio.roundToNearestPixel(24)}px;
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;

export const StyledInput = styled(TextInput)<PropsStyled>`
  margin-right: 0px;
  padding: 0px;
  color: ${({ theme }) => theme.tokens.colors.darkBlueD3};
  border-color: ${({ theme }) => theme.tokens.colors.none};
`;

export const TitleText = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 9.5px;
  color: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.tokens.colors.darkBlueL1
      : theme.colors.text.black};
`;

export const ValueText = styled(Typography)``;


export const ChildrenView = styled.View`
  padding-horizontal: 12px;
`;

export const MovableItemAnimatedContainer = styled(Animated.View)`
  position: absolute;
  left: 0px;
  right: 0px;
  shadow-color: black;
  shadow-radius: 10px;
  ${() =>
    Platform.OS === 'ios' &&
    css`
      shadow-offset: {
        height: 0,
        width: 0,
      }
      `}
`;

export const PanHandlerAnimatedView = styled(Animated.View)``;
