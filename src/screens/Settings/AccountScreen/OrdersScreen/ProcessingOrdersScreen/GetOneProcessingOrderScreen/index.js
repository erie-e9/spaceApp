import React, {useLayoutEffect} from 'react'
import styled from 'styled-components/native'
import GetOneProcessingOrderComponent from '@components/Settings/AccountComponent/OrdersComponent/OrdersProcessingComponent/GetOneProcessingOrderComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const GetOneProcessingOrderScreen = ({navigation, route}) => {
	const {item} = route.params
	useLayoutEffect(() => {
		navigation.setOptions({headerTitle: `Order ${item._id}`})
	}, [navigation, route])

	return (
		<Root>
			<GetOneProcessingOrderComponent />
		</Root>
	)
}

export default GetOneProcessingOrderScreen
