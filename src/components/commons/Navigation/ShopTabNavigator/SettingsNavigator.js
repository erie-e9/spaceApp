import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ETASimpleText } from '@etaui'
import { FontAwesome } from '@icons'

import MenuSettingsScreen from '@screens/Settings/MenuSettingsScreen'
import ProfileScreen from '@screens/Settings/MenuSettingsScreen/ProfileScreen'

import AccountScreen from '@screens/Settings/AccountScreen'
import AddressesScreen from '@screens/Settings/AccountScreen/AddressesScreen'
import MapAddressesScreen from '@screens/Settings/AccountScreen/AddressesScreen/MapAddressesScreen'
import FavoritesScreen from '@screens/Settings/AccountScreen/FavoritesScreen'
import PaymentMethodsScreen from '@screens/Settings/AccountScreen/PaymentMethodsScreen'
import NewPaymentMethodScreen from '@screens/Settings/AccountScreen/PaymentMethodsScreen/NewPaymentMethodScreen'
import GetOnePaymentMethodScreen from '@screens/Settings/AccountScreen/PaymentMethodsScreen/GetOnePaymentMethodScreen'
import PreviousOrdersScreen from '@screens/Settings/AccountScreen/OrdersScreen/PreviousOrdersScreen'
import GetOnePreviousOrderScreen from '@screens/Settings/AccountScreen/OrdersScreen/PreviousOrdersScreen/GetOnePreviousOrderScreen'
import ProcessingOrdersScreen from '@screens/Settings/AccountScreen/OrdersScreen/ProcessingOrdersScreen'
import GetOneProcessingOrderScreen from '@screens/Settings/AccountScreen/OrdersScreen/ProcessingOrdersScreen/GetOneProcessingOrderScreen'
import BranchOfficesScreen from '@screens/Settings/BranchOfficesScreen'
import MapBranchOfficesScreen from '@screens/Settings/BranchOfficesScreen/MapBranchOfficesScreen'
import BadgeOrders from '../../badgeCounters/badgeOrders'

import AdminToolsScreen from '@screens/Settings/AdminTools'
import AnalyticsScreen from '@screens/Settings/AdminTools/AnalyticsScreen'
import ManageAccountsScreen from '@screens/Settings/AdminTools/ManageAccountsScreen'
import ManageProductsScreen from '@screens/Settings/AdminTools/ManageProductsScreen'
import ReportsScreen from '@screens/Settings/AdminTools/ReportsScreen'

import SettingsScreen from '@screens/Settings/SettingsScreen'
import NotificationsScreen from '@screens/Settings/SettingsScreen/NotificationsScreen'
import ChatsSettingsScreen from '@screens/Settings/SettingsScreen/ChatsSettingsScreen'
import AppPreferencesSettingsScreen from '@screens/Settings/SettingsScreen/AppPreferencesSettingsScreen'

import HelpScreen from '@screens/Settings/HelpScreen'
import AboutUsScreen from '@screens/Settings/HelpScreen/AboutUsScreen'
import ContactUsScreen from '@screens/Settings/HelpScreen/ContactUsScreen'
import HowToUseScreen from '@screens/Settings/HelpScreen/HowToUseScreen'
import FAQSScreen from '@screens/Settings/HelpScreen/FAQSScreen'
import TermsOfServiceScreen from '@screens/Settings/HelpScreen/TermsOfServiceScreen'
import NoticeOfPrivacyScreen from '@screens/Settings/HelpScreen/NoticeOfPrivacyScreen'
import { useTranslation } from '@etaui/translate'

const HeaderLeft = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
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
	const { branch_text_text } = useTranslation()

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
								Settings
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

const Tab = createMaterialTopTabNavigator()
const TopNavigatorOrders = () => {
	const themeContext = useContext(ThemeContext)
	const { processing_orders, previous_orders } = useTranslation()
	
	return (
		<Tab.Navigator
			initialRouteName='ProcessingOrdersScreen'
			tabBarOptions={{
				allowFontScaling: true,
				labelStyle: { fontSize: 11, textTransform: 'none' },
				showIcon: true,
				showLabel: false,
				iconStyle: {
					width: 'auto',
					height: 20,
				},
				tabStyle: {
					// backgroundColor: '#a8a4b4',
					borderRadius: 2,
					borderWidth: 0,
					height: 40,
				},
				activeTintColor: themeContext.PRIMARY_COLOR,
				inactiveTintColor: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR_LIGHT,
				style: { backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR },
				indicatorStyle: {
					borderBottomWidth: 2,
					borderBottomColor: themeContext.PRIMARY_COLOR,
				},
			}}
		>
			<Tab.Screen 
				name="ProcessingOrdersScreen" 
				component={ProcessingOrdersScreen}
				options={{
					tabBarLabel: 'Processing orders',
					tabBarIcon: ({ focused }) => (
						<>
							<BadgeOrders
								badgeCount={1}
								size={17 + 1}
								color='white'
							>
								<ETASimpleText
									size={12}
									weight={
										Platform.OS === 'ios' ? '400' : '300'
									}
									color={ focused
										? themeContext.PRIMARY_COLOR
										: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR_LIGHT
									}
									align='left'>
									{processing_orders.charAt(0).toUpperCase() + processing_orders.slice(1)} {'  '}
								</ETASimpleText>
							</BadgeOrders>
						</>
					)
				}}
			/>
			<Tab.Screen 
				name="PreviousOrdersScreen" 
				component={PreviousOrdersScreen}
				options={{
					tabBarLabel: 'Previous orders',
					tabBarIcon: ({ focused }) => (
						<>
							<ETASimpleText
								size={12}
								weight={
									Platform.OS === 'ios' ? '400' : '300'
								}
								color={ focused
									? themeContext.PRIMARY_COLOR
									: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR_LIGHT
								}
								align='left'>
								{previous_orders.charAt(0).toUpperCase() + previous_orders.slice(1)} {'  '}
							</ETASimpleText>
						</>
					)
				}}
			/>
		</Tab.Navigator>
	)
}

const SettingsStack = createStackNavigator()
const SettingsNavigator = () => {
	const themeContext = useContext(ThemeContext)
	const { admin_tools, analytics, manage_accounts, manage_products, reports,
			settings, notifications, chat_settings, app_preferences, account, 
			map, addresses, payment_methods, new_payment_method, favorites, orders,
			previous_orders, branch_offices, help, about_us, contact_us, how_to_use,
			faq, terms_of_service, notice_of_privacy } = useTranslation()

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
				name='ProfileScreen'
				component={ProfileScreen}
				options={({navigation, route}) => ({
					headerTitle: `${account.charAt(0).toUpperCase() + account.slice(1)}`,
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
				name='AdminToolsScreen'
				component={AdminToolsScreen}
				options={({navigation, route}) => ({
					headerTitle: `${admin_tools.charAt(0).toUpperCase() + admin_tools.slice(1)}`,
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
				name='AnalyticsScreen'
				component={AnalyticsScreen}
				options={({navigation, route}) => ({
					headerTitle: `${analytics.charAt(0).toUpperCase() + analytics.slice(1)}`,
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
				name='ManageAccountsScreen'
				component={ManageAccountsScreen}
				options={({navigation, route}) => ({
					headerTitle: `${manage_accounts.charAt(0).toUpperCase() + manage_accounts.slice(1)}`,
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
				name='ManageProductsScreen'
				component={ManageProductsScreen}
				options={({navigation, route}) => ({
					headerTitle: `${manage_products.charAt(0).toUpperCase() + manage_products.slice(1)}`,
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
				name='ReportsScreen'
				component={ReportsScreen}
				options={({navigation, route}) => ({
					headerTitle: `${reports.charAt(0).toUpperCase() + reports.slice(1)}`,
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
				name='SettingsScreen'
				component={SettingsScreen}
				options={({navigation, route}) => ({
					headerTitle: `${settings.charAt(0).toUpperCase() + settings.slice(1)}`,
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
					headerTitle: `${notifications.charAt(0).toUpperCase() + notifications.slice(1)}`,
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
					headerTitle: `${chat_settings.charAt(0).toUpperCase() + chat_settings.slice(1)}`,
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
				name='AppPreferencesSettingsScreen'
				component={AppPreferencesSettingsScreen}
				options={({navigation, route}) => ({
					headerTitle: `${app_preferences.charAt(0).toUpperCase() + app_preferences.slice(1)}`,
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
					headerTitle: `${account.charAt(0).toUpperCase() + account.slice(1)}`,
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
					headerTitle: `${map.charAt(0).toUpperCase() + map.slice(1)}`,
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
				name='AddressesScreen'
				component={AddressesScreen}
				options={({navigation, route}) => ({
					headerTitle: `${addresses.charAt(0).toUpperCase() + addresses.slice(1)}`,
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
					headerTitle: `${payment_methods.charAt(0).toUpperCase() + payment_methods.slice(1)}`,
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
					headerTitle: `${new_payment_method.charAt(0).toUpperCase() + new_payment_method.slice(1)}`,
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
				name='FavoritesScreen'
				component={FavoritesScreen}
				options={({navigation, route}) => ({
					headerTitle: `${favorites.charAt(0).toUpperCase() + favorites.slice(1)}`,
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
				name='TopNavigatorOrders'
				component={TopNavigatorOrders}
				options={({navigation, route}) => ({
					headerTitle: `${orders.charAt(0).toUpperCase() + orders.slice(1)}`,
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
				name='GetOneProcessingOrderScreen'
				component={GetOneProcessingOrderScreen}
				options={({navigation, route}) => ({
					headerTitle: `${orders.charAt(0).toUpperCase() + orders.slice(1)}`,
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
					headerTitle: `${previous_orders.charAt(0).toUpperCase() + previous_orders.slice(1)}`,
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
					headerTitle: `${branch_offices.charAt(0).toUpperCase() + branch_offices.slice(1)}`,
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
					headerTitle: `${branch_offices.charAt(0).toUpperCase() + branch_offices.slice(1)}`,
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
				name='HelpScreen'
				component={HelpScreen}
				options={({navigation, route}) => ({
					headerTitle: `${help.charAt(0).toUpperCase() + help.slice(1)}`,
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
					headerTitle: `${about_us.charAt(0).toUpperCase() + about_us.slice(1)}`,
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
				name='ContactUsScreen'
				component={ContactUsScreen}
				options={({navigation, route}) => ({
					headerTitle: `${contact_us.charAt(0).toUpperCase() + contact_us.slice(1)}`,
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
					headerTitle: `${how_to_use.charAt(0).toUpperCase() + how_to_use.slice(1)}`,
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
					headerTitle: `${faq.charAt(0).toUpperCase() + faq.slice(1)}`,
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
					headerTitle: `${terms_of_service.charAt(0).toUpperCase() + terms_of_service.slice(1)}`,
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
					headerTitle: `${notice_of_privacy.charAt(0).toUpperCase() + notice_of_privacy.slice(1)}`,
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
