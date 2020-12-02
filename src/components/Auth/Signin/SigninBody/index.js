import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'

const Root = styled.View`
	flex: 0.1;
	justify-content: center;
	margin-top: 14px;
	background-color: transparent
`
const ButtonForgetPassword = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	// hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	justify-content: center;
	align-items: center;
	z-index: 1;
`
const ButtonSignup = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	// hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	justify-content: center;
	align-items: center;
	z-index: 1;
	margin-bottom: 15px;
`

const SignInBody = ({navigation}) => {
	const themeContext = useContext(ThemeContext)
	const signup = 'Sign up'
	const dontaccount = 'Do not have an account? '
	const forgetpass = 'Did you forget your password? '
	
	const _onShowForgetPasswordPress = () => {
		navigation.navigate('AuthNavigator', {
			screen: 'ForgetPasswordScreen'
		})
	}
	
	return (
		<Root>
			<ButtonForgetPassword
				onPress={() => _onShowForgetPasswordPress()}>
				<ETASimpleText
					size={14}
					weight={Platform.OS === 'ios' ? '500' : '300'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'>
					{forgetpass}
				</ETASimpleText>
			</ButtonForgetPassword>

			{/* <ButtonSignup onPress={() => _onShowSignupPress()}>
				<ETASimpleText
					size={14}
					weight={Platform.OS === 'ios' ? '500' : '300'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'>
					{dontaccount}
					<ETASimpleText
						size={14}
						weight={
							Platform.OS === 'ios' ? '600' : '400'
						}
						color={themeContext.PRIMARY_COLOR}
						align='left'>
						{signup}
					</ETASimpleText>
				</ETASimpleText>
			</ButtonSignup> */}
		</Root>
	)
}

export default SignInBody
