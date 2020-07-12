import React from 'react'
import styled from 'styled-components/native'
import ChatComponent from '@components/Chat/ChatComponent'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

const ChatScreen = () => (
	<Root>
		<ChatComponent />
	</Root>
)

export default ChatScreen
