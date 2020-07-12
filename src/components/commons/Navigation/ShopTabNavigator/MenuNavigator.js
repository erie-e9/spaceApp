import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack'
import {FontAwesome, Ionicons} from '@icons'
import {ETASimpleText, ETASearchBar} from '@etaui'
import {variables} from '@utils/constants'
import MenuScreen from '@screens/Menu/MenuScreen'
import CategoryListScreen from '@screens/Menu/Categories/CategoryListScreen'
import CategoryItemsScreen from '@screens/Menu/Categories/CategoryItemsScreen'
import PromotionScreen from '@screens/Menu/PromotionScreen'
import AllItemsScreen from '@screens/Menu/AllItemsScreen'
import GetOneItemScreen from '@screens/Menu/GetOneItemScreen'

const Header = styled.View`
	margin-left: 15px;
`
const HeaderLeft = styled.TouchableOpacity`
	margin-left: 15px;
`
const CircleContainer = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	height: 30px;
	width: 30px;
	border-radius: 15px;
	background-color: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const HeaderLeftCard = styled.TouchableOpacity`
	margin-left: 15px;
	margin-top: 25px;
	align-items: center;
	height: 30px;
	width: 30px;
	border-radius: 15px;
`

const MenuStack = createStackNavigator()
const MenuNavigator = () => {
	const themeContext = useContext(ThemeContext)
	return (
		<MenuStack.Navigator
			screenOptions={{
				headerTransparent: !true,
				headerShown: !true,
				headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
				headerStyle: {
					backgroundColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
					shadowColor: 'black',
					shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0,
					shadowOffset: {
						height: Platform.OS === 'ios' ? 0.1 : 0,
					},
					shadowRadius: 5,
					elevation: 5,
				},
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}>
			<MenuStack.Screen
				name='MenuScreen'
				component={MenuScreen}
				options={{
					headerTitle: '',
					headerShown: true,
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
								{variables.COMPANYNAME}
							</ETASimpleText>
						</Header>
					),
					headerRight: () => <ETASearchBar />,
					// header: () =>  <ETASearchBar />,
				}}
			/>

			<MenuStack.Screen
				name='CategoryListScreen'
				component={CategoryListScreen}
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
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

			<MenuStack.Screen
				name='CategoryItemsScreen'
				component={CategoryItemsScreen}
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
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

			<MenuStack.Screen
				name='PromotionScreen'
				component={PromotionScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor:
							themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
						shadowColor: 'black',
						shadowOpacity:
							Platform.OS === 'ios' ? 0.6 : 0.3,
						shadowOffset: {
							height:
								Platform.OS === 'ios'
									? 0.3
									: 0.2,
						},
						shadowRadius: 5,
						elevation: 5,
					},
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
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

			<MenuStack.Screen
				name='AllItemsScreen'
				component={AllItemsScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Products',
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
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
		</MenuStack.Navigator>
	)
}

const GetOneItemStack = createStackNavigator()
const GetOneItemNavigator = () => {
	const themeContext = useContext(ThemeContext)
	return (
		<GetOneItemStack.Navigator>
			<GetOneItemStack.Screen
				name='GetOneItemScreen'
				component={GetOneItemScreen}
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
						<HeaderLeftCard
							onPress={() => navigation.goBack()}>
							<CircleContainer>
								<Ionicons
									name='md-close'
									size={20}
									color={
										themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
									}
								/>
							</CircleContainer>
						</HeaderLeftCard>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forModalPresentationIOS,
				})}
			/>
		</GetOneItemStack.Navigator>
	)
}

export {MenuNavigator, GetOneItemNavigator}
