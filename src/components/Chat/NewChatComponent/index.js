import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import ContactCard from './ContactCard'
import { ETALoader } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/chats/clients/contactlist/actions'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const ContactsFlatList = styled.FlatList``
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})``

const mapStateToProps = (state, props) => {
	const { data } = state.clientscontactlist
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const NewChatComponent = ({ getDataRequest, data }) => {
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
				paramData: { 
					active: item.active,
				},
				user: { 
					avatar: item.avatar,
					firstname: item.firstname,
					lastname: item.lastname,
					username: item.username,
					cellphone: item.cellphone
				}
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
							<Touchable
								key={item._id}
								onPress={() => _onPress(item)}>
								<ContactCard item={item} />
							</Touchable>				
								// <ContactCard item={item} />
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
