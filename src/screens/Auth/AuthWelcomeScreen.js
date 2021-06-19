import React from 'react'
import styled from 'styled-components/native'
import AuthWelcomeComponent from '@components/Auth/AuthWelcome'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const AuthWelcomeScreen = () => (
	<Root>
		<AuthWelcomeComponent />
	</Root>
)

export default AuthWelcomeScreen
