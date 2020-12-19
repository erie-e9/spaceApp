import React from 'react'
import styled from 'styled-components/native'
import ManageProductsComponent from '@components/Settings/AdminToolsComponent/ManageProductsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const ManageProductsScreen = () => (
	<Root>
		<ManageProductsComponent />
	</Root>
)

export default ManageProductsScreen
