import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText, ETAAuthFingerprintScanner } from '@etaui'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '@etaui/translate'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
	const { forgotten_pass, log_in_company, login_fingerprint_text, fingerprint_message_subtitle, fingerprint_message_description, use_password, login_success, login_failed } = useTranslation()
	const navigation = useNavigation()
	const [ wasLoggedin, setwasLoggedin ] = useState(!false)
	
	useEffect(() => {
		let isUnMounted = false
		
		wasLoggedIn()
		return () => {
			isUnMounted = true
		}
	}, [])

	const wasLoggedIn = async () => {
		let userID = await AsyncStorage.getItem('@userID')
		console.log('[wasLoggedIn]: ', userID)
		if (userID !== undefined && userID !== null) {
			setwasLoggedin(userID)
		}
	}
	
	const _onShowForgetPasswordPress = () => {
		navigation.navigate('AuthNavigator', {
			screen: 'ForgetPasswordScreen'
		})
	}

	return (
		<Root>
			{wasLoggedin !== false
				?	<ETAAuthFingerprintScanner 
						logInCompany={log_in_company}
						loginFingerprintText={login_fingerprint_text}
						fingerprintMessageSubtitle={fingerprint_message_subtitle}
						fingerprintMessageDescription={fingerprint_message_description}
						fingerprintCancel={use_password}
						loginSuccess={login_success}
						loginFailed={login_failed}
					/>
				:	null
			}
			<ButtonForgetPassword
				onPress={() => _onShowForgetPasswordPress()}>
				<ETASimpleText
					size={13}
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
