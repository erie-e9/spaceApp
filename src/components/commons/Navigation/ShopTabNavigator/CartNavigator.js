import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Ionicons} from '@icons'
import {Platform} from 'react-native'
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack'
import CartScreen from '@screens/Cart/CartScreen'
import {ETASimpleText} from '@etaui'

const Header = styled.View`
	margin-left: 15px;
`
const IconsRightContainer = styled.View`
	flex-direction: row;
	align-items: center;
	margin-right: 15px;
`
const LastOrderButtonContainer = styled.View`
	background-color: transparent;
	border-width: 0.9px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	border-radius: 5px;
	padding: 3px 5px;
`
const LastOrderButton = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 5, bottom: 0, right: 0, left: 0}
})`
	z-index: 100;
	margin: 0px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	z-index: 100;
	margin: 0px 5px 0px 0px;
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
					shadowOpacity: 0,
					shadowOffset: {height: 0.2},
					shadowRadius: 5,
					elevation: 0,
				},
				headerTitleStyle: {
					fontWeight: 'bold',
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
					        <IconsRightContainer>
								<Touchable
									onPress={() => navigation.navigate('SettingsNavigator', {
										screen: 'FavoritesScreen'
									})}>
									<Ionicons
										name='md-heart'
										size={20}
										color={themeContext.PRIMARY_COLOR}
									/>
								</Touchable>
								<LastOrderButton
									onPress={() => navigation.navigate('SettingsNavigator', {
										screen: 'PreviousOrdersScreen'
									})}>
									<LastOrderButtonContainer>
										<ETASimpleText
											size={11}
											weight='400'
											color={
												themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											}
											align='left'>
											Previous orders
										</ETASimpleText>
									</LastOrderButtonContainer>
								</LastOrderButton>
					        </IconsRightContainer>
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

export default CartNavigator
