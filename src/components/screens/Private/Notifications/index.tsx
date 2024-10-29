import React, { memo } from 'react';
import { useNotifications } from './hooks/useNotifications';
import { CallToAction } from '@components/templates';
import { BodyContainer, NotificationList, MoreNotificationButton } from './styles';
import Item from './components/Item';

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
            data={notificationsHook.notificationsList}
            scrollEnabled={true}
            draggable={!true}
            itemHeight={ITEM_HEIGHT}
            refreshHandler={() => console.log('getting more notifications')}
            // filterBy={['username', 'post_title']}
            renderItem={({ item }) => (
              <Item
                id={item.id}
                picture={item.postimage}
                title={item.username}
                description={item.post_title}
                rightTop={item.time}
                itemHeight={ITEM_HEIGHT}
                loading={notificationsHook.loading}
              />
            )}
            estimatedItemSize={200}
            // footerComponent={
            //   <MoreNotificationButton
            //     testID={notificationsHook.primaryButton.testID || undefined}
            //     title={notificationsHook.primaryButton.title}
            //     onPress={notificationsHook.primaryButton.onPress}
            //     onPressType="onPressIn"
            //     loading={notificationsHook.primaryButton.loading || undefined}
            //     disabled={notificationsHook.primaryButton.disabled || undefined}
            //   />
            // }
          />
        </BodyContainer>
      }
      primaryButton={notificationsHook.primaryButton}
    />
  );
};

export default memo(Notifications);
