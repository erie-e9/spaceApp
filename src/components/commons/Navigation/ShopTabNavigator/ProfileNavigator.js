import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import AccountScreen from '@screens/Profile/AccountScreen';
import NotificationsScreen from '@screens/Profile/NotificationsScreen';
import BranchOfficesScreen from '@screens/Profile/BranchOfficesScreen';
import AddressesScreen from '@screens/Profile/AddressesScreen';
import MapAddressesScreen from '@screens/Profile/AddressesScreen/MapAddressesScreen';
import FavoritesScreen from '@screens/Profile/FavoritesScreen';
import PaymentMethodsScreen from '@screens/Profile/PaymentMethodsScreen';
import NewPaymentMethodScreen from '@screens/Profile/PaymentMethodsScreen/NewPaymentMethodScreen';
import GetOnePaymentMethodScreen from '@screens/Profile/PaymentMethodsScreen/GetOnePaymentMethodScreen';
import HelpScreen from '@screens/Profile/HelpScreen';
import AboutUsScreen from '@screens/Profile/HelpScreen/AboutUsScreen';
import MapBranchOfficesScreen from '@screens/Profile/BranchOfficesScreen/MapBranchOfficesScreen';
import ContactUsScreen from '@screens/Profile/HelpScreen/ContactUsScreen';
import FAQSScreen from '@screens/Profile/HelpScreen/FAQSScreen';
import TermsOfServiceScreen from '@screens/Profile/HelpScreen/TermsOfServiceScreen';
import NoticeOfPrivacyScreen from '@screens/Profile/HelpScreen/NoticeOfPrivacyScreen';
import {ETASimpleText} from '@etaui';
import {FontAwesome} from '@icons';

const HeaderLeft = styled.TouchableOpacity`
  margin-left: 15px;
`;
const HeaderLeftCard = styled.TouchableOpacity`
  margin-left: 15px;
  margin-top: 25px;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 15px;
`;
const HeaderRight = styled.View`
  flex-direction: row;
  margin-right: 15px;
`;
const Header = styled.View`
  margin-left: 15px;
`;

const ProfileStack = createStackNavigator();
const ProfileNavigator = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTransparent: !true,
        headerShown: !true,
        headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
        headerStyle: {
          backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
          shadowColor: 'black',
          shadowOpacity: 0.15,
          shadowOffset: { height: 0.2 },
          shadowRadius: 5,
          elevation: 5
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >

      <ProfileStack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerShown: !true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
          },
          headerLeft: () => {
            return (
                <Header>
                  <ETASimpleText
                    size={22}
                    weight={Platform.OS === 'ios' ? 'bold' : 'bold'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align={'left'}>
                    Profile
                  </ETASimpleText>
                </Header>
            );
            },
            // headerRight: () => {
            //     return (
            //         <IconButton
            //             activeOpacity={1}
            //             underlayColor='#ccd0d5'
            //             // onPress={(event) => _onFocus(event)}
            //         >
            //             <FontAwesome name='search' size={18} color='#000' />
            //         </IconButton>
            //     )
            // },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
    </ProfileStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();
const SettingsNavigator = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTransparent: !true,
        headerShown: !true,
        headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
        headerStyle: {
          backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
          shadowColor: 'black',
          shadowOpacity: 0,
          shadowOffset: { height: 0 },
          shadowRadius: 5,
          elevation: 5
        },
        headerTitleStyle: {
          fontWeight: '400',
          fontSize: 12
        },
      }}
    >

      <SettingsStack.Screen
        name='AccountScreen'
        component={AccountScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Account',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='NotificationsScreen'
        component={NotificationsScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Notifications',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='AddressesScreen'
        component={AddressesScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Addresses',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
      
      <SettingsStack.Screen
        name='MapAddressesScreen'
        component={MapAddressesScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Map',
          headerShown: !true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='FavoritesScreen'
        component={FavoritesScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Favorites',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='PaymentMethodsScreen'
        component={PaymentMethodsScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Payment methods',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
      
      <SettingsStack.Screen
        name='NewPaymentMethodScreen'
        component={NewPaymentMethodScreen}
        options={({navigation, route}) => ({
          headerTitle: 'New payment method',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
      
      <SettingsStack.Screen
        name='GetOnePaymentMethodScreen'
        component={GetOnePaymentMethodScreen}
        options={({navigation, route}) => ({
          headerTitle: ' ',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='HelpScreen'
        component={HelpScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Help',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='AboutUsScreen'
        component={AboutUsScreen}
        options={({navigation, route}) => ({
          headerTitle: 'About us',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='BranchOfficesScreen'
        component={BranchOfficesScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Branch offices',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='MapBranchOfficesScreen'
        component={MapBranchOfficesScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Branch offices',
          headerShown: !true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='ContactUsScreen'
        component={ContactUsScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Contact us',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='FAQSScreen'
        component={FAQSScreen}
        options={({navigation, route}) => ({
          headerTitle: 'FAQ',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='TermsOfServiceScreen'
        component={TermsOfServiceScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Terms of service',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

      <SettingsStack.Screen
        name='NoticeOfPrivacyScreen'
        component={NoticeOfPrivacyScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Notice of privacy',
          headerShown: true,
          headerTransparent: !true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            fontSize: 18
          },
          headerLeft: () => {
            return (
              <HeaderLeft onPress={() => navigation.goBack()}>
                <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
              </HeaderLeft>
            );
          },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
    
    </SettingsStack.Navigator>
  );
}   

export {
  ProfileNavigator,
  SettingsNavigator
};
