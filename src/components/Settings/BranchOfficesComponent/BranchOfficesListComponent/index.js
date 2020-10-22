import React, {useState, useEffect, useContext} from 'react'
import styled, {ThemeContext}from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import Card from './Card'
import {ETALoader} from '@etaui'
import {connect} from 'react-redux'
import {GET_DATA_REQUEST} from '@redux/profile/branchoffices/actions'

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
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const BranchOfficesListComponent = ({getDataRequest, data}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [items, setitems] = useState([])
	const [refresher, setrefresher] = useState(!true)

	useEffect(() => {
		getDataRequest()
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
			{
				items.length !== 0
				?	<BranchOfficesList
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

const BranchOfficesListComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(BranchOfficesListComponent)
export default BranchOfficesListComponentConnect
