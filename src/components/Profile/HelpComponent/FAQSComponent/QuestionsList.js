import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {GET_ALL_ITEMS_REQUEST} from '@redux/profile/help/faqs/actions'
import Card from './Card'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: center;
	background-color: transparent;
`
const FAQSList = styled.FlatList`
	flex-direction: column;
	padding: 10px 10px;
`
const mapStateToProps = (state, props) => {
	const {data} = state.faqs
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getAllItemsRequest: () => {
		dispatch({
			type: GET_ALL_ITEMS_REQUEST,
			payload: {},
		})
	},
})

const FAQSComponent = ({getAllItemsRequest, data}) => {
	const [items, setitems] = useState([])

	useEffect(() => {
		getAllItemsRequest()
		setitems(data)
	}, [data])

	return (
		<Root>
			<FAQSList
				contentContainerStyle={{
					alignSelf: 'stretch',
				}}
				data={items}
				keyExtractor={(item) => item._id.toString()}
				showsVerticalScrollIndicator={false}
				renderItem={({item}) => (
					<Card key={item._id} {...item} />
				)}
			/>
		</Root>
	)
}

const FAQSComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(FAQSComponent)

export default FAQSComponentConnect
