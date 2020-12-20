import React, {useLayoutEffect} from 'react'
import styled from 'styled-components/native'
import AllItemsComponent from '@components/Menu/AllItemsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const AllItemsScreen = ({ navigation, route }) => {
	const { name } = route?.params

	useLayoutEffect(() => {
		navigation.setOptions({headerTitle: name})
		console.log('AllItemsScreen params',  route)
	}, [navigation, route])

	return (
		<Root>
			<AllItemsComponent />
		</Root>
	)
}

export default AllItemsScreen
