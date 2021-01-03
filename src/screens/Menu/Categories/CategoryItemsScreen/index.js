import React, {useLayoutEffect} from 'react'
import styled from 'styled-components/native'
import ItemsByCategoryComponent from '@components/Menu/CategoriesComponent/ItemsByCategoryComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const CategoryItemsScreen = ({navigation, route}) => {
	const { name } = route?.params.params

	useLayoutEffect(() => {
		navigation.setOptions({headerTitle: name})
	}, [navigation, route])

	return (
		<Root>
			<ItemsByCategoryComponent />
		</Root>
	)
}

export default CategoryItemsScreen
