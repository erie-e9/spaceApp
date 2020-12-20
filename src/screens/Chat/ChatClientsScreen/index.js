import React from 'react'
import styled from 'styled-components/native'
import ChatComponent from '@components/Chat/ChatClientsComponent'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const ChatScreen = () => (
	<Root>
		<ChatComponent />
	</Root>
)

export default ChatScreen
