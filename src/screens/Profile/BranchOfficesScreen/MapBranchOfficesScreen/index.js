import React from 'react'
import styled from 'styled-components/native'
import MapBranchOfficeComponent from '@components/Profile/BranchOfficesComponent/MapBranchOfficeComponent'

const Root = styled.View`
	flex: 1;
`

const BranchOfficesScreen = () => (
	<Root>
		<MapBranchOfficeComponent />
	</Root>
)

export default BranchOfficesScreen
