import React from 'react'
import styled from 'styled-components/native'
import ManageAccountsComponent from '@components/Settings/AdminToolsComponent/ManageAccountsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const ManageAccountsScreen = () => (
	<Root>
		<ManageAccountsComponent />
	</Root>
)

export default ManageAccountsScreen
