import React from 'react'
import styled from 'styled-components/native'
import ReportsComponent from '@components/Settings/AdminToolsComponent/ReportsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const ReportsScreen = () => (
	<Root>
		<ReportsComponent />
	</Root>
)

export default ReportsScreen
