import React from 'react'
import styled from 'styled-components/native'
import OrdersProcessingComponent from '@components/Settings/AccountComponent/OrdersComponent/OrdersProcessingComponent'

const Root = styled.View`
	flex: 1;
`

const ProcessingOrdersScreen = () => (
	<Root>
		<OrdersProcessingComponent />
	</Root>
)

export default ProcessingOrdersScreen
