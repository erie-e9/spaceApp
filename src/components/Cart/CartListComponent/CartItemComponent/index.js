import React, { useState , useContext, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Platform, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText } from '@etaui'
import { Ionicons, FontAwesome } from '@icons'
import { connect } from 'react-redux'
import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	REMOVE_ITEM_FROM_CART,
} from '@redux/cart/actions'
import { currencySeparator } from '@functions'
import NoteProduct from '@commons/NoteProduct'
import * as RNLocalize from 'react-native-localize'

const { width } = Dimensions.get('window')

const Root = styled.View`
	flex-direction: column;
	min-height: 80px;
	width: ${width}px;
`
const Item = styled.View`
	flex: 1;
	min-height: 50px;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	padding-horizontal: 5px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	shadow-offset: 2px 3px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	margin: 0px 0px 0px 0px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ItemImage = styled.Image`
	height: 60px;
	width: 60px;
	border-radius: 5px;
	margin-left: 5px;
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
	padding: 0px 5px 0px 0px;
	background-color: transparent;
`
const CartTitleContainer = styled.View`
	flex: 1;
	align-items: flex-start;
	background-color: transparent;
`
const CardItemFunctions = styled.View`
	flex: 0.1;
	align-items: flex-end;
	justify-content: center;
	margin: 0px 10px 0px 0px;
	padding-horizontal: 2px;
`
const TouchableClose = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 5, bottom: 5, right: 5, left: 5}
})`
	height: 22px;
	width: 22px;
	z-index: 100;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 5, bottom: 5, right: 5, left: 5}
})`
	min-height: 25px;
	min-width: 25px;
	justify-content: center;
	align-items: center;
`
const CartItemContainer = styled.View`
	flex: 1;
	flex-direction: row;
`
const CartItemLeftContainer = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding-horizontal: 2px;
	background-color: transparent;
`
const PriceContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: transparent;
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
	margin-horizontal: 7px;
	padding-horizontal: 10px;
	justify-content: space-between;
	align-items: center;
	align-self: center;
	z-index: 1000;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
`
const AddRemoveContainer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
const CounterContainer = styled.View`
	min-height: 20px;
	min-width: 20px;
	padding-horizontal: 2px;
	padding-vertical: 1px;
	border-radius: 12px;
	border-width: 0.5px;
	border-color: white;
	align-items: center;
	justify-content: center;
`
const AddRemoveButtonContainer = styled.View`
	height: 20px;
	width: 12px;
	align-items: center;
	justify-content: center;
	background-color: transparent;
`
const AddCart = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: ${Platform.OS === 'ios' ?  7 : 0}px;
	height: 25px;
	width: 25px;
	left: 1px;
	background-color: transparent;
	z-index: 1000;
`
const RemoveCart = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: ${Platform.OS === 'ios' ?  7 : 0}px;
	height: 25px;
	width: 25px;
	right: 1px;
	z-index: 1000;
	background-color: transparent;
`

const mapDispatchProps = (dispatch, props) => ({
	addToCart: (paramItem) => {
		dispatch({
			type: ADD_TO_CART,
			payload: {
				paramItem,
			},
		})
	},

	removeFromCart: (_id) => {
		dispatch({
			type: REMOVE_FROM_CART,
			payload: {
				paramItem: _id,
			},
		})
	},

	removeItemFromCart: (_id) => {
		dispatch({
			type: REMOVE_ITEM_FROM_CART,
			payload: {
				paramItem: _id,
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
	note
}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [addedCounter, setaddedCounter] = useState()
	const [ isFancyModalVisible, setisFancyModalVisible ] = useState(false)
	let languageCode = RNLocalize.getLocales()

	useEffect(() => {
		let isUnMounted = false
		setaddedCounter(howMany)
		
		return () => {
			isUnMounted = true
		}
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
		<Root>
			{addedCounter !== 0 ? (
				<Item>
					<Touchable onPress={() => _onPressItem(item)}>
						<ItemImage source={{uri: item.images[0].image}} />
					</Touchable>
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
									{
										languageCode === 'en'
										?	item.en.name.charAt(0).toUpperCase() + item.en.name.slice(1)
										:	item.es.name.charAt(0).toUpperCase() + item.es.name.slice(1)
									}
								</ETASimpleText>
							</CartTitleContainer>
							<CardItemFunctions>
								<TouchableClose
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
								</TouchableClose>
							</CardItemFunctions>
						</CartItemHeadContainer>
						<CartItemContainer>
							<CartItemLeftContainer>
								<PriceContainer>
									<ETASimpleText
										size={13}
										weight={
											Platform.OS ===
											'ios'
												? '400'
												: '400'
										}
										color={
											themeContext.PRIMARY_COLOR
										}
										align='center'
										style={{
											zIndex: 100
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

									{
										note !== ''
										?	<Touchable
												onPress={() => setisFancyModalVisible(true)}
												disabled={addedCounter > 0 ? false : true}
												style={{ marginHorizontal: 5 }}
											>
												<FontAwesome
													name='sticky-note'
													size={14}
													color={
														addedCounter > 0
															? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
															: themeContext.PRIMARY_TEXT_COLOR_LIGHT
													}
												/>
											</Touchable>
									:	null
									}
									<NoteProduct 
										_id={item._id}
										title={
											languageCode === 'en'
											?	item.en.name.charAt(0).toUpperCase() + item.en.name.slice(1)
											:	item.es.name.charAt(0).toUpperCase() + item.es.name.slice(1)
										}
										isVisible={isFancyModalVisible}
										onSwipeComplete={() => setisFancyModalVisible(false)}
										closeModal={() => setisFancyModalVisible(false)}
									/>
								</PriceContainer>
								<UnitPriceContainer>
									<ETASimpleText
										size={9}
										weight={
											Platform.OS ===
											'ios'
												? '400'
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
														20
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
													11
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
														20
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
								</AddCartContainer>
							</CartItemRightContainer>
						</CartItemContainer>
					</CartItemData>
				</Item>
			) : (null)}
		</Root>
	)
}

const CartItemComponentConnect = connect(
	null,
	mapDispatchProps,
)(CartItemComponent)

export default React.memo(CartItemComponentConnect)
