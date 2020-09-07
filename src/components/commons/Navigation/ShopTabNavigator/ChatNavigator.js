import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack'
import {Feather, FontAwesome} from '@icons'
import ChatScreen from '@screens/Chat/ChatScreen'
import ChatItemScreen from '@screens/Chat/ChatItemScreen'
import {ETASearchBar} from '@etaui'

const HeaderLeft = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	z-index: 100;
	width: 10px;
	margin-left: 15px;
`
const HeaderRight = styled.View`
	flex-direction: row;
	margin-right: 15px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
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
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	z-index: 100;
	width: 10px
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: #e4e6eb;
	width: 35px;
	height: 35px;
	border-radius: 35px;
	margin-horizontal: 5px;
	margin-right: 15px;
`

const ChatStack = createStackNavigator()
const ChatNavigator = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<ChatStack.Navigator
			screenOptions={{
				headerTransparent: !true,
				headerShown: !true,
				headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
				headerStyle: {
					backgroundColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
					shadowColor: 'black',
					shadowOpacity: 0,
					shadowOffset: {height: 0.2},
					shadowRadius: 5,
					elevation: 5,
				},
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}>
			<ChatStack.Screen
				name='ChatScreen'
				component={ChatScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: !true,
					// headerLeft: () => (
					// 	<Header>
					// 		<ETASimpleText
					// 			size={22}
					// 			weight={
					// 				Platform.OS === 'ios'
					// 					? 'bold'
					// 					: 'bold'
					// 			}
					// 			color={
					// 				themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					// 			}
					// 			align='left'>
					// 			Chat room
					// 		</ETASimpleText>
					// 	</Header>
					// ),
					// headerRight: () => (
					// 	<IconButton
					// 		activeOpacity={1}
					// 		underlayColor='#ccd0d5'>
					// 		<FontAwesome
					// 			name='search'
					// 			size={18}
					// 			color='#000'
					// 		/>
					// 	</IconButton>
					// ),
					header: () =>  <ETASearchBar leftContent='Chat room' leftContentColor={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} placeholderText='Search a chat' />,
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
					elevation: 5,
				},
				headerTitleStyle: {
					fontWeight: 'bold',
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
						<Touchable>
							<HeaderRight>
								<Feather
									name='more-vertical'
									size={20}
									color={
										themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
									}
								/>
							</HeaderRight>
						</Touchable>
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

export {ChatNavigator, ChatItemNavigator}
