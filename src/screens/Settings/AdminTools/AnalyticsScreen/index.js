import React from 'react'
import styled from 'styled-components/native'
import AnalyticsComponent from '@components/Settings/AdminToolsComponent/AnalyticsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const AnalyticsScreen = () => (
	<Root>
		<AnalyticsComponent />
	</Root>
)

export default AnalyticsScreen
