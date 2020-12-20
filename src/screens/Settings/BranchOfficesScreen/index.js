import React from 'react'
import styled from 'styled-components/native'
import BranchOfficesComponent from '@components/Settings/BranchOfficesComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const BranchOfficesScreen = () => (
	<Root>
		<BranchOfficesComponent />
	</Root>
)

export default BranchOfficesScreen
