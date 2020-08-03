import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import {FlatList} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import ChatCard from './ChatCard'
import {connect} from 'react-redux'
import {GET_DATA_REQUEST} from '@redux/chats/actions'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})``

const mapStateToProps = (state, props) => {
	const {data} = state.chats
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const ChatComponent = ({getDataRequest, data}) => {
	const navigation = useNavigation()
	const [items, setitems] = useState([])

	useEffect(() => {
		getDataRequest()
		setitems(data)
	}, [data])

	const _onPress = (item) => {
		navigation.navigate('ChatItemNavigator', {
			screen: 'ChatItemScreen',
			params: {
				item
			},
		})
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
