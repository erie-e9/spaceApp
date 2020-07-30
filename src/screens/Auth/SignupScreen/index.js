import React from 'react'
import {Keyboard, Platform, Dimensions} from 'react-native'
import styled from 'styled-components/native'
import SignupForm from '@components/Auth/Signup/SignupForm'

const {width} = Dimensions.get('window')
const KeyboardMisser = styled.TouchableWithoutFeedback``
const Root = styled.View`
	flex: 1;
	justify-content: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR}
`
// const BackImage = styled.ImageBackground`
//   flex: 1;
//   resize-mode: cover;
//   justify-content: center;
// `;
// const SignupContainer = styled.View`
const SignupContainer = styled.KeyboardAvoidingView.attrs({
	behavior: Platform.OS === 'ios' ? 'position' : 'height',
})`
	flex: 0.5;
	align-items: center;
	justify-content: center;
	z-index: 10;
`
const Card = styled.View`
	min-height: 400px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: ${width * 0.8}px;
	padding-horizontal: 20px;
	margin-horizontal: 20px;
	shadow-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
	shadow-offset: 0px 2px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	border-radius: 5px;
	border-width: 0px;
	border-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR}
`
// height: 300px;
// min-height: 240px;

const SignupScreen = ({navigation}) => (
	<KeyboardMisser onPress={() => Keyboard.dismiss()}>
		<Root>
			{/* <BackImage style={{width: null, height: null}}
                        source={require('@assets/background1.png')}> */}
			<SignupContainer>
				<Card>
					<SignupForm navigation={navigation} />
				</Card>
			</SignupContainer>
			{/* </BackImage> */}
		</Root>
	</KeyboardMisser>
)

export default SignupScreen
