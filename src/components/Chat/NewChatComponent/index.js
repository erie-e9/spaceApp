import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import ContactCard from './ContactCard'
import {ETALoader} from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/chats/contacts/actions'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const ContactsFlatList = styled.FlatList``
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})``

const mapStateToProps = (state, props) => {
	const {data} = state.contacts
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const NewChatComponent = ({getDataRequest, data}) => {
	const navigation = useNavigation()
	const [items, setitems] = useState([])

	useEffect(() => {
		getDataRequest()
		setitems(data)
		// console.log('[NewChatComponent] contacts json: ', data);
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
			{
				items
				?	<ContactsFlatList
						contentContainerStyle={{
							alignSelf: 'stretch',
						}}
						data={items}
						keyExtractor={(item) => item._id.toString()}
						showsVerticalScrollIndicator={false}
						renderItem={({item}) => (
							// <Touchable
							// 	key={item._id}
							// 	onPress={() => _onPress(item)}>
							// 	<ContactCard item={item} />
							// </Touchable>				
								<ContactCard item={item} />
						)}
					/>
				:	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
			}
		</Root>
	)
}

const NewChatComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(NewChatComponent)

export default NewChatComponentConnect
