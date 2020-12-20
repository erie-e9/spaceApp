import React from 'react'
import styled from 'styled-components/native'
import ChatsSettingsComponent from '@components/Settings/SettingsComponents/ChatsSettingsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const ChatsSettingsScreen = () => (
	<Root>
		<ChatsSettingsComponent />
	</Root>
)

export default ChatsSettingsScreen
