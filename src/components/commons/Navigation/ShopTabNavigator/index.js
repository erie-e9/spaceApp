import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform, View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import {Ionicons} from '@icons'
import {fakeavatar, variables} from '@utils/constants'
import DynamicTabButton from './DynamicTabButton'
// import {eq, multiply, greaterThan, cond} from 'react-native-reanimated';
// import {withTransition} from 'react-native-redash';
import {MenuNavigator, GetOneItemNavigator, CustomProductNavigator} from './MenuNavigator'
import {ChatNavigator, ChatItemNavigator} from './ChatNavigator'
import CartNavigator from './CartNavigator'
import {ProfileNavigator, SettingsNavigator} from './ProfileNavigator'
import IconWithBadge from './IconBadge'
// import AnalyticsScreen from '@screens/AnalyticsScreen';

const AvatarContainer = styled.View`
	justify-content: center;
	align-items: center;
`
const Avatar = styled.Image``

const NullComponent = () => (null)

const ShopTab = createBottomTabNavigator()
const ShopTabNavigator = () => {
	const themeContext = useContext(ThemeContext)

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
							<Ionicons
								name={
									focused
										? 'ios-chatbubbles'
										: 'ios-chatbubbles'
								}
								size={size - 2}
								color={color}
							/>
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
							<IconWithBadge
								badgeCount={1}
								name={
									focused
										? 'ios-cart'
										: 'ios-cart'
								}
								size={size + 1}
								color={color}
							/>
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
									height: size + 1.5,
									width: size + 1.5,
									borderRadius: size / 2,
									backgroundColor: color,
									padding: 2,
								}}>
								<Avatar
									style={{
										height: size,
										width: size,
										borderRadius:
											size / 2,
									}}
									source={{
										uri:
											fakeavatar ||
											variables.AVATAR_USER_DEFAULT,
									}}
								/>
							</AvatarContainer>
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
				// style: () => {
				// 	if (route.name === 'Chats') {
				// 		return {
				// 			backgroundColor: 'red',
				// 			// width: 'auto'
				// 		}
				// 	}
				// }
			}}>
			{/* <ShopTab.Screen name='Analytics' component={AnalyticsScreen} /> */}
			<ShopTab.Screen name='Menu' component={MenuNavigator} />
			{/* <ShopTab.Screen name='Orders' component={OrdersScreen} /> */}
			<ShopTab.Screen name='Chats' component={ChatNavigator} 
			// tabBarOptions={{ style: { backgroundColor: 'red' } }}
			/>
			<ShopTab.Screen name='ItemGenerator' component={NullComponent} />
			<ShopTab.Screen name='Cart' component={CartNavigator} />
			{/* <ShopTab.Screen name='Favs' component={FavsScreen} /> */}
			<ShopTab.Screen name='Profile' component={ProfileNavigator} />
		</ShopTab.Navigator>
	)
}
/** /App user logged */

const Stack = createStackNavigator()
const ShopNavigator = () => (
	<Stack.Navigator
		screenOptions={{
			headerTransparent: !true,
			headerShown: !true,
		}}>
		<Stack.Screen
			name='ShopTabNavigator'
			component={ShopTabNavigator}
		/>
		<Stack.Screen
			name='GetOneItemNavigator'
			component={GetOneItemNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forModalPresentationIOS,
			}}
		/>
		<Stack.Screen
			name='CustomProductNavigator'
			component={CustomProductNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forModalPresentationIOS,
			}}
		/>
		<Stack.Screen
			name='ChatItemNavigator'
			component={ChatItemNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forHorizontalIOS,
			}}
		/>
		<Stack.Screen
			name='SettingsNavigator'
			component={SettingsNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forHorizontalIOS,
			}}
		/>
	</Stack.Navigator>
)

export default ShopNavigator
