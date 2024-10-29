import { useCallback, useMemo } from 'react';
import { useResponseHandler, useTheme } from '@hooks';

export interface Notification {
  id: number | string;
  post_title: string;
  postimage: string;
  post_city: string;
  username: string;
  notification: string;
  time: string;
}

export const useNotifications = () => {
  const { darkMode } = useTheme();
  const { loading, setLoading } = useResponseHandler();

  const notificationsList = useMemo(
    (): Array<Notification> => [
      {
        id: 0,
        post_title: 'lovely times',
        postimage: 'https://i.pravatar.cc/150?img=33',
        post_city: 'durango',
        username: 'Erie',
        notification: 'Yellow MX',
        time: '10:50',
      },
      {
        id: 1,
        post_title: 'best things',
        postimage: 'https://i.pravatar.cc/150?img=1',
        post_city: 'gujraat',
        username: 'Doremon',
        notification: 'Liked your Post',
        time: '10:50',
      },
      {
        id: 2,
        post_title: 'sunset vibes',
        postimage: 'https://i.pravatar.cc/150?img=2',
        post_city: 'mumbai',
        username: 'Nobita',
        notification: 'Commented on your Post',
        time: '12:00',
      },
      {
        id: 3,
        post_title: 'morning bliss',
        postimage: 'https://i.pravatar.cc/150?img=3',
        post_city: 'delhi',
        username: 'Shizuka',
        notification: 'Shared your Post',
        time: '08:30',
      },
      {
        id: 4,
        post_title: 'evening stroll',
        postimage: 'https://i.pravatar.cc/150?img=4',
        post_city: 'bangalore',
        username: 'Gian',
        notification: 'Mentioned you in a comment',
        time: '14:45',
      },
      {
        id: 5,
        post_title: 'night lights',
        postimage: 'https://i.pravatar.cc/150?img=5',
        post_city: 'kolkata',
        username: 'Suneo',
        notification: 'Liked your Post',
        time: '19:00',
      },
      {
        id: 6,
        post_title: 'weekend vibes',
        postimage: 'https://i.pravatar.cc/150?img=6',
        post_city: 'hyderabad',
        username: 'Dekisugi',
        notification: 'Commented on your Post',
        time: '11:15',
      },
      {
        id: 7,
        post_title: 'nature love',
        postimage: 'https://i.pravatar.cc/150?img=7',
        post_city: 'chennai',
        username: 'Jaiko',
        notification: 'Shared your Post',
        time: '16:20',
      },
      {
        id: 8,
        post_title: 'beach day',
        postimage: 'https://i.pravatar.cc/150?img=8',
        post_city: 'goa',
        username: 'Kaminari',
        notification: 'Mentioned you in a comment',
        time: '18:30',
      },
      {
        id: 9,
        post_title: 'mountain trek',
        postimage: 'https://i.pravatar.cc/150?img=9',
        post_city: 'manali',
        username: 'Jisuka',
        notification: 'Liked your Post',
        time: '07:40',
      },
      {
        id: 10,
        post_title: 'rainy day',
        postimage: 'https://i.pravatar.cc/150?img=10',
        post_city: 'pune',
        username: 'Hidetoshi',
        notification: 'Commented on your Post',
        time: '09:00',
      },
      {
        id: 11,
        post_title: 'sunrise magic',
        postimage: 'https://i.pravatar.cc/150?img=11',
        post_city: 'lucknow',
        username: 'Sakura',
        notification: 'Shared your Post',
        time: '05:50',
      },
      {
        id: 12,
        post_title: 'forest trail',
        postimage: 'https://i.pravatar.cc/150?img=12',
        post_city: 'shimla',
        username: 'Kuroo',
        notification: 'Mentioned you in a comment',
        time: '13:35',
      },
      {
        id: 13,
        post_title: 'city lights',
        postimage: 'https://i.pravatar.cc/150?img=13',
        post_city: 'jaipur',
        username: 'Osamu',
        notification: 'Liked your Post',
        time: '20:10',
      },
      {
        id: 14,
        post_title: 'festival fun',
        postimage: 'https://i.pravatar.cc/150?img=14',
        post_city: 'agra',
        username: 'Kenma',
        notification: 'Commented on your Post',
        time: '21:30',
      },
      {
        id: 15,
        post_title: 'lazy afternoon',
        postimage: 'https://i.pravatar.cc/150?img=15',
        post_city: 'nashik',
        username: 'Lev',
        notification: 'Shared your Post',
        time: '15:25',
      },
      {
        id: 16,
        post_title: 'foodie life',
        postimage: 'https://i.pravatar.cc/150?img=16',
        post_city: 'ahmedabad',
        username: 'Noya',
        notification: 'Mentioned you in a comment',
        time: '17:45',
      },
      {
        id: 17,
        post_title: 'winter wonderland',
        postimage: 'https://i.pravatar.cc/150?img=17',
        post_city: 'ooty',
        username: 'Tendou',
        notification: 'Liked your Post',
        time: '06:30',
      },
      {
        id: 18,
        post_title: 'summer vibes',
        postimage: 'https://i.pravatar.cc/150?img=18',
        post_city: 'kochi',
        username: 'Bokuto',
        notification: 'Commented on your Post',
        time: '08:10',
      },
      {
        id: 19,
        post_title: 'hiking adventure',
        postimage: 'https://i.pravatar.cc/150?img=19',
        post_city: 'darjeeling',
        username: 'Akaashi',
        notification: 'Shared your Post',
        time: '12:40',
      },
      {
        id: 20,
        post_title: 'coffee break',
        postimage: 'https://i.pravatar.cc/150?img=20',
        post_city: 'mysore',
        username: 'Iwaizumi',
        notification: 'Mentioned you in a comment',
        time: '11:05',
      },
      {
        id: 21,
        post_title: 'chill evening',
        postimage: 'https://i.pravatar.cc/150?img=21',
        post_city: 'trivandrum',
        username: 'Matsukawa',
        notification: 'Liked your Post',
        time: '18:00',
      },
    ],
    [],
  );

  const getNotifications = useCallback(async (): Promise<Array<Notification>> => {
    return notificationsList;
  }, []);

  const primaryButtonHandler = useCallback(async (): Promise<void> => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  const primaryButton = useMemo(() => {
    return {
      title: 'menu:privateSettings.notificationsCenter.controllers.previousNotificationsButton',
      onPress: primaryButtonHandler,
      testID: 'notificationsPrimaryButton',
      textColor: darkMode ? 'tertiary50' : 'secondary950',
      disabled: loading,
      loading: loading,
    };
  }, [loading, darkMode]);

  return {
    notificationsList,
    getNotifications,
    primaryButton,
    loading,
  };
};
