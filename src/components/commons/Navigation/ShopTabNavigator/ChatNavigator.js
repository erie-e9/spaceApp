import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Feather, FontAwesome } from '@icons'
import ChatClientsScreen from '@screens/Chat/ChatClientsScreen'
import ChatEmployeesScreen from '@screens/Chat/ChatEmployeesScreen'
import ChatItemScreen from '@screens/Chat/ChatItemScreen'
import NewChatScreen from '@screens/Chat/NewChatScreen'
import ContactProfileScreen from '@screens/Chat/ContactProfileScreen'
import { ETASearchBar, ETASimpleText } from '@etaui'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import BadgeChatClients from '../../badgeCounters/badgeChatClients'
import BadgeChatEmployees from '../../badgeCounters/badgeChatEmployees'
import { useTranslation } from '@etaui/translate'

const HeaderLeft = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	z-index: 100;
	width: 10px;
	margin-left: 15px;
`

const HeaderRight = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	z-index: 100;
	margin-right: 15px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	z-index: 100;
	width: 10px;
	margin-left: 10px;
`
const Header = styled.View`
	margin-left: 15px;
`
const IconButton = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
	})`
	height: 35px;
	width: 35px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: #e4e6eb;
	z-index: 100;
	border-radius: 35px;
	margin-horizontal: 5px;
	margin-right: 15px;
`

const Tab = createMaterialTopTabNavigator()
const TopNavigatorChat = () => {
	const themeContext = useContext(ThemeContext)
	const { clients, employees } = useTranslation()
	
	return (
		<Tab.Navigator
			initialRouteName='ChatClientsNavigator'
			tabBarOptions={{
				allowFontScaling: true,
				labelStyle: { fontSize: 11, textTransform: 'none' },
				activeTintColor: themeContext.PRIMARY_COLOR,
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
				inactiveTintColor: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR_LIGHT,
				style: { backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR },
				indicatorStyle: {
					borderBottomWidth: 2,
					borderBottomColor: themeContext.PRIMARY_COLOR,
				},
			}}
		>
			<Tab.Screen 
				name='ChatClientsNavigator' 
				component={ChatClientsScreen}
				options={{
					tabBarLabel: 'Clients',
					tabBarIcon: ({ focused }) => (
						<>
							<BadgeChatClients
								badgeCount={1}
								size={21}
								color='red'
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
									{clients.charAt(0).toUpperCase() + clients.slice(1)} {'  '}
								</ETASimpleText>
							</BadgeChatClients>
						</>
						)
				}}
			/>
			<Tab.Screen 
				name='ChatEmployeesNavigator' 
				component={ChatEmployeesScreen}
				options={{
					tabBarLabel: 'Employees',
					tabBarIcon: ({ focused }) => (
							<BadgeChatEmployees
								badgeCount={1}
								size={21}
								color={'white'}
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
									{employees.charAt(0).toUpperCase() + employees.slice(1)} {'  '}
								</ETASimpleText>
							</BadgeChatEmployees>
						)
				}}
			/>
		</Tab.Navigator>
	)
}

const ChatStack = createStackNavigator()
const ChatNavigator = () => {
	const themeContext = useContext(ThemeContext)
	const { chat_room, search_chat_room } = useTranslation()

	return (
		<ChatStack.Navigator
			screenOptions={{
				headerTransparent: !true,
				headerShown: !true,
				headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
				headerStyle: {
					backgroundColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
				},
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}>
			<ChatStack.Screen
				name='ChatScreen'
				component={TopNavigatorChat}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: !true,
					header: () =>  <ETASearchBar 
										leftContent={`${chat_room.charAt(0).toUpperCase() + chat_room.slice(1)}`} 
										leftContentColor={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} 
										placeholderText={`${search_chat_room.charAt(0).toUpperCase() + search_chat_room.slice(1)}`}
										backgroundColorInput={themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
									/>,
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

		</ChatStack.Navigator>
	)
}

const ChatItemStack = createStackNavigator()
const ChatItemNavigator = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<ChatItemStack.Navigator
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
			<ChatItemStack.Screen
				name='ChatItemScreen'
				component={ChatItemScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '500',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
					},
					headerLeft: '',
					headerRight: () => (
						<HeaderRight
							onPress={() => navigation.goBack()}>
							<Feather
								name='more-vertical'
								size={20}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderRight>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
			<ChatItemStack.Screen
				name='ContactProfileScreen'
				component={ContactProfileScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '500',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
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
					headerRight: () => (
						<HeaderRight
							onPress={() => navigation.goBack()}>
							<Feather
								name='more-vertical'
								size={20}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderRight>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
		</ChatItemStack.Navigator>
	)
}

const NewChatStack = createStackNavigator()
const NewChatNavigator = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<NewChatStack.Navigator
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
			<NewChatStack.Screen
				name='NewChatScreen'
				component={NewChatScreen}
				options={({navigation, route}) => ({
					headerTitle: 'New chat',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '500',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
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
					headerRight: () => (
						<HeaderRight
							onPress={() => navigation.goBack()}>
							<Feather
								name='more-vertical'
								size={20}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderRight>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
		</NewChatStack.Navigator>
	)
}

export {ChatNavigator, ChatItemNavigator, NewChatNavigator}
