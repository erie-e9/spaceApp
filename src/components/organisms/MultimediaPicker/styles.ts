import { TouchableWithoutFeedback, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Image, Typography } from '@components/atoms';

interface AttatchContainerProps {
  alignItems: ViewStyle['justifyContent'];
}

export interface StyledButtonProps {
  error?: boolean;
  focused?: boolean;
  hasValue?: boolean;
  editable?: boolean;
  styledFocus?: boolean;
  maintainFocus?: boolean;
  touched?: boolean;
}

export const AttachmentContainer = styled.View`
  height: auto;
  width: 100%;
  align-items: flex-start;
  padding: 10px 5px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary100};
`;

export const AttatchContainer = styled.View<AttatchContainerProps>`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${({ alignItems }) => alignItems};
  align-items: center;
`;

export const ImagePreview = styled(Animated.View)`
  margin: 5px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

export const ImageThumbnail = styled(Image)`
  width: 70px;
  height: 70px;
`;

interface AddButtonProps {
  fullSize?: boolean;
}

export const AddButton = styled.TouchableOpacity<AddButtonProps>`
  width: ${({ fullSize }) => (fullSize ? '100%' : '70px')};
  height: ${({ fullSize }) => (fullSize ? '120px' : '70px')};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary200};
`;

export const StyledButton = styled(TouchableWithoutFeedback) <StyledButtonProps>``;

export const DeleteIcon = styled.TouchableOpacity`
  position: absolute;
  top: 4px;
  right: 3px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.tokens.colors.danger_status};
`;

export const AddPanelContainer = styled.View`
  flex-direction: row;
`;

export const AttachmentTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Typography)`
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(2)}px;
  text-align: center;
`;
