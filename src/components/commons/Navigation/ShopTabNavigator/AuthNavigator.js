import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, Easing } from 'react-native'
import {
	createStackNavigator,
	// TransitionPresets,
	CardStyleInterpolators,
} from '@react-navigation/stack'
import { Ionicons } from '@icons'
import AuthWelcomeScreen from '@screens/Auth/AuthWelcomeScreen'
import AuthScreen from '@screens/Auth/AuthScreen'
import SignupScreen from '@screens/Auth/SignupScreen'
import ForgetPasswordScreen from '@screens/Auth/ForgetPasswordScreen'

const config = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 150,
		mass: 3,
		overshootClamping: !true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
}

const configClose = {
	animation: 'timing',
	config: {
		duration: 250,
		easing: Easing.linear,
	},
}

const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	margin-left: ${Platform.OS === 'ios' ? 25 : 15}px;
`
const HeaderLeftCard = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 5, bottom: 5, right: 5, left: 5}
})`
	height: 25px;
	width: 25px;
	z-index: 100;
	justify-content: center;
	align-items: center;
	margin-left: 15px;
	margin-top: 25px;
	border-radius: 15px;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

/** Auth screens - No logged */
const WelcomeStack = createStackNavigator()
const WelcomeNavigator = () => {
	
	return (
		<WelcomeStack.Navigator
			mode='modal'
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: 'horizontal',
				headerTitleAlign: 'center',
				headerShown: true,
				headerTransparent: true,
				// headerRight: () => {
				//   return <Text>Ewe</Text>
				// },
				// transition way 1
				// cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
				// transition way 2
				transitionSpec: {
					open: config,
					close: configClose,
				},
				// transition way 3
				// ...TransitionPresets.FadeFromBottomAndroid
				// headerStyle: { background-color: 'tomato' },
			}}>
				
			<WelcomeStack.Screen
				name='AuthWelcomeScreen'
				component={AuthWelcomeScreen}
				options={({ navigation, route }) => ({
					title: 'Welcome',
					headerShown: !true,
					headerTransparent: true,
					cardStyleInterpolator:
						CardStyleInterpolators.forModalPresentationIOS,
				})}
			/>
			
		</WelcomeStack.Navigator>
	)
}

const AuthStack = createStackNavigator()
const AuthNavigator = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<AuthStack.Navigator
			// initialRouteName='Home'
			mode='modal'
			// headerMode='none'
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: 'horizontal',
				headerTitleAlign: 'center',
				headerShown: true,
				headerTransparent: true,
				// headerRight: () => {
				//   return <Text>Ewe</Text>
				// },
				// transition way 1
				// cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
				// transition way 2
				transitionSpec: {
					open: config,
					close: configClose,
				},
				// transition way 3
				// ...TransitionPresets.FadeFromBottomAndroid
				// headerStyle: { background-color: 'tomato' },
			}}>
			
			<AuthStack.Screen
				name='AuthScreen'
				component={AuthScreen}
				options={({navigation, route}) => ({
					title: '',
					headerShown: true,
					headerLeft: () => (
						<HeaderLeftCard
							onPress={() => navigation.goBack()}>
							<Ionicons
								name='md-close'
								size={18}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeftCard>
					),
					headerTransparent: true,
					cardStyleInterpolator:
						CardStyleInterpolators.forModalPresentationIOS,
				})}
			/>

			<AuthStack.Screen
				name='SignupScreen'
				component={SignupScreen}
				options={({navigation, route}) => ({
					title: '',
					headerShown: true,
					headerLeft: () => (
						<HeaderLeftCard
							onPress={() => navigation.goBack()}>
							<Ionicons
								name='md-close'
								size={18}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeftCard>
					),
					headerTransparent: true,
					cardStyleInterpolator:
						CardStyleInterpolators.forModalPresentationIOS,
				})}
			/>

			<AuthStack.Screen
				name='ForgetPasswordScreen'
				component={ForgetPasswordScreen}
				options={({navigation, route}) => ({
					title: '',
					headerShown: true,
					headerTransparent: true,
					headerLeft: () => (
						<HeaderLeftCard
							onPress={() => navigation.goBack()}>
							<Ionicons
								name='md-close'
								size={18}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeftCard>
					),
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

		</AuthStack.Navigator>
	)
}

export { WelcomeNavigator, AuthNavigator }
