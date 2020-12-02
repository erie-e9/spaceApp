import React from 'react'
import styled from 'styled-components/native'
import PreviousOrdersComponent from '@components/Settings/AccountComponent/OrdersComponent/PreviousOrdersComponent'

const Root = styled.View`
	flex: 1;
`

const PreviousOrdersScreen = () => (
	<Root>
		<PreviousOrdersComponent />
	</Root>
)

export default PreviousOrdersScreen
