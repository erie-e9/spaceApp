import { memo } from 'react';
import { useTheme } from 'styled-components';
import { testProperties } from '@utils/functions';
import {
  AvatarImage,
  StyledSkeleton,
  NotificationContentContainer,
  NotificationContentData,
  NotificationDescriptionText,
  NotificationItemContainer,
  NotificationTitleText,
  RightTopContainer,
  RightTopText,
} from '../styles';

export interface ItemProps {
  testID?: string;
  id?: string | number;
  title: string;
  picture?: string;
  description?: string | undefined;
  leftIcon?: string | undefined;
  rightIcon?: string | undefined;
  disabled?: boolean;
  rightTop: string;
  itemHeight?: number | undefined;
  loading?: boolean;
  onPress?: (() => void) | undefined;
}

export const Item: React.FC<ItemProps> = ({
  testID,
  id,
  title,
  description,
  picture,
  rightTop,
  itemHeight,
  loading,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <NotificationItemContainer {...testProperties(testID || 'ItemID')} itemHeight={itemHeight}>
      <NotificationContentContainer>
        {rightTop && (
          <RightTopContainer>
            {!loading ? (
              <RightTopText color="secondary700">{rightTop}</RightTopText>
            ) : (
              <StyledSkeleton
                width={30}
                height={15}
                borderRadius={10}
                animationType="pulse"
                direction="leftToRight"
                backgroundColor={theme.tokens.colors.tertiary200}
              />
            )}
          </RightTopContainer>
        )}
        {picture && !loading ? (
          <AvatarImage source={picture} priority="normal" borderRadius={25} />
        ) : (
          <StyledSkeleton
            width={50}
            height={50}
            borderRadius={30}
            animationType="pulse"
            direction="leftToRight"
            backgroundColor={theme.tokens.colors.tertiary200}
          />
        )}
        <NotificationContentData>
          {!loading ? (
            <NotificationTitleText>
              {id} {title}
            </NotificationTitleText>
          ) : (
            <StyledSkeleton
              width={60}
              height={20}
              borderRadius={0}
              animationType="pulse"
              direction="leftToRight"
              backgroundColor={theme.tokens.colors.tertiary200}
            />
          )}
          {!loading ? (
            <NotificationDescriptionText color="secondary600">
              {description}
            </NotificationDescriptionText>
          ) : (
            <StyledSkeleton
              width={80}
              height={10}
              borderRadius={0}
              animationType="pulse"
              direction="leftToRight"
              backgroundColor={theme.tokens.colors.tertiary200}
            />
          )}
        </NotificationContentData>
      </NotificationContentContainer>
    </NotificationItemContainer>
  );
};

export default memo(Item);
