import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Easing} from 'react-native'
import {
	createStackNavigator,
	// TransitionPresets,
	// CardStyleInterpolators,
} from '@react-navigation/stack'
import {FontAwesome} from '@icons'
import AuthScreen from '@screens/Auth/AuthScreen'
import ForgetPasswordScreen from '@screens/Auth/ForgetPasswordScreen'
import SignupScreen from '@screens/Auth/SignupScreen'

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

const Touchable = styled.TouchableOpacity`
	margin-left: 10px;
`

/** Auth screens - No logged */
const SigninStack = createStackNavigator()
const SigninStackScreen = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<SigninStack.Navigator
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
			<SigninStack.Screen
				name='AuthScreen'
				component={AuthScreen}
				options={{
					title: 'AuthScreen',
					headerShown: !true,
					headerTransparent: true,
					// animationTypeForReplace: 'push'
				}}
			/>

			<SigninStack.Screen
				name='SignupScreen'
				component={SignupScreen}
				options={({navigation, route}) => ({
					title: 'New account',
					headerShown: true,
					headerLeft: () => (
						<Touchable onPress={navigation.goBack}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_BACKGROUND_COLOR
								}
							/>
						</Touchable>
					),
					headerTransparent: true,
					// animationTypeForReplace: 'push'
				})}
			/>

			<SigninStack.Screen
				name='ForgetPasswordScreen'
				component={ForgetPasswordScreen}
				options={({navigation, route}) => ({
					title: 'Forget Password',
					headerShown: true,
					headerLeft: () => (
						<Touchable onPress={navigation.goBack}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_BACKGROUND_COLOR
								}
							/>
						</Touchable>
					),
					headerTransparent: true,
					// animationTypeForReplace: 'push'
				})}
			/>
		</SigninStack.Navigator>
	)
}
/** /Auth screens - No logged */

export default SigninStackScreen
