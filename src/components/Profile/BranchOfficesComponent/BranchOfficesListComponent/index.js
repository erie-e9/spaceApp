import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import Card from './Card'
import {connect} from 'react-redux'
import {GET_ALL_ITEMS_REQUEST} from '@redux/profile/branchoffices/actions'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const BranchOfficesList = styled.FlatList`
	flex-direction: column;
	padding: 10px 10px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})``

const mapStateToProps = (state, props) => {
	const {data} = state.branchoffices
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getAllItemsRequest: () => {
		dispatch({
			type: GET_ALL_ITEMS_REQUEST,
		})
	},
})

const BranchOfficesListComponent = ({getAllItemsRequest, data}) => {
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
			screen: 'MapBranchOfficesScreen',
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
			<BranchOfficesList
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

const BranchOfficesListComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(BranchOfficesListComponent)
export default BranchOfficesListComponentConnect
