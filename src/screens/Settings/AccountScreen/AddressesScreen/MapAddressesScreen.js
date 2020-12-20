import React from 'react'
import styled from 'styled-components/native'
import MapAddressesComponent from '@components/Settings/AccountComponent/AddressesComponent/MapAddressesComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const MapAddresses = () => (
	<Root>
		<MapAddressesComponent />
	</Root>
)

export default MapAddresses
