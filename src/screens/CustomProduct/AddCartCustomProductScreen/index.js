import React from 'react'
import styled from 'styled-components/native'
import AddCartCustomProductComponent from '@components/CustomProduct/AddCartCustomProductComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const AddCartCustomProductScreen = () => (
	<Root>
		<AddCartCustomProductComponent />
	</Root>
)

export default AddCartCustomProductScreen
