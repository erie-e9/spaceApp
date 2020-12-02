import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack'
import { Ionicons, FontAwesome } from '@icons'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'
import CartScreen from '@screens/Cart/CartScreen'
import PaymentScreen from '@screens/Cart/PaymentScreen'
import IconWithBadge from './IconBadge'

const Header = styled.View`
	margin-left: 15px;
`
const IconRightContainer = styled.View`
	flex-direction: row;
	align-items: center;
	margin-right: 15px;
	background-color: transparent;
`
const OrdersContainer = styled.View`
	border-width: 0.9px;
	border-radius: 5px;
	padding: 3px 5px;
	margin-left: 5px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: transparent;
`
const Orders = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 5, bottom: 0, right: 0, left: 0}
})`
	z-index: 100;
	margin: 0px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	z-index: 100;
	margin: 0px 5px 0px 15px;
`

const CartStack = createStackNavigator()
const CartNavigator = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<CartStack.Navigator
			screenOptions={{
				headerTransparent: !true,
				headerShown: !true,
				headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
				headerStyle: {
					backgroundColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
					shadowColor: 'black',
					shadowOpacity: Platform.OS === 'ios' ? 0 : 0,
					shadowOffset: {
						height: Platform.OS === 'ios' ? 0.1 : 0,
					},
					shadowRadius: 5,
					elevation: 0,
				},
				headerTitleStyle: {
					// fontWeight: '400',
					color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
				},
			}}>
			<CartStack.Screen
				name='CartScreen'
				component={CartScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: !true,
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
								Cart
							</ETASimpleText>
						</Header>
					),
					headerRight: () => {
					    return (
					        <IconRightContainer>
								<Touchable
									onPress={() => navigation.navigate('SettingsNavigator', {
										screen: 'FavoritesScreen'
									})}>
									<Ionicons
										name='md-heart'
										size={20}
										color='#FF0000'
									/>
								</Touchable>
								<Orders
									onPress={() => navigation.navigate('SettingsNavigator', {
										screen: 'TopNavigatorOrders'
									})}>
									<>
									<IconWithBadge
										badgeCount={1}
										name='ios-cart'
										size={17 + 1}
										color={'white'}
									>

									<OrdersContainer>
										<ETASimpleText
											size={11}
											weight='400'
											color={
												themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											}
											align='left'>
											Orders
										</ETASimpleText>
									</OrdersContainer>
									</IconWithBadge>
									</>
								</Orders>
					        </IconRightContainer>
					    )
					},
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
		</CartStack.Navigator>
	)
}

const CheckoutStack = createStackNavigator()
const CheckoutNavigator = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<CheckoutStack.Navigator
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
					fontWeight: 'bold',
				},
			}}>
			<CheckoutStack.Screen
				name='PaymentScreen'
				component={PaymentScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Checkout',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '500',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
					},
					headerLeft: () => (
						<Touchable onPress={navigation.goBack}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</Touchable>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
		</CheckoutStack.Navigator>
	)
}

export {CartNavigator, CheckoutNavigator}
