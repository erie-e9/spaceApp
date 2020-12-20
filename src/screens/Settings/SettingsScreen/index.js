import React from 'react'
import styled from 'styled-components/native'
import SettingsComponents from '@components/Settings/SettingsComponents'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const MenuSettingsScreen = () => (
	<Root>
		<SettingsComponents />
	</Root>
)

export default MenuSettingsScreen
