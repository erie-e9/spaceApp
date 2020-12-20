import React from 'react'
import styled from 'styled-components/native'
import PaymentMethodsComponent from '@components/Settings/AccountComponent/PaymentMethodsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const PaymentMethodsScreen = () => (
	<Root>
		<PaymentMethodsComponent />
	</Root>
)

export default PaymentMethodsScreen
