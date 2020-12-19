import React from 'react'
import styled from 'styled-components/native'
import AdminToolsComponent from '@components/Settings/AdminToolsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const AdminToolsScreen = () => (
	<Root>
		<AdminToolsComponent />
	</Root>
)

export default AdminToolsScreen
