import React from 'react'
import styled from 'styled-components/native'
import NoticeOfPrivacyComponent from '@components/Settings/HelpComponent/NoticeOfPrivacyComponent'

const Root = styled.View`
	flex: 1;
`

const NoticeOfPrivacyScreen = () => (
	<Root>
		<NoticeOfPrivacyComponent />
	</Root>
)

export default NoticeOfPrivacyScreen
