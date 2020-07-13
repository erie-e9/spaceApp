import React, {useState, useContext, useEffect} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {Platform, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ETASimpleText} from '@etaui'
import {Ionicons, FontAwesome} from '@icons'
import {connect} from 'react-redux'
import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	REMOVE_ITEM_FROM_CART,
} from '@redux/cart/actions'
import {currencySeparator} from '@functions'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex-direction: column;
	min-height: 100px;
	width: ${width}px;
`
const Item = styled.View`
	flex: 1;
	min-height: 50px;
	flex-direction: row;
	padding-horizontal: 5px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	shadow-offset: 2px 3px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	justify-content: center;
	align-items: center;
	margin: 0px 0px 0px 0px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ItemImage = styled.Image`
	height: 60px;
	width: 60px;
	border-radius: 5px;
	margin-left: 5px;
`
const StatusContainer = styled.View`
	justify-content: center;
	position: absolute;
	height: 12px;
	width: 23px;
	top: 15px;
	left: 11px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	border-radius: 4px;
	border-width: 0px;
	border-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CartItemData = styled.View`
	flex: 1;
	flex-direction: column;
	margin-left: 15px;
	align-items: flex-start;
	justify-content: center;
	background-color: transparent;
`
const CartItemHeadContainer = styled.View`
	min-height: 30px;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	background-color: transparent;
	padding: 5px 5px 0px 5px;
`
const CartTitleContainer = styled.View`
	flex: 1;
	background-color: transparent;
	align-items: flex-start;
`
const CardItemFunctions = styled.View`
	flex: 0.5;
	align-items: flex-end;
	justify-content: center;
	margin: 0px 10px 10px 0px;
	padding-horizontal: 2px;
`
const Touchable = styled.TouchableOpacity``
const CartItemContainer = styled.View`
	flex: 0.7;
	flex-direction: row;
`
const CartItemLeftContainer = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 5px 0px 0px 0px;
	padding-horizontal: 2px;
	background-color: transparent;
`
const DiscountContainer = styled.View`
	flex: 0.5;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	margin-top: 2px;
	z-index: 100;
	margin-bottom: 3px;
`
const PercentContainer = styled.View`
	justify-content: center;
	align-items: center;
	z-index: 100;
	border-width: 0px;
	padding-horizontal: 5px;
	padding-vertical: 1px;
	border-color: white;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
	margin-left: 5px;
`
const UnitPriceContainer = styled.View`
	justify-content: center;
	align-items: center;
	z-index: 100;
	border-width: 0px;
	padding-horizontal: 5px;
	padding-vertical: 1px;
	border-color: white;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`
const PriceContainer = styled.View`
	flex: 0.4;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`
const CartItemRightContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	margin: 5px 0px 10px 5px;
	padding-horizontal: 2px;
`
const AddCartContainer = styled.View`
	position: absolute;
	right: 5px;
	flex-direction: row;
	height: 30px;
	width: 90px;
	border-radius: 20px;
	shadow-offset: 0px 1px;
	shadow-radius: 2px;
	shadow-opacity: 0.2;
	elevation: 0.3;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	margin-horizontal: 7px;
	padding-horizontal: 10px;
	justify-content: center;
	align-items: center;
	align-self: center;
	z-index: 1000;
`
const AddRemoveContainer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
const CounterContainer = styled.View`
	height: 20px;
	width: 20px;
	border-radius: 12px;
	border-width: 0.5px;
	border-color: white;
	align-items: center;
	justify-content: center;
`
const AddRemoveButtonContainer = styled.View`
	height: 18px;
	width: 12px;
	align-items: center;
	justify-content: center;
	background-color: transparent;
`
const AddCart = styled.TouchableOpacity`
	padding-horizontal: 5px;
	flex-direction: row;
	z-index: 1000;
`
const RemoveCart = styled.TouchableOpacity`
	padding-horizontal: 5px;
	flex-direction: row;
	z-index: 1000;
`
const mapDispatchProps = (dispatch, props) => ({
	addToCart: (paramItem) => {
		dispatch({
			type: ADD_TO_CART,
			payload: {
				data: paramItem,
			},
		})
	},

	removeFromCart: (_id) => {
		dispatch({
			type: REMOVE_FROM_CART,
			payload: {
				data: _id,
			},
		})
	},

	removeItemFromCart: (_id) => {
		dispatch({
			type: REMOVE_ITEM_FROM_CART,
			payload: {
				data: _id,
			},
		})
	},
})

const CartItemComponent = ({
	addToCart,
	removeFromCart,
	removeItemFromCart,
	item,
	howMany,
}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [addedCounter, setaddedCounter] = useState()

	useEffect(() => {
		setaddedCounter(howMany)
	}, [howMany])

	const _addCart = (paramItem) => {
		setaddedCounter(addedCounter + 1)
		addToCart(paramItem)
	}

	const _removeFromCart = (_id) => {
		setaddedCounter(addedCounter - 1)
		removeFromCart(_id)
	}

	const _removeItemFromCart = (_id) => {
		removeItemFromCart(_id)
	}

	const _onPressItem = (propitem) => {
		navigation.navigate('GetOneItemNavigator', {
			screen: 'GetOneItemScreen',
			params: {
				item: propitem,
			},
		})
	}

	return (
		<Touchable onPress={() => _onPressItem(item)}>
			<Root>
				<Item>
					<ItemImage source={{uri: item.images[0].image}} />
					<CartItemData>
						<CartItemHeadContainer>
							<CartTitleContainer>
								<ETASimpleText
									size={13}
									weight={
										Platform.OS ===
										'ios'
											? '400'
											: '800'
									}
									color={
										themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
									}
									align='left'>
									{item.name}
								</ETASimpleText>
							</CartTitleContainer>
							<CardItemFunctions>
								<Touchable
									onPress={() =>
										_removeItemFromCart(
											item._id,
										)
									}>
									<Ionicons
										name='md-close'
										size={18}
										color={
											themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
										}
										style={{
											alignSelf:
												'center',
										}}
									/>
								</Touchable>
							</CardItemFunctions>
						</CartItemHeadContainer>
						<CartItemContainer>
							<CartItemLeftContainer>
								<UnitPriceContainer>
									<ETASimpleText
										size={9}
										weight={
											Platform.OS ===
											'ios'
												? '500'
												: '900'
										}
										color={
											themeContext.PRIMARY_TEXT_COLOR_LIGHT
										}
										align='left'
										style={{
											zIndex: 100,
										}}>
										$
										{currencySeparator(
											(
												((100 -
													item.discount) *
													item.price) /
												100
											).toFixed(2),
										)}{' '}
										unit price
									</ETASimpleText>
								</UnitPriceContainer>
								<PriceContainer>
									<ETASimpleText
										size={13}
										weight={
											Platform.OS ===
											'ios'
												? '500'
												: '400'
										}
										color={
											themeContext.PRIMARY_COLOR
										}
										align='center'
										style={{
											zIndex: 100,
										}}>
										$
										{currencySeparator(
											(
												(100 -
													item.discount) *
												(item.price /
													100) *
												addedCounter
											).toFixed(2),
										)}
									</ETASimpleText>
								</PriceContainer>
								{/* {
									item.discount > 0
									? <DiscountContainer>
										<ETASimpleText
											size={10}
											weight={Platform.OS === 'ios' ? '400' : '400'}
											color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
											align={'center'}
											style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
											${(item.price.toFixed(2))}
										</ETASimpleText>
										<PercentContainer>
											<ETASimpleText
												size={9}
												weight={Platform.OS === 'ios' ? '500' : '900'}
												color={themeContext.PRIMARY_COLOR}
												align={'left'}
												style={{ zIndex: 100 }}>
												-{item.discount}%
											</ETASimpleText>
										</PercentContainer>
									</DiscountContainer>
									:	null
								} */}
							</CartItemLeftContainer>
							<CartItemRightContainer>
								<AddCartContainer>
									{addedCounter === 0 ? (
										<AddCart
											onPress={() =>
												_addCart(
													item,
												)
											}>
											<AddRemoveButtonContainer>
												<ETASimpleText
													size={
														18
													}
													weight={
														Platform.OS ===
														'ios'
															? '600'
															: '300'
													}
													color='white'
													align='center'>
													+
												</ETASimpleText>
											</AddRemoveButtonContainer>
											<FontAwesome
												name='shopping-cart'
												size={
													18
												}
												color='white'
												style={{
													alignSelf:
														'center',
												}}
											/>
										</AddCart>
									) : (
										<AddRemoveContainer>
											<RemoveCart
												onPress={() =>
													_removeFromCart(
														item._id,
													)
												}>
												<AddRemoveButtonContainer>
													{/* <CounterContainer> */}
													<ETASimpleText
														size={
															22
														}
														weight={
															Platform.OS ===
															'ios'
																? '600'
																: '300'
														}
														color='white'
														align='center'>
														-
													</ETASimpleText>
													{/* </CounterContainer> */}
												</AddRemoveButtonContainer>
											</RemoveCart>
											<CounterContainer>
												<ETASimpleText
													size={
														12
													}
													weight={
														Platform.OS ===
														'ios'
															? '600'
															: '300'
													}
													color='white'
													align='center'>
													{
														addedCounter
													}
												</ETASimpleText>
											</CounterContainer>
											<AddCart
												onPress={() =>
													_addCart(
														item,
													)
												}>
												<AddRemoveButtonContainer>
													{/* <CounterContainer> */}
													<ETASimpleText
														size={
															22
														}
														weight={
															Platform.OS ===
															'ios'
																? '600'
																: '300'
														}
														color='white'
														align='center'>
														+
													</ETASimpleText>
													{/* </CounterContainer> */}
												</AddRemoveButtonContainer>
											</AddCart>
										</AddRemoveContainer>
									)}
								</AddCartContainer>
							</CartItemRightContainer>
						</CartItemContainer>
					</CartItemData>
				</Item>
			</Root>
		</Touchable>
	)
}

const CartItemComponentConnect = connect(
	null,
	mapDispatchProps,
)(CartItemComponent)

export default React.memo(CartItemComponentConnect)
