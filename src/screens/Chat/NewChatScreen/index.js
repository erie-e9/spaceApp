import React from 'react'
import styled from 'styled-components/native'
import NewChatComponent from '@components/Chat/NewChatComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const NewChatScreen = () => (
	<Root>
		<NewChatComponent />
	</Root>
)

export default NewChatScreen
