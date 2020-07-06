import React from 'react'
import styled from 'styled-components/native'
import HeadAddressesComponent from './HeadAddressesComponent'
import SubHeadAddressesComponent from './SubHeadAddressesComponent'
import AddressesListComponent from './AddressesListComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`

const AddressesComponent = () => (
	<Root>
		<HeadAddressesComponent />
		<SubHeadAddressesComponent />
		<AddressesListComponent />
	</Root>
)

export default AddressesComponent
