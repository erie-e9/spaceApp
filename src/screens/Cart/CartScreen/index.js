import React from 'react'
import styled from 'styled-components/native'
import CartListComponent from '@components/Cart/CartListComponent'
import CartDetailsComponent from '@components/Cart/CartDetailsComponent'

const Root = styled.View`
	flex: 1;
	background-color: transparent;
`

const CartScreen = () => (
	<Root>
		<CartListComponent />
		<CartDetailsComponent />
	</Root>
)

export default CartScreen
