import React from 'react'
import styled from 'styled-components/native'
import PaymentComponent from '@components/Cart/Payment/PaymentComponent'

const Root = styled.View`
	flex: 1;
	background-color: transparent;
`

const PaymentScreen = () => (
	<Root>
		<PaymentComponent />
	</Root>
)

export default PaymentScreen
