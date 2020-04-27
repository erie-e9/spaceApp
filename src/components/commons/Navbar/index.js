import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Easing } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, EvilIcons } from '@commons/Icons';
import AnalyticsScreen from '@screens/AnalyticsScreen';
import MenuScreen from '@screens/MenuScreen';
import ChatsScreen from '@screens/ChatsScreen';
import AuthScreen from '@screens/AuthScreen';
import ForgetPasswordScreen from '@screens/ForgetPasswordScreen';
import SignupScreen from '@screens/SignupScreen';
import SettingsScreen from '@screens/SettingsScreen';
import { lightTheme } from '@utils/constants';
import { Context } from '@context';

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
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
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
        })}
      />
    </SigninStack.Navigator>
  );
}
/** /Auth screens - No logged */

/** App user logged */
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Menu') {
            iconName = focused ? 'ios-keypad' : 'ios-keypad';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'ios-analytics' : 'ios-analytics';
          } else if (route.name === 'Chats') {
            return <Ionicons name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles'} size={size} color={color} />
          } else if (route.name === 'Settings') {
            return <Ionicons name={focused ? 'ios-cog' : 'ios-cog'} size={size} color={color} />
          } else if (route.name === 'Auth') {
            return <EvilIcons name={focused ? 'user' : 'user'} size={size+5} color={color} />
          } else if (route.name === 'Signup') {
            return <Ionicons name={focused ? 'md-person-add' : 'md-person-add'} size={size-5} color={color} />
          }

          return <Ionicons name={iconName} size={size} color={color} />;;
        },
      })}

      tabBarOptions={{
        activeTintColor: lightTheme.PRIMARY_COLOR,
        inactiveTintColor: '#333',
      }}
    >
      <Tab.Screen name='Analytics' component={AnalyticsScreen} />
      <Tab.Screen name='Menu' component={MenuScreen} />
      {/* <Tab.Screen name='Orders' component={OrdersScreen} /> */}
      <Tab.Screen name='Chats' component={ChatsScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
}
/** /App user logged */

////////////////////////////////////////////////////////////
export default Navbar = () => {
  const { state, signIn, error } = useContext(Context);
  const [ userToken, setuserToken ] = useState(null);

  const initScreens = async () => {
    let getToken = await AsyncStorage.getItem('@userToken');
    console.log('getToken:', getToken);
    setuserToken(getToken);
    
    return getToken;
  }
  
  useEffect(() => {
    initScreens();
    console.log('singIn from Navbar');
    console.log(userToken);
  }, [])

  return (
    <>
      {
        userToken
        ? <TabNavigator />
        : <SigninStackScreen />
      }
    </>
  );
}
