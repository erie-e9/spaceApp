import React, { useLayoutEffect } from 'react'
import styled from 'styled-components/native'
import ItemsComponent from '@components/Menu/ItemsComponent'

const Root = styled.View`
	flex: 1;
`

const ItemsScreen = ({ navigation, route }) => {
	const { name } = route?.params

	useLayoutEffect(() => {
		navigation.setOptions({headerTitle: name})
	}, [navigation, route])

	return (
		<Root>
			<ItemsComponent />
		</Root>
	)
}

export default ItemsScreen
