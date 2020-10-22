import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack'
import { ETASimpleText } from '@etaui'
import { FontAwesome } from '@icons'

import MenuSettingsScreen from '@screens/Settings/MenuSettingsScreen'
import ProfileScreen from '@screens/Settings/MenuSettingsScreen/ProfileScreen'

import SettingsScreen from '@screens/Settings/SettingsScreen'
import NotificationsScreen from '@screens/Settings/SettingsScreen/NotificationsScreen'
import ChatsSettingsScreen from '@screens/Settings/SettingsScreen/ChatsSettingsScreen'
import LanguageSettingsScreen from '@screens/Settings/SettingsScreen/LanguageSettingsScreen'
import ThemeSettingsScreen from '@screens/Settings/SettingsScreen/ThemeSettingsScreen'

import AccountScreen from '@screens/Settings/AccountScreen'
import AddressesScreen from '@screens/Settings/AccountScreen/AddressesScreen'
import MapAddressesScreen from '@screens/Settings/AccountScreen/AddressesScreen/MapAddressesScreen'
import FavoritesScreen from '@screens/Settings/AccountScreen/FavoritesScreen'
import PaymentMethodsScreen from '@screens/Settings/AccountScreen/PaymentMethodsScreen'
import NewPaymentMethodScreen from '@screens/Settings/AccountScreen/PaymentMethodsScreen/NewPaymentMethodScreen'
import GetOnePaymentMethodScreen from '@screens/Settings/AccountScreen/PaymentMethodsScreen/GetOnePaymentMethodScreen'
import PreviousOrdersScreen from '@screens/Settings/AccountScreen/PreviousOrdersScreen'
import GetOnePreviousOrderScreen from '@screens/Settings/AccountScreen/PreviousOrdersScreen/GetOnePreviousOrderScreen'

import BranchOfficesScreen from '@screens/Settings/BranchOfficesScreen'
import MapBranchOfficesScreen from '@screens/Settings/BranchOfficesScreen/MapBranchOfficesScreen'

import HelpScreen from '@screens/Settings/HelpScreen'
import AboutUsScreen from '@screens/Settings/HelpScreen/AboutUsScreen'
import ContactUsScreen from '@screens/Settings/HelpScreen/ContactUsScreen'
import FAQSScreen from '@screens/Settings/HelpScreen/FAQSScreen'
import TermsOfServiceScreen from '@screens/Settings/HelpScreen/TermsOfServiceScreen'
import HowToUseScreen from '@screens/Settings/HelpScreen/HowToUseScreen'
import NoticeOfPrivacyScreen from '@screens/Settings/HelpScreen/NoticeOfPrivacyScreen'

const HeaderLeft = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	z-index: 100;
	width: 60px;
	margin-left: 15px;
`
const Header = styled.View`
	margin-left: 15px;
`

const ProfileStack = createStackNavigator()
const ProfileNavigator = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<ProfileStack.Navigator
			screenOptions={{
				headerTransparent: !true,
				headerShown: !true,
				headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
				headerStyle: {
					backgroundColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
					shadowColor: 'black',
					shadowOpacity: 0,
					shadowOffset: {height: 0},
					shadowRadius: 5,
					elevation: 0,
				},
				headerTitleStyle: {
					fontWeight: '400',
					fontSize: 12,
				},
			}}>
			<ProfileStack.Screen
				name='MenuSettingsScreen'
				component={MenuSettingsScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: !true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
					},
					headerLeft: () => (
						<Header>
							<ETASimpleText
								size={22}
								weight={
									Platform.OS === 'ios'
										? 'bold'
										: 'bold'
								}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
								align='left'>
								Profile
							</ETASimpleText>
						</Header>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
		</ProfileStack.Navigator>
	)
}

const SettingsStack = createStackNavigator()
const SettingsNavigator = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<SettingsStack.Navigator
			screenOptions={{
				headerTransparent: !true,
				headerShown: !true,
				headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
				headerStyle: {
					backgroundColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
					shadowColor: 'black',
					shadowOpacity: 0,
					shadowOffset: {height: 0},
					shadowRadius: 5,
					elevation: 0,
				},
				headerTitleStyle: {
					fontWeight: '400',
					fontSize: 12,
				},
			}}
		>
			<SettingsStack.Screen
				name='SettingsScreen'
				component={SettingsScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Settings',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
			
			<SettingsStack.Screen
				name='ProfileScreen'
				component={ProfileScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Account',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
			
			<SettingsStack.Screen
				name='ChatsSettingsScreen'
				component={ChatsSettingsScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Notifications',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
			
			<SettingsStack.Screen
				name='LanguageSettingsScreen'
				component={LanguageSettingsScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Notifications',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
			
			<SettingsStack.Screen
				name='ThemeSettingsScreen'
				component={ThemeSettingsScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Notifications',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

			<SettingsStack.Screen
				name='PreviousOrdersScreen'
				component={PreviousOrdersScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Previous orders',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
			
			<SettingsStack.Screen
				name='GetOnePreviousOrderScreen'
				component={GetOnePreviousOrderScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Previous order',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

			<SettingsStack.Screen
				name='HowToUseScreen'
				component={HowToUseScreen}
				options={({navigation, route}) => ({
					headerTitle: 'How to use',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
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
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
		</SettingsStack.Navigator>
	)
}

export {ProfileNavigator, SettingsNavigator}
