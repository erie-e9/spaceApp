import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { InterpolateColorAnimation } from '@components/animated';
import { Skeleton } from '@components/animated';
import { Image, Typography } from '@components/atoms';
import { ActionButton, List } from '@components/molecules';

export interface NotificationContent {
  itemHeight?: number;
}
export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const NotificationItemContainer = styled(InterpolateColorAnimation)<NotificationContent>`
  height: ${({ itemHeight }) => (itemHeight && `${itemHeight}px`) || 'auto'};
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  border-radius: 15px;
  border-width: 0.7px;
  border-color: #333;
  margin: 5px 0px;
  padding: ${getNormalizedVerticalSize(20)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(20)}px ${getNormalizedHorizontalSize(10)}px;
`;

export const NotificationContentContainer = styled.View<NotificationContent>`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${({ itemHeight }) => (itemHeight && `${itemHeight}px`) || 'auto'};
  width: 100%;
  padding: ${getNormalizedVerticalSize(20)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const NotificationContentData = styled.View`
  justify-content: center;
  align-items: flex-start;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(20)}px;
`;

export const NotificationList = styled(List)``;

export const NotificationTitleText = styled(Typography)``;
export const NotificationDescriptionText = styled(Typography)``;

export const AvatarImage = styled(Image)`
  height: ${getNormalizedVerticalSize(50)}px;
  width: ${getNormalizedHorizontalSize(50)}px;
  border-radius: 30px;
`;

export const StyledSkeleton = styled(Skeleton)`
  height: ${getNormalizedVerticalSize(50)}px;
  width: ${getNormalizedHorizontalSize(50)}px;
  border-radius: 30px;
`;

export const MoreNotificationButton = styled(ActionButton)`
  margin: ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(10)}px;
`;

export const RightTopContainer = styled.View`
  width: auto;
  align-items: flex-end;
  justify-content: flex-start;
  position: absolute;
  right: ${getNormalizedHorizontalSize(0)}px;
`;

export const RightTopText = styled(Typography)``;
