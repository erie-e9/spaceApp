import React from 'react'
import styled from 'styled-components/native'
import FavoritesComponent from '@components/Profile/FavoritesComponent'

const Root = styled.View`
	flex: 1;
`

const FavoritesScreen = () => (
	<Root>
		<FavoritesComponent />
	</Root>
)

export default FavoritesScreen
