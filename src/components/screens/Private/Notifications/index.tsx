import React, { memo } from 'react';
import { Logger } from '@services';
import { CallToAction } from '@components/templates';
import { useNotifications } from './hooks/useNotifications';
import Item from './components/Item';
import { BodyContainer, NotificationList } from './styles';

export const ITEM_HEIGHT = 70;
export const Notifications: React.FC = () => {
  const notificationsHook = useNotifications();

  return (
    <CallToAction
      testID="NotificationsID"
      title={'menu:privateSettings.notificationsCenter.screenTitle'}
      description={'menu:privateSettings.notificationsCenter.description'}
      numberOfLinesTitle={3}
      backButton
      body={
        <BodyContainer>
          <NotificationList
            data={
              notificationsHook.notificationsList.length > 0 && !notificationsHook.loading
                ? notificationsHook.notificationsList
                : Array.from({ length: 15 }).map((_) => null)
            }
            scrollEnabled
            draggable={false}
            swipeable={false}
            useFlashList
            refreshHandler={() => Logger.log('getting more notifications')}
            renderItem={({ item }) => (
              <Item
                id={item.id}
                picture={item.postimage}
                title={item.username}
                description={item.post_title}
                rightTop={item.time}
                itemHeight={ITEM_HEIGHT}
              />
            )}
          />
        </BodyContainer>
      }
      primaryButton={notificationsHook.primaryButton}
    />
  );
};

export default memo(Notifications);
