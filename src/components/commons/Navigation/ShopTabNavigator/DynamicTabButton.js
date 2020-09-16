import React, {useContext, memo} from 'react'
import {Animated} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {
	Ionicons,
	MaterialCommunityIcons,
	SunIcon,
	IcecreamIcon,
	IcecreamIcon2,
	IcecreamIcon3,
} from '@icons'
import { TouchableHighlight } from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'

const ItemGeneratorContainer = styled.View`
	position: absolute;
	align-items: center;
`
const ItemGeneratorButton = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent',
	// hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	z-index: 2000;
`
const SecondaryButton = styled.View`
	justify-content: center;
	align-items: center;
	height: 30px;
	width: 30px;
	border-radius: 15px;
	position: absolute;
	top: -60px;
	shadow-color: black;
	shadow-radius: 5px;
	shadow-offset: 10px;
	shadow-opacity: 0;
	border-width: 0px;
	border-color: transparent;
	z-index: 2000;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
`
const SubItemGeneratorButton = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	z-index: 2000;
`

const DynamicTabButton = memo(({ focused, size, onPress }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const buttonSize = new Animated.Value(1)
	const mode = new Animated.Value(0)

	const _handlePress = () => {
		// console.warn('pressed');

		Animated.sequence([
			Animated.timing(buttonSize, {
				toValue: 0.85,
				useNativeDriver: true,
			}),
			Animated.timing(buttonSize, {
				toValue: 1,
				useNativeDriver: true,
			}),
		]).start()

		Animated.timing(mode, {
			toValue: mode._value === 0 ? 1 : 0,
			duration: 200,
			useNativeDriver: !true,
		}).start()
	}

	const SecondaryButton1X = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [-17, -60],
	})
	const SecondaryButton1Y = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [35, -11],
	})

	const SecondaryButton2X = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [-15, -15],
	})
	const SecondaryButton2Y = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [35, -35],
	})

	const SecondaryButton3X = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [-17, 30],
	})
	const SecondaryButton3Y = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [35, -11],
	})

	const hide = () => {
		_handlePress()
	}

	const _handlePressButton1 = () => {
		console.log('_handlePressButton1 pressed')
		navigation.navigate('CustomProductNavigator', {
			screen: 'CustomProductScreen',
			params: {
				itemTitle: 'propitem 1',
			},
		})
	}

	const _handlePressButton2 = () => {
		console.log('_handlePressButton2 pressed')
		navigation.navigate('CustomProductNavigator', {
			screen: 'CustomProductScreen',
			params: {
				itemTitle: 'propitem 2',
			},
		})
	}

	const _handlePressButton3 = () => {
		console.log('_handlePressButton3 pressed')
		navigation.navigate('CustomProductNavigator', {
			screen: 'CustomProductScreen',
			params: {
				itemTitle: 'propitem 3',
			},
		})
	}

	return (
		<ItemGeneratorContainer>
			<Animated.View
				style={{
					position: 'absolute',
					left: SecondaryButton1X,
					top: SecondaryButton1Y,
					zIndex: 1000,
				}}>
				<SecondaryButton 
					style={{}}
				>
					<TouchableHighlight
						underlayColor='transparent'
						style={{}}
						onPress={() => {
							_handlePressButton1();
							onPress();
							hide();
						}}>
						<>
						<Animated.View
							style={{
								transform: [
									{
										scale: buttonSize,
									},
								],
							}}>
							<MaterialCommunityIcons
								name='ice-cream'
								size={size - 7}
								color='white'
							/>
						</Animated.View>
						</>
					</TouchableHighlight>
				</SecondaryButton>
			</Animated.View>

			<Animated.View
				style={{
					position: 'absolute',
					left: SecondaryButton2X,
					top: SecondaryButton2Y,
					zIndex: 1000,
				}}>
				<SecondaryButton>
					<TouchableHighlight
						underlayColor='transparent'
						style={{}}
						onPress={() => {
							_handlePressButton2();
							onPress();
							hide();
						}}>
						<>
						<Animated.View
							style={{
								transform: [
									{
										scale: buttonSize,
									},
								],
							}}>
							<SunIcon
								focused={focused}
								color='white'
								size={size - 7}
							/>
						</Animated.View>
						</>
					</TouchableHighlight>
				</SecondaryButton>
			</Animated.View>

			<Animated.View
				style={{
					position: 'absolute',
					left: SecondaryButton3X,
					top: SecondaryButton3Y,
					zIndex: 1000,
				}}>
				<SecondaryButton>
					<TouchableHighlight
						underlayColor='transparent'
						style={{}}
						onPress={() => {
							_handlePressButton3();
							onPress();
							hide();
						}}>
						<>
						<Animated.View
							style={{
								
								transform: [
									{
										scale: buttonSize,
									},
								],
							}}
						/>
						<Ionicons
							name='md-heart'
							size={size - 7}
							color='white'
						/>
						</>
					</TouchableHighlight>
				</SecondaryButton>
			</Animated.View>

			<Animated.View
				style={{
					backgroundColor: '#262626',
					justifyContent: 'center',
					alignItems: 'center',
					height: 56,
					width: 56,
					borderRadius: 28,
					position: 'absolute',
					top: -35,
					borderWidth: 6,
					borderColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
					zIndex: 1000,
				}}>
				<ItemGeneratorButton
					onPress={() => {
						_handlePress()
						onPress()
					}}>
					<Animated.View
						style={{
							backgroundColor: '#181818',
							justifyContent: 'center',
							alignItems: 'center',
							height: 56,
							width: 56,
							borderRadius: 28,
							padding: 10,
							borderWidth: 7,
							borderColor:
								themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
							// transform: [
							// 	{
							// 		scale: buttonSize,
							// 	},
							// ],
							zIndex: 1000,
						}}>
						<Ionicons
							name='ios-ice-cream'
							size={size - 1}
							color='white'
						/>
					</Animated.View>
				</ItemGeneratorButton>
			</Animated.View>
		</ItemGeneratorContainer>
	)
})

export default DynamicTabButton
