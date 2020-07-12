import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import Card from './Card'
import { connect } from 'react-redux'
import { GET_ALL_ITEMS_REQUEST } from '@redux/profile/addresses/actions'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`
const AddressesList = styled.FlatList`
	flex-direction: column;
	padding: 10px 10px;
`
const Touchable = styled.TouchableOpacity``

const mapStateToProps = (state, props) => {
	const { data } = state.addresses
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getAllItemsRequest: () => {
		dispatch({
			type: GET_ALL_ITEMS_REQUEST
		})
	}
})

const AddressesListComponent = ({getAllItemsRequest, data}) => {
	const navigation = useNavigation()
	const [items, setitems] = useState([])
	const [refresher, setrefresher] = useState(!true)

	useEffect(() => {
		getAllItemsRequest()
		setitems(data)
		_getData()
	}, [data])

	const _onPress = (item) => {
		navigation.navigate('SettingsNavigator', {
			screen: 'MapAddressesScreen',
			params: {
				data: item,
			},
		})
	}

	const _getData = () => {
		setrefresher(true)
		setitems(data)
		setrefresher(!true)
	}

	return (
		<Root>
			<AddressesList
				contentContainerStyle={{
					alignSelf: 'stretch',
				}}
				data={items}
				keyExtractor={(item) => item._id.toString()}
				showsVerticalScrollIndicator={false}
				refreshing={refresher}
				onRefresh={() => _getData()}
				renderItem={({item}) => (
					<Touchable
						key={item._id}
						onPress={() => _onPress(item)}>
						<Card {...item} />
					</Touchable>
				)}
			/>
		</Root>
	)
}

const AddressesListConnect = connect(
	mapStateToProps,
	mapDispatchProps
)(AddressesListComponent)

export default AddressesListConnect
