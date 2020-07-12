import React, {useState, useEffect, useContext} from 'react'
import {Animated, Platform} from 'react-native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText, ETAButtonOutline} from '@etaui'
import {useNavigation} from '@react-navigation/native'
import CartItemComponent from './CartItemComponent'
import { connect } from 'react-redux'
import { GET_ALL_ITEMS_REQUEST } from '@redux/cart/actions'

const Root = styled.View`
	flex: 0.58;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const CategorytItemsList = styled.FlatList``
const EmptyListContainer = styled.View`
	flex: 1;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const { data } = state.cart
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getAllItemsRequest: () => {
		dispatch({
			type: GET_ALL_ITEMS_REQUEST,
			payload: {}
		})
	}
})

const CartListComponent = ({getAllItemsRequest, data}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ items, setitems ] = useState([])

	useEffect(() => {
		getAllItemsRequest()
		setitems(data)
		console.log('CartListComponent data', data)
		// return () => {
		// 	getAllItemsRequest()
		// }
	}, [data])

	return (
		<Root>
			<CategorytItemsList
				contentContainerStyle={{
					flexDirection: 'column',
					justifyContent: 'flex-start',
				}}
				data={items}
				keyExtractor={(item) => item._id.toString()}
				horizontal={!true}
				initialNumToRender={5}
				showsVerticalScrollIndicator={false}
				updateCellsBatchingPeriod={3000}
				ListEmptyComponent={() => (
					<EmptyListContainer>
						<ETASimpleText
							size={14}
							weight={
								Platform.OS === 'ios'
									? '500'
									: '300'
							}
							color={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							align='left'>
							Your cart doesn´t have products yet
						</ETASimpleText>

						<ETAButtonOutline
							title='See menu'
							onPress={() =>
								navigation.navigate(
									'ShopTabNavigator',
									{
										screen: 'Menu',
									},
								)
							}
							disabled={false}
							colorButton={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							padding={10}
							width={250}
							borderRadius={3}
						/>
					</EmptyListContainer>
				)}
				renderItem={({item, i}) => {
					return <CartItemComponent item={item} howMany={item.howMany} />
				}}
			/>
		</Root>
	)
}

const CartListComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps
)(CartListComponent)

export default CartListComponentConnect
