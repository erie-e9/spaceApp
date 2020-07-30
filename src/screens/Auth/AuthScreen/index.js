import React from 'react'
import {Keyboard, Platform, Dimensions} from 'react-native'
import styled from 'styled-components/native'
import SigninHead from '@components/Auth/Signin/SigninHead'
import SigninForm from '@components/Auth/Signin/SigninForm'
import SigninBody from '@components/Auth/Signin/SigninBody'

const {width} = Dimensions.get('window')
const KeyboardMisser = styled.TouchableWithoutFeedback``
const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR}
`
// const BackImage = styled.ImageBackground`
//   flex: 1;
//   resize-mode: cover;
//   justify-content: center;
//   z-index: 10;
// `;
const SigninContainer = styled.KeyboardAvoidingView.attrs({
	behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
	flex: 0.5;
	align-self: stretch;
	align-items: center;
	justify-content: center;
`
const Card = styled.View`
	flex: 0.3;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: ${width * 0.8}px;
	min-height: 250px;
	padding-vertical: 10px;
	margin-vertical: 5px;
	padding-horizontal: 20px;
	margin-horizontal: 10px;
	shadow-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
	shadow-offset: 0px 2px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	border-radius: 5px;
	border-width: 0px;
	border-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR}
`

const AuthScreen = ({navigation}) => (
	<KeyboardMisser onPress={() => Keyboard.dismiss()}>
		<Root>
			{/* <BackImage style={{width: null, height: null}}
                        source={require('@assets/background1.png')}> */}
			<SigninHead />
			<SigninContainer>
				<Card>
					<SigninForm />
					<SigninBody navigation={navigation} />
				</Card>
			</SigninContainer>
			{/* </BackImage> */}
		</Root>
	</KeyboardMisser>
)

export default AuthScreen
