import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Easing } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, AntDesign } from '@commons/Icons';
import SplashScreen from '@components/commons/SplashScreen';
import AnalyticsScreen from '@screens/AnalyticsScreen';
import MenuScreen from '@screens/MenuScreen';
import ChatsScreen from '@screens/ChatsScreen';
import AuthScreen from '@screens/AuthScreen';
import OrdersScreen from '@screens/OrdersScreen';
import ForgetPasswordScreen from '@screens/ForgetPasswordScreen';
import SignupScreen from '@screens/SignupScreen';
import SettingsScreen from '@screens/SettingsScreen';
import { Context } from '@context';
import { ETAAvatar } from '@etaui';

const HeaderLeft = styled.View`
  marginLeft: 15px
`;
const HeaderRight = styled.View`
  flexDirection: row;
  marginRight: 15px
`;

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 150,
    mass: 3,
    overshootClamping: !true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const configClose = {
  animation: 'timing',
  config: {
    duration: 250,
    easing: Easing.linear
  }
};

/** Auth screens - No logged */
const SigninStack = createStackNavigator();
const SigninStackScreen = () => {
  return (    
    <SigninStack.Navigator
      // initialRouteName='Home'
      mode='modal'
      // headerMode='none'
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
        headerShown: true,
        headerTransparent: true,
        // headerRight: () => {
        //   return <Text>Ewe</Text>
        // },
        // transition way 1
        // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        // transition way 2
        transitionSpec: {
          open: config,
          close: configClose
        },
        // transition way 3
        // ...TransitionPresets.FadeFromBottomAndroid
        // headerStyle: { backgroundColor: 'tomato' },
      }}
      // animation='fade'
      >
      <SigninStack.Screen 
        name='AuthScreen' 
        component={AuthScreen}
        options={{
          title:'AuthScreen',
          headerShown: !true,
          headerTransparent: true,
          // animationTypeForReplace: 'push'
        }}
      />
      
      <SigninStack.Screen 
        name='SignupScreen' 
        component={SignupScreen}
        options={({ navigation, route }) => ({
          title: 'New account',
          headerShown: true,
          headerLeft: () => {
            return <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}><FontAwesome name='angle-double-left' size={24} color='gray'/></TouchableOpacity>
          },
          headerTransparent: true,
          // animationTypeForReplace: 'push'
        })}
      />
      
      <SigninStack.Screen 
        name='ForgetPasswordScreen' 
        component={ForgetPasswordScreen}
        options={({ navigation, route }) => ({
          title: 'Forget Password',
          headerShown: true,
          headerLeft: () => {
            return <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}><FontAwesome name='angle-double-left' size={24} color='gray'/></TouchableOpacity>
          },
          headerTransparent: true,
          // animationTypeForReplace: 'push'
        })}
      />
    </SigninStack.Navigator>
  );
}
/** /Auth screens - No logged */

/** App user logged */
const MenuStack = createStackNavigator()
const MenuNavigator = () => {
  const themeContext = useContext(ThemeContext);

  return (
      <MenuStack.Navigator
        screenOptions={{
          headerTransparent: !true,
          headerShown: true,
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          headerStyle: {
            backgroundColor: 'white'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <MenuStack.Screen 
          name="Menu" 
          component={MenuScreen}
          options={{
            headerTitle: 'Menu',
            headerLeft: () => (
              <HeaderLeft>
                <ETAAvatar size='small' />
              </HeaderLeft>
            ),
            headerRight: () => (
              <HeaderRight>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <AntDesign name='search1' size={24} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 15 }}>
                  <FontAwesome name='shopping-cart' size={24} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                </TouchableOpacity>
              </HeaderRight>
            ),
          }}  />
       </MenuStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Analytics') {
            iconName = focused ? 'ios-analytics' : 'ios-analytics';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'ios-keypad' : 'ios-keypad';
          } else if (route.name === 'Orders') {
            return <Ionicons name={focused ? 'ios-add-circle' : 'ios-add-circle'} size={35} color={color} 
            // style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}
            />
          } else if (route.name === 'Chats') {
            return <Ionicons name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles'} size={size} color={color} />
          } else if (route.name === 'Settings') {
            return <Ionicons name={focused ? 'ios-cog' : 'ios-cog'} size={size} color={color} />
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}

      tabBarOptions={{
        activeTintColor: themeContext.PRIMARY_COLOR,
        inactiveTintColor: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
      }}
    >
      {/* <Tab.Screen name='Analytics' component={AnalyticsScreen} /> */}
      <Tab.Screen name='Menu' component={MenuNavigator} />
      <Tab.Screen name='Orders' component={OrdersScreen} />
      <Tab.Screen name='Chats' component={ChatsScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
}
/** /App user logged */

////////////////////////////////////////////////////////////
export default Navbar = () => {
  const { restoreToken, state } = useContext(Context);
  // const [ isLoading, setisLoading ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      restoreToken()
      // setisLoading(!true)
      console.warn('Navbar', state)
    }, 2000);
  }, [])
  
  if (state.isLoading) {
    return <SplashScreen />
  }

  return (
    <>
      {
        state.userToken !== null
        ? <BottomTabNavigator />
        : <SigninStackScreen />
      }
    </>
  );
}
