import React from 'react'
import styled from 'styled-components/native'
import ThemeSettingsComponent from '@components/Settings/SettingsComponents/ThemeSettingsComponent'

const Root = styled.View`
	flex: 1;
`

const ThemeSettingsScreen = () => (
	<Root>
		<ThemeSettingsComponent />
	</Root>
)

export default ThemeSettingsScreen
