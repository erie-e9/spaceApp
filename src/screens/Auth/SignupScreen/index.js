import React from 'react'
import { Platform, Dimensions} from 'react-native'
import styled from 'styled-components/native'
import SignupForm from '@components/Auth/Signup/SignupForm'

const {width} = Dimensions.get('window')
const Root = styled.View`
	flex: 1;
	justify-content: center;
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
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

const SignupScreen = () => (
	<Root>
		<SignupForm />
		
		{/* <SignupContainer>
			<Card>
				<SignupForm />
			</Card>
		</SignupContainer> */}
	</Root>
)

export default SignupScreen
