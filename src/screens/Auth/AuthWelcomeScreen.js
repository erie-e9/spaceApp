import React from 'react'
import styled from 'styled-components/native'
import AuthWelcomeComponent from '@components/Auth/AuthWelcome'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`

const AuthWelcomeScreen = () => (
	<Root>
		<AuthWelcomeComponent />
	</Root>
)

export default AuthWelcomeScreen
