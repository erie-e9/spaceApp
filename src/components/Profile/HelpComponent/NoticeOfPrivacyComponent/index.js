import React from 'react'
import styled from 'styled-components/native'
import HeadNoticeOfPrivacyComponent from './HeadNoticeOfPrivacyComponent'
import SubHeadNoticeOfPrivacyComponent from './SubHeadNoticeOfPrivacyComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`

const NoticeOfPrivacyComponent = () => (
	<Root>
		<HeadNoticeOfPrivacyComponent />
		<SubHeadNoticeOfPrivacyComponent />
	</Root>
)

export default NoticeOfPrivacyComponent
