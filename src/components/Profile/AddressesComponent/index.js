import React from 'react'
import styled from 'styled-components/native'
import HeadAddressesComponent from './HeadAddressesComponent'
import SubHeadAddressesComponent from './SubHeadAddressesComponent'
import AddressesListComponent from './AddressesListComponent'

const Root = styled.View`
	flex: 1;
	width: 100%;
	flex-direction: column;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const AddressesComponent = () => (
	<Root>
		<HeadAddressesComponent />
		<SubHeadAddressesComponent />
		<AddressesListComponent />
	</Root>
)

export default AddressesComponent
