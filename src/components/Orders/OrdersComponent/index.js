import React from 'react'
import {FlatList} from 'react-native'
import styled from 'styled-components/native'
import {ETACard} from '@etaui'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlot: {top: 50, bottom: 50, right: 50, left: 50}
})``

const OrdersComponent = ({data}) => {
	const _onPress = (item) => {
		console.warn(item)
	}

	return (
		<Root>
			<FlatList
				contentContainerStyle={{
					alignSelf: 'stretch',
				}}
				data={data.getOrders}
				keyExtractor={(item) => item._id.toString()}
				showsVerticalScrollIndicator={false}
				renderItem={({item}) => (
					<Touchable
						key={item._id}
						onPress={() => _onPress(item)}>
						<ETACard {...item} />
					</Touchable>
				)}
			/>
		</Root>
	)
}

export default OrdersComponent
