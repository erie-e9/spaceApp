import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, ActivityIndicator } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome } from '@icons'
import { fakeavatar, variables } from '@utils/constants'
import DynamicTabButton from './DynamicTabButton'
// import { eq, multiply, greaterThan, cond } from 'react-native-reanimated';
// import { withTransition } from 'react-native-redash';
import { MenuNavigator } from './MenuNavigator'
import { ChatNavigator } from './ChatNavigator'
import { CartNavigator } from './CartNavigator'
import { ProfileNavigator } from './SettingsNavigator'
import { WelcomeNavigator } from './AuthNavigator'
import BadgeCart from '../../badgeCounters/badgeCart'
import BadgeChat from '../../badgeCounters/badgeChat'
// import AnalyticsScreen from '@screens/AnalyticsScreen';
import { connect } from 'react-redux'
import { CHECK_TOKEN, GET_USER_DATA } from '@redux/user/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AvatarContainer = styled.View`
	justify-content: center;
	align-items: center;
`
const Avatar = styled.Image``

const mapStateToProps = (state, props) => {
	const { userToken, avatar } = state.user
	return { userToken, avatar }
}

const mapDispatchProps = (dispatch, props) => ({
	checkToken: () => {
		dispatch({
			type: CHECK_TOKEN,
			payload: {},
		})
	},

	getUserData: () => {
		dispatch({
			type: GET_USER_DATA,
			payload: {},
		})
	},
})

const NullComponent = () => (null)
const ShopTab = createBottomTabNavigator()
const ShopTabNavigator = ({ checkToken, userToken, getUserData, avatar }) => {
	const themeContext = useContext(ThemeContext)
	const [ token, settoken ] = useState(userToken)
	
	useEffect(() => {
		settoken(userToken)
	}, [])

	useEffect(() => {
		checkToken()
		if (userToken) {
			getUserData()
			let _token = AsyncStorage.getItem('@storage_key')
			if (_token) {
				settoken(_token)
			} else {
				settoken(undefined)
			}
		} else {
			settoken(undefined)
		}
		
	}, [userToken])

	return (
		<ShopTab.Navigator
			screenOptions={({route}) => ({
				tabBarIcon: ({focused, color, size}) => {
					let iconName
					// let active = new Value(0);
					// let transition = withTransition(active)

					// const isActive = eq(activeIcon, index);
					// const activeTransition = withTransition(isActive);
					// const width = multiply(activeTransition, size);
					// const isGoingLeft = greaterThan(transition, activeIcon)
					// const direction = cond(
					//   isActive,
					//   cond(isGoingLeft, 'rtl', 'ltr'),
					//   cond(isGoingLeft, 'ltr', 'rtl'),
					// );

					// const _activedIcon = (item) => {
					//   console.warn(item);
					// }

					if (route.name === 'Analytics') {
						iconName = focused
							? 'ios-analytics'
							: 'ios-analytics'
					} else if (route.name === 'Menu') {
						iconName = focused ? 'apps' : 'apps'
						// return (
						//   <Animated.View style={{ direction }} >
						//     <View style={StyleSheet.absoluteFill}>
						//       <IcecreamIcon focused={focused} color={focused ? themeContext.PRIMARY_COLOR : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={size} />
						//     </View>
						//     <Animated.View style={{ overflow: 'hidden', width }}>
						//       {
						//         cloneElement(<IcecreamIcon focused={focused} color={focused ? themeContext.PRIMARY_COLOR : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={size} />,
						//         { active: true })
						//       }
						//     </Animated.View>
						//   </Animated.View>
						// )
					} else if (route.name === 'Orders') {
						return (
							<Ionicons
								name={
									focused
										? 'ios-add-circle'
										: 'ios-add-circle'
								}
								size={size + 4}
								color={color}
							/>
						)
					} else if (route.name === 'Chats') {
						return (
							<BadgeChat
								size={size + 1}
							>
								<Ionicons
									name={
										focused
											? 'ios-chatbubbles'
											: 'ios-chatbubbles'
									}
									size={size - 2}
									color={color}
								/>
							</BadgeChat>
						)
					} else if (route.name === 'ItemGenerator') {
						return (
							<DynamicTabButton
								focused={focused}
								size={Platform.OS === 'ios' ? size - 3 : size}
								onPress={() => null}
							/>
						)
					} else if (route.name === 'Cart') {
						return (
							<BadgeCart
								size={size + 1}
							>
								<Ionicons 
									name={
										focused
											? 'ios-cart'
											: 'ios-cart'
									} 
									size={size + 1} 
									color={color} />
							</BadgeCart>
						)
					} else if (route.name === 'Favs') {
						return (
							<Ionicons
								name={
									focused
										? 'ios-heart'
										: 'ios-heart'
								}
								size={size}
								color={color}
							/>
						)
					} else if (route.name === 'Profile') {
						return (
							<AvatarContainer
								style={{
									height: size + 3,
									width: size + 3,
									borderRadius: (size + 3) / 2,
									borderWidth: 1.2,
									padding: 2,
									borderColor: themeContext.ACTIVE,
									backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
								}}>
								{
									avatar !== undefined
									?	<Avatar
											style={{
												height: size - 3,
												width: size - 3,
												borderRadius: (size - 3) / 2,
											}}
											source={{
												uri:
													avatar ||
													variables.AVATAR_USER_DEFAULT,
											}}
										/>
									:	<ActivityIndicator size='small' color={themeContext.PRIMARY_TEXT_COLOR} />
								}
							</AvatarContainer>
						)
					} else if (route.name === 'Auth') {
						return (
							<FontAwesome	
								name='user-circle-o'
								size={size - 3}
								color={color}
							/>
						)
					}

					return (
						<Ionicons
							name={iconName}
							size={size - 3}
							color={color}
						/>
					)
				},
			})}
			tabBarOptions={{
				showLabel: !true,
				activeTintColor: themeContext.PRIMARY_COLOR,
				// activeTintColor: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
				inactiveTintColor:
					themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
				style: {
					borderTopColor: 'transparent',
					backgroundColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
						
				},
			}}>
			<ShopTab.Screen name='Menu' component={MenuNavigator} />
			<ShopTab.Screen name='Chats' component={ChatNavigator} 
			/>
			<ShopTab.Screen name='ItemGenerator' component={NullComponent} />
			<ShopTab.Screen name='Cart' component={CartNavigator} />
			{/* <ShopTab.Screen name='Auth' component={SwitchAuth} /> */}
			{token == undefined && token == null ? (
				<ShopTab.Screen name='Auth' component={WelcomeNavigator} />
			) : (
				<ShopTab.Screen name='Profile' component={ProfileNavigator} />
			)}
		</ShopTab.Navigator>
	)
}

const ShopTabNavigatorConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(ShopTabNavigator)

export default ShopTabNavigatorConnect
