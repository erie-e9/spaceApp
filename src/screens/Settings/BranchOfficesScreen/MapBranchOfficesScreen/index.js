import React from 'react'
import styled from 'styled-components/native'
import MapBranchOfficeComponent from '@components/Settings/BranchOfficesComponent/MapBranchOfficeComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const BranchOfficesScreen = () => (
	<Root>
		<MapBranchOfficeComponent />
	</Root>
)

export default BranchOfficesScreen
