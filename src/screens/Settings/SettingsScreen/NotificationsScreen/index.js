import React from 'react'
import styled from 'styled-components/native'
import NotificationsSettingsComponent from '@components/Settings/SettingsComponents/NotificationsSettingsComponent'

const Root = styled.View`
	flex: 1;
`

const NotificationsScreen = () => (
	<Root>
		<NotificationsSettingsComponent />
	</Root>
)

export default NotificationsScreen
