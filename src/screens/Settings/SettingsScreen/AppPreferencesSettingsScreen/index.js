import React from 'react'
import styled from 'styled-components/native'
import AppPreferencesSettingsComponent from '@components/Settings/SettingsComponents/AppPreferencesSettingsComponent'

const Root = styled.View`
	flex: 1;
`

const AppPreferencesSettingsScreen = () => (
	<Root>
		<AppPreferencesSettingsComponent />
	</Root>
)

export default AppPreferencesSettingsScreen
