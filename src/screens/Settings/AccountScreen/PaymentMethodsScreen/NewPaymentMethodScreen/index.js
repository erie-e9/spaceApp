import React from 'react'
import styled from 'styled-components/native'
import NewPaymentMethodComponent from '@components/Settings/AccountComponent/PaymentMethodsComponent/NewPaymentMethodComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const NewPaymentMethodScreen = () => (
	<Root>
		<NewPaymentMethodComponent />
	</Root>
)

export default NewPaymentMethodScreen
