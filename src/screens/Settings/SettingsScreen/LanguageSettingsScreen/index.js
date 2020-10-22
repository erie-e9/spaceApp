import React from 'react'
import styled from 'styled-components/native'
import LanguageSettingsComponent from '@components/Settings/SettingsComponents/LanguageSettingsComponent'

const Root = styled.View`
	flex: 1;
`

const LanguageSettingsScreen = () => (
	<Root>
		<LanguageSettingsComponent />
	</Root>
)

export default LanguageSettingsScreen
