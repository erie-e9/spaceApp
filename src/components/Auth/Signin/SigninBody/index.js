import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '@etaui/translate'

const Root = styled.View`
	flex: 0.5
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

const SignInBody = () => {
	const themeContext = useContext(ThemeContext)
	const { forgotten_pass, no_account } = useTranslation()
	const navigation = useNavigation()
	
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
					{forgotten_pass.charAt(0).toUpperCase() + forgotten_pass.slice(1)}
				</ETASimpleText>
			</ButtonForgetPassword>
		</Root>
	)
}

export default SignInBody
