import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Image, Touchable, Typography } from '@components/atoms';
import { Skeleton } from '@components/animated';
import { List } from '@components/molecules';

export interface NotificationContent {
  itemHeight?: number;
}

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const NotificationItemContainer = styled.View<NotificationContent>`
  height: ${({ itemHeight }) => (itemHeight && `${itemHeight}px`) || 'auto'};
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  border-width: ${getNormalizedHorizontalSize(0)}px;
  border-color: #333;
`;

export const NotificationContentContainer = styled.View<NotificationContent>`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: ${({ itemHeight }) => (itemHeight && `${itemHeight}px`) || 'auto'};
  width: 100%;
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(5)}px;
`;

export const NotificationContentData = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  width: 60%;
`;

export const NotificationList = styled(List)``;

export const NotificationTitleText = styled(Typography)``;

export const NotificationDescriptionText = styled(Typography)``;

export const AvatarImage = styled(Image)``;

export const ItemButton = styled(Touchable)``;

export const RightTopContainer = styled.View`
  width: 20%;
  align-items: flex-end;
`;

export const RightTopText = styled(Typography)``;

export const StyledSkeleton = styled(Skeleton)`
  height: ${getNormalizedVerticalSize(50)}px;
  width: ${getNormalizedHorizontalSize(50)}px;
  border-radius: 30px;
`;
