import React from 'react'
import styled from 'styled-components/native'
import MenuSettingsComponent from '@components/Settings/MenuSettingsComponent'

const Root = styled.View`
	flex: 1;
	background-color: transparent;
`

const MenuSettingsScreen = () => (
	<Root>
		<MenuSettingsComponent />
	</Root>
)

export default MenuSettingsScreen
