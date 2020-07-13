import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import {FlatList} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import ChatCard from './ChatCard'
import {connect} from 'react-redux'
import {GET_ALL_ITEMS_REQUEST} from '@redux/chats/actions'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const Touchable = styled.TouchableOpacity``

const mapStateToProps = (state, props) => {
	const {data} = state.chats
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getAllItemsRequest: () => {
		dispatch({
			type: GET_ALL_ITEMS_REQUEST,
		})
	},
})

const ChatComponent = ({getAllItemsRequest, data}) => {
	const navigation = useNavigation()
	const [items, setitems] = useState([])
	const [refresher, setrefresher] = useState(!true)

	useEffect(() => {
		getAllItemsRequest()
		setitems(data)
		_getData()
	}, [data])

	const _onPress = (item) => {
		navigation.navigate('ChatItemNavigator', {
			screen: 'ChatItemScreen',
			params: {
				item,
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
			<FlatList
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
						<ChatCard {...item} />
					</Touchable>
				)}
			/>
		</Root>
	)
}

const ChatComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(ChatComponent)

export default ChatComponentConnect
