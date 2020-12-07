import React, {useState, useEffect, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import Card from './Card'
import {ETALoader} from '@etaui'
import {connect} from 'react-redux'
import {GET_DATA_REQUEST} from '@redux/profile/addresses/actions'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const AddressesList = styled.FlatList`
	flex-direction: column;
	padding: 10px 10px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})``

const mapStateToProps = (state, props) => {
	const {data} = state.addresses
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const AddressesListComponent = ({getDataRequest, data}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [items, setitems] = useState([])
	const [refresher, setrefresher] = useState(!true)

	useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		setitems(data)
		_getData()
		
		return () => {
			isUnMounted = true
		}
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
			{
				items.length !== 0
				?	<AddressesList
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
				:	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
			}
		</Root>
	)
}

const AddressesListConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(AddressesListComponent)

export default AddressesListConnect
