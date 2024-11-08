import { memo, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { testProperties } from '@utils/functions';
import { dayjs } from '@utils/formatters';
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
  ItemButton,
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
  onPress?: ((item: any) => void) | undefined;
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
  const formattedTime = useMemo(() => {
    // return dayjs('2024-11-07T21:09:14.517Z').fromNow();
    return `${dayjs(rightTop).fromNow()}`;
  }, [rightTop]);

  const theme = useTheme();
  return (
    <ItemButton
      onPress={() =>
        onPress &&
        onPress({
          id,
          title,
          description,
        })
      }
    >
      <NotificationItemContainer {...testProperties(testID || 'ItemID')} itemHeight={itemHeight}>
        <NotificationContentContainer>
          {picture && <AvatarImage source={picture} priority="normal" borderRadius={25} />}
          {/* <StyledSkeleton
          width={50}
          height={50}
          borderRadius={30}
          animationType="pulse"
          direction="leftToRight"
          backgroundColor={theme.tokens.colors.tertiary200}
          /> */}
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
              <NotificationDescriptionText color="typography600">
                {description}
              </NotificationDescriptionText>
            ) : (
              <>
                <StyledSkeleton
                  width={200}
                  height={15}
                  borderRadius={0}
                  animationType="pulse"
                  direction="leftToRight"
                  backgroundColor={theme.tokens.colors.tertiary200}
                />
              </>
            )}
          </NotificationContentData>
          {rightTop && (
            <RightTopContainer>
              {!loading ? (
                <RightTopText type="Label">{formattedTime}</RightTopText>
              ) : (
                <StyledSkeleton
                  width={60}
                  height={20}
                  borderRadius={10}
                  animationType="pulse"
                  direction="leftToRight"
                  backgroundColor={theme.tokens.colors.tertiary200}
                />
              )}
            </RightTopContainer>
          )}
        </NotificationContentContainer>
      </NotificationItemContainer>
    </ItemButton>
  );
};

export default memo(Item);
