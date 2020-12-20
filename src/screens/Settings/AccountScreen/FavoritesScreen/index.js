import React from 'react'
import styled from 'styled-components/native'
import FavoritesComponent from '@components/Settings/AccountComponent/FavoritesComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const FavoritesScreen = () => (
	<Root>
		<FavoritesComponent />
	</Root>
)

export default FavoritesScreen
