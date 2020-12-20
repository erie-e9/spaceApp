import React from 'react'
import styled from 'styled-components/native'
import MenuSettingsComponent from '@components/Settings/MenuSettingsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const MenuSettingsScreen = () => (
	<Root>
		<MenuSettingsComponent />
	</Root>
)

export default MenuSettingsScreen
