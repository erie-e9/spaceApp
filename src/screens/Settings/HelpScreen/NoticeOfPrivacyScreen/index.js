import React from 'react'
import styled from 'styled-components/native'
import NoticeOfPrivacyComponent from '@components/Settings/HelpComponent/NoticeOfPrivacyComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const NoticeOfPrivacyScreen = () => (
	<Root>
		<NoticeOfPrivacyComponent />
	</Root>
)

export default NoticeOfPrivacyScreen
