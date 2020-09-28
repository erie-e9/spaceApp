import React from 'react'
import styled from 'styled-components/native'
import NewChatComponent from '@components/Chat/NewChatComponent'

const Root = styled.View`
	flex: 1;
	background-color: transparent;
`

const NewChatScreen = () => (
	<Root>
		<NewChatComponent />
	</Root>
)

export default NewChatScreen
