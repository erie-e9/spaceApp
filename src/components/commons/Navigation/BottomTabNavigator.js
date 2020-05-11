import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons, FontAwesome, AntDesign} from '@commons/Icons';
import {fakeavatar, variables} from '@utils/constants';
import MenuScreen from '@screens/Menu/MenuScreen';
// import AnalyticsScreen from '@screens/AnalyticsScreen';
import MenuItemScreen from '@screens/Menu/MenuItemScreen';
import FavsScreen from '@screens/Favs/FavsScreen';
import CartScreen from '@screens/Cart/CartScreen';
// import ChatsScreen from '@screens/ChatsScreen';
import ProfileScreen from '@screens/ProfileScreen';
import OrdersScreen from '@screens/OrdersScreen';

// const HeaderLeft = styled.View`
//   marginLeft: 15px;
// `;
const HeaderRight = styled.View`
  flexDirection: row;
  marginRight: 15px;
`;
const AvatarContainer = styled.View``;
const Avatar = styled.Image``;
const Touchable = styled.TouchableOpacity`
  marginLeft: 10px;
`;

/** App user logged */
const MenuStack = createStackNavigator();
const MenuNavigator = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <MenuStack.Navigator
      screenOptions={{
        headerTransparent: !true,
        headerShown: true,
        headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
        headerStyle: {
          backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
          shadowColor: 'transparent',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <MenuStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          headerTitle: '',
          headerRight: () => (
            <HeaderRight>
              <Touchable>
                <AntDesign
                  name="search1"
                  size={24}
                  color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                />
              </Touchable>
            </HeaderRight>
          ),
        }}
      />
      <MenuStack.Screen
        name="MenuItemScreen"
        component={MenuItemScreen}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerLeft: () => {
            return (
              <Touchable onPress={navigation.goBack}>
                <FontAwesome name="angle-double-left" size={24} color="gray" />
              </Touchable>
            );
          },
          headerRight: () => (
            <HeaderRight>
              <Touchable>
                <AntDesign
                  name="search1"
                  size={24}
                  color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                />
              </Touchable>
            </HeaderRight>
          ),
        })}
      />
    </MenuStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Tab.Navigator
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
                // style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}
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
      {/* <Tab.Screen name='Analytics' component={AnalyticsScreen} /> */}
      <Tab.Screen name="Menu" component={MenuNavigator} />
      {/* <Tab.Screen name="Orders" component={OrdersScreen} /> */}
      {/* <Tab.Screen name='Chats' component={ChatsScreen} /> */}
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favs" component={FavsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
/** /App user logged */

export default BottomTabNavigator;
