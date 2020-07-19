import React, {useLayoutEffect} from 'react'
import styled from 'styled-components/native'
import CategoryListComponent from '@components/Menu/CategoriesComponent/CategoryListComponent'

const Root = styled.View`
	flex: 1;
`

const CategoryListScreen = ({navigation, route}) => {
	const {name} = route.params.params

	useLayoutEffect(() => {
		navigation.setOptions({headerTitle: name})
	}, [navigation, route])

	return (
		<Root>
			<CategoryListComponent />
		</Root>
	)
}

export default CategoryListScreen
