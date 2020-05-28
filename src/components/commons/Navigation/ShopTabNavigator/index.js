import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons, FontAwesome, AntDesign} from '@commons/Icons';
import {fakeavatar, variables} from '@utils/constants';
import MenuNavigator from './MenuNavigator';
import ChatNavigator from './ChatNavigator';
import AnalyticsScreen from '@screens/AnalyticsScreen';
import FavsScreen from '@screens/Favs/FavsScreen';
import CartScreen from '@screens/Cart/CartScreen';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import OrdersScreen from '@screens/Orders/OrdersScreen';
import {ETASearchBar} from '@etaui';

const AvatarContainer = styled.View``;
const Avatar = styled.Image``;

const ShopTab = createBottomTabNavigator();
const ShopTabNavigator = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <ShopTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Analytics') {
            iconName = focused ? 'ios-analytics' : 'ios-analytics';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'ios-keypad' : 'ios-keypad';
          } else if (route.name === 'Orders') {
            return (
              <Ionicons
                name={focused ? 'ios-add-circle' : 'ios-add-circle'}
                size={size + 4}
                color={color}
              />
            );
          } else if (route.name === 'Chats') {
            return (
              <Ionicons
                name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Cart') {
            return (
              <FontAwesome
                name={focused ? 'shopping-cart' : 'shopping-cart'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Favs') {
            return (
              <Ionicons
                name={focused ? 'ios-heart' : 'ios-heart'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Profile') {
            return (
              <AvatarContainer>
                <Avatar
                  style={{
                    height: size,
                    width: size,
                    borderRadius: size / 2,
                  }}
                  source={{
                    uri: fakeavatar
                      ? fakeavatar
                      : variables.AVATAR_USER_DEFAULT,
                  }}
                />
              </AvatarContainer>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: !true,
        // safeAreaInset: 'bottom',
        activeTintColor: themeContext.PRIMARY_COLOR,
        inactiveTintColor: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
        style: {
          borderTopColor: 'transparent',
          backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
        },
      }}>
      {/* <ShopTab.Screen name='Analytics' component={AnalyticsScreen} /> */}
      <ShopTab.Screen name='Menu' component={MenuNavigator} />
      {/* <ShopTab.Screen name='Orders' component={OrdersScreen} /> */}
      <ShopTab.Screen name='Chats' component={ChatNavigator} />
      {/* <ShopTab.Screen name='Cart' component={CartScreen} /> */}
      {/* <ShopTab.Screen name='Favs' component={FavsScreen} /> */}
      <ShopTab.Screen name='Profile' component={ProfileScreen} />
    </ShopTab.Navigator>
  );
};
/** /App user logged */

export default ShopTabNavigator;
