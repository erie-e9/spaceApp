import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Platform } from 'react-native'
import { ETASimpleText, ETAButtonFilled, ETALoader } from '@etaui'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import CartItemComponent from './CartItemComponent'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/cart/actions'

const Root = styled.View`
	flex: 0.8;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const CategorytItemsList = styled.FlatList``
const EmptyListContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 100px;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const { data } = state.cart
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {},
		})
	},
})

const CartListComponent = ({ getDataRequest, data }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const isFocused = useIsFocused()
	const [ items, setitems ] = useState(null)

	useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		setTimeout(() => {
			setitems(data)
		}, 1000);

		return () => {
			isUnMounted = true
		}
	}, [data])

	return (
		<Root>
			{
				items !== null
				?	<CategorytItemsList
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
											? '400'
											: '300'
									}
									color={
										themeContext.PRIMARY_TEXT_COLOR_LIGHT
									}
									align='left'>
									Your cart has no products yet.
								</ETASimpleText>
								<ETAButtonFilled
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
										themeContext.SECONDARY_BACKGROUND_COLOR
									}
									padding={10}
									width={240}
									borderRadius={3}
								/>
							</EmptyListContainer>
						)}
						renderItem={({item, i}) => {
							if (item.howMany > 0) {
								return (
									<CartItemComponent
										item={item}
										howMany={item.howMany}
										note={item.note}
									/>
								)
							}
						}}
					/>
				:	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
			}
		</Root>
	)
}

const CartListComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(CartListComponent)

export default CartListComponentConnect
