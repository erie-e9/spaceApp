import React, {useState, useEffect, useContext, memo} from 'react'
import {Dimensions, Platform, Animated} from 'react-native'
import {useRoute} from '@react-navigation/native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText, ETAStarRating} from '@etaui'
import {Ionicons, FontAwesome} from '@icons'
import SuggestionsComponent from './SuggestionsComponent'
import {connect} from 'react-redux'
import { ADD_TO_CART, REMOVE_FROM_CART } from '@redux/cart/actions'
import { GET_DATA_REQUEST } from '@redux/menu/similarto/actions'
import { GET_DATA_REQUEST as GET_ALL_FAVORITE_ITEMS_REQUEST, TOOGLE_FAVORITE } from '@redux/profile/favorites/actions'
import {currencySeparator} from '@functions'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 1;
`
const ItemContainer = styled.View`
	flex: 0.86;
	background-color: transparent;
`
const BackgroundPresentationContainer = styled.View`
	flex: 0.85;
	background-color: transparent;
	z-index: 9;
`
const SuggestionsContainer = styled.View`
	flex: 0.14;
	background-color: transparent;
	z-index: 999;
`
const ItemImage = styled.Image`
	flex: 1;
	width: null;
	height: null;
	justify-content: center;
`
const GradientContainer = styled.View`
	height: 20px;
`
const ItemBottomContainer = styled.View`
	flex: 1;
	background-color: transparent;
	justify-content: flex-end;
	align-items: center;
	align-self: center;
	position: absolute;
	height: 100%;
	z-index: 100;
`
const AddCartContainer = styled.View`
	position: absolute;
	top: -25px;
	flex-direction: row;
	height: 40px;
	width: 120px;
	border-radius: 30px;
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
	min-height: 24px;
	min-width: 24px;
	padding-horizontal: 2px;
	padding-vertical: 1px;
	border-radius: 12px;
	border-width: 0.5px;
	border-color: white;
	align-items: center;
	justify-content: center;
`
const AddCart = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: ${Platform.OS === 'ios' ?  10 : 0}px;
	height: 25px;
	width: 25px;
	left: 1px;
	background-color: transparent;
	z-index: 1000;
`
const AddRemoveButtonContainer = styled.View`
	height: 20px;
	width: 12px;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const RemoveCart = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: ${Platform.OS === 'ios' ?  10 : 0}px;
	height: 25px;
	width: 25px;
	right: 1px;
	background-color: transparent;
	z-index: 1000;
`
const CardTop = styled.View`
	min-height: 10px;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	margin-top: 10px;
	padding-horizontal: 10px;
`
const StatusContainer = styled.View`
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	height: 14px;
	padding-horizontal: 4px;
	top: -15px;
	left: 10px;
	z-index: 100;
	border-radius: 4px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
`
const CardTopHead = styled.View`
	min-height: 40px;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	background-color: transparent;
`
const NameContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding-horizontal: 2px;
`
const ShopContainer = styled.View`
	flex: 0.35;
	min-height: 50px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-horizontal: 2px;
	margin-bottom: 7px;
`
const PriceContainer = styled.View`
	flex: 0.5;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const DiscountContainer = styled.View`
	flex: 0.34
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 3px;
	z-index: 100;
	background-color: transparent;
`
const PercentContainer = styled.View`
	justify-content: center;
	align-items: center;
	z-index: 100;
	border-width: 0px;
	padding-horizontal: 4px;
	padding-vertical: 1.5px;
	border-color: white;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
	margin-left: 5px;
`
const ItemInfoContainer = styled.View`
	min-height: 10px;
	flex-direction: row;
	justify-content: center;
	padding-horizontal: 10px;
	align-items: stretch;
	background-color: transparent;
`
const ItemInfoRating = styled.View`
	flex-direction: row;
	height: 20px;
	width: 75px;
	border-radius: 20px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	shadow-offset: 0px 1px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	elevation: 0;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	margin-horizontal: 7px;
	justify-content: center;
	align-items: center;
`
const ItemInfoCalories = styled.View`
	height: 20px;
	width: 75px;
	border-radius: 20px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	shadow-offset: 0px 1px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	elevation: 0;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	margin-horizontal: 7px;
	justify-content: center;
	align-items: center;
`
const ItemInfoWeight = styled.View`
	height: 20px;
	width: 75px;
	border-radius: 20px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	shadow-offset: 0px 1px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	elevation: 0;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	margin-horizontal: 7px;
	justify-content: center;
	align-items: center;
`
const CardBottom = styled.View`
	min-height: 60px;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	padding-horizontal: 10px;
	margin-top: 10px;
	background-color: transparent;
`
const ItemDetailsContainer = styled.View`
	min-height: 30px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: transparent;
`
const FavoriteContainer = styled.View`
	min-height: 10px;
	width: 100%;
	align-items: flex-end;
	position: relative;
	bottom: 0px;
	right: 5px;
	z-index: 1000;
	background-color: transparent;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	justify-content: center;
	align-items: center;
`

const mapStateToProps = (state, props) => {
	const cartdata = state.cart.data 
	const favoritesdata = state.favorites.data
	const similartodata = state.similarto.data
	const similarto_id = state.similarto._id
	return { cartdata, favoritesdata, similartodata, similarto_id }
}

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

	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {
				_id: 1
			}
		})
	},

	getAllFavoriteItemsRequest: () => {
		dispatch({
			type: GET_ALL_FAVORITE_ITEMS_REQUEST,
			payload: {}
		})
	},

	toogleFavorite: (paramItem) => {
		dispatch({
			type: TOOGLE_FAVORITE,
			payload: {
				paramItem,
			}
		})
	},
})

const GetOneItemComponent = memo(({ addToCart, removeFromCart, cartdata, getDataRequest, similartodata, similarto_id, getAllFavoriteItemsRequest, favoritesdata, toogleFavorite }) => {
	const themeContext = useContext(ThemeContext)
	const route = useRoute()
	const {item} = route.params
	const [ addedCounter, setaddedCounter ] = useState(0)
	const [ isFavorite, setisFavorite ] = useState(false)
	const [ animatedValueTransform ] = useState(new Animated.Value(0.9))
	const [ selectedItem, setselectedItem ] = useState(item)
	const [ similarid, setsimilarid ] = useState(0)
	const delayValue = 1500
	
	useEffect(() => {
		getDataRequest()
		let newArray = [item, ...similartodata]
		let se = newArray[similarid || 0]
		setselectedItem(se)
	}, [similartodata, similarto_id])

	useEffect(() => {
		setsimilarid(similarto_id)
	}, [similarto_id, item])


	useEffect(() => {
		if (cartdata.length > 0) {
			const itemFound = cartdata.find(
				(element) => element._id === selectedItem._id,
			)

			if (itemFound) {
				setaddedCounter(itemFound.howMany)
			}
			else {
				setaddedCounter(0)
			}
		} else {
			// console.log('cartdata: ', cartdata);
		}

		if (favoritesdata.length > 0) {
			const favoriteItem = favoritesdata.find(
				(element) => element._id === selectedItem._id,
			)
			// console.log('favoriteItem: ', favoriteItem);
			
			if (favoriteItem !== undefined) {
				// console.log('Favorito es');
				setisFavorite(true)
			}
			else {
				// console.log('Es no favorito');
				setisFavorite(!true)
			}
			
		}
	}, [item, selectedItem])

	useEffect(() => {
		Animated.spring(animatedValueTransform, {
			toValue: 1,
			tension: 5,
			useNativeDriver: true,
		}).start()
	}, [])

	const translateY = animatedValueTransform.interpolate({
		inputRange: [0, 1],
		outputRange: [delayValue, 1],
	})

	const _addCart = (paramItem) => {
		setaddedCounter(addedCounter + 1)
		addToCart(paramItem)
	}

	const _removeFromCart = (_id) => {
		setaddedCounter(addedCounter - 1)
		removeFromCart(_id)
	}

	const _isFavorite = async () => {
		setisFavorite(!isFavorite)		
		toogleFavorite(selectedItem)
	}

	return (
		<Root>
			{
				selectedItem
				?	<ItemContainer>
				<BackgroundPresentationContainer>
					{
						selectedItem
						?	<ItemImage
								style={{
									resizeMode: 'cover',
								}}
								source={{
									uri:
										// 'https://minimalistbaker.com/wp-content/uploads/2016/05/THE-BEST-Vegan-Chocolate-Ice-Cream-SO-creamy-rich-and-easy-to-make-vegan-glutenfree-icecream-dessert-chocolate-recipe-summer.jpg',
										selectedItem.images[0].image,
								}}
							/>
						:	null
					}
				</BackgroundPresentationContainer>
				<GradientContainer>
					<LinearGradient 
						// colors={[ themeContext.PRIMARY_TEXT_BACKGROUND_COLOR, 'transparent', 'transparent' ]} 
						colors={[ 'transparent', themeContext.FOURTH_BACKGROUND_COLOR_LIGHT, themeContext.FOURTH_BACKGROUND_COLOR_LIGHT ]} 
						style={{ flex: 1, bottom: 15, zIndex: 100 }}>
					</LinearGradient>
				</GradientContainer>
				<ItemBottomContainer>
					<Animated.View
						style={{
							width: width - 60,
							minHeight: 100,
							marginVertical: 15,
							shadowColor:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
							shadowOffset: {
								width: 0,
								height: 1,
							},
							shadowRadius: 2,
							shadowOpacity: 0,
							borderRadius: 15,
							paddingTop: 25,
							paddingRight: 10,
							paddingBottom: 10,
							paddingLeft: 10,
							elevation: 0,
							justifyContent: 'center',
							alignItems: 'center',
							borderWidth: 0,
							borderColor:
							themeContext.GRAYFACEBOOK,
							transform: [{translateY}],
							bottom: 0,
							zIndex: 1000,
							backgroundColor:
								themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
						}}>
						{addedCounter === 0 ? (
							<AddCartContainer>
								<TouchableOpacity
									onPress={() => _addCart(selectedItem)}
									style={{
										height: 40,
										width: 120,
										flexDirection: 'row',
										justifyContent: 'center',
										alignItems: 'center',
										alignSelf: 'center',
										borderRadius: 30,
										zIndex: 1000,
										backgroundColor: themeContext.PRIMARY_COLOR,
									}}>
									<AddRemoveButtonContainer>
										<ETASimpleText
											size={16}
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
										size={16}
										color='white'
										style={{
											alignSelf: 'center',
										}}
									/>
								</TouchableOpacity>
							</AddCartContainer>
						) : (
							<AddCartContainer>
								<AddRemoveContainer>
									<TouchableOpacity
										onPress={() =>
											_removeFromCart(
												selectedItem._id,
											)
										}
										style={{
											flexDirection: 'row',
											justifyContent: 'center',
											alignItems: 'center',
											marginBottom: Platform.OS === 'ios' ?  10 : 0,
											height: 25,
											width: 25,
											right: 1,
											backgroundColor: 'transparent',
											zIndex: 1000,
										}}>
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
									</TouchableOpacity>
									<CounterContainer>
										<ETASimpleText
											size={11}
											weight={
												Platform.OS ===
												'ios'
													? '600'
													: '300'
											}
											color='white'
											align='center'>
											{addedCounter}
										</ETASimpleText>
									</CounterContainer>
									<TouchableOpacity
										onPress={() =>
											_addCart(selectedItem)
										}
										style={{
											flexDirection: 'row',
											justifyContent: 'center',
											alignItems: 'center',
											marginBottom: Platform.OS === 'ios' ?  10 : 0,
											height: 25,
											width: 25,
											left: 1,
											backgroundColor: 'transparent',
											zIndex: 1000,
										}}>
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
									</TouchableOpacity>
								</AddRemoveContainer>
							</AddCartContainer>
						)}
						<CardTop>
							{selectedItem.status ? (
								<StatusContainer>
									<ETASimpleText
										size={11}
										weight={
											Platform.OS ===
											'ios'
												? '400'
												: '300'
										}
										color='white'
										align='center'>
										{selectedItem.status}
									</ETASimpleText>
								</StatusContainer>
							) : null}
							<CardTopHead>
								<NameContainer>
									<ETASimpleText
										size={16}
										weight={
											Platform.OS ===
											'ios'
												? '400'
												: '400'
										}
										color={
											themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
										}
										align='left'>
										{selectedItem.name}
									</ETASimpleText>
								</NameContainer>
								<ShopContainer>
									<PriceContainer>
										<ETASimpleText
											size={14}
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
												zIndex: 100,
											}}>
											$
											{currencySeparator((
												((100 -
													selectedItem.discount) *
													selectedItem.price) /
												100
											).toFixed(2))}
										</ETASimpleText>
									</PriceContainer>
									<DiscountContainer>
										{selectedItem.discount >
										0 ? (
											<>
												<ETASimpleText
													size={
														10
													}
													weight={
														Platform.OS ===
														'ios'
															? '400'
															: '400'
													}
													color={
														themeContext.PRIMARY_TEXT_COLOR_LIGHT
													}
													align='center'
													style={{
														textDecorationLine:
															'line-through',
														textDecorationStyle:
															'solid',
													}}>
													$
													{currencySeparator(selectedItem.price.toFixed(
														2,
													))}
												</ETASimpleText>
												<PercentContainer>
													<ETASimpleText
														size={
															9
														}
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
														-
														{
															selectedItem.discount
														}

														%
													</ETASimpleText>
												</PercentContainer>
											</>
										) : null}
									</DiscountContainer>
								</ShopContainer>
							</CardTopHead>
							<ItemInfoContainer>
								<ItemInfoRating>
									<ETAStarRating
										ratings={
											selectedItem.rating
										}
									/>
								</ItemInfoRating>
								<ItemInfoCalories>
									<ETASimpleText
										size={8.5}
										weight={
											Platform.OS ===
											'ios'
												? '500'
												: '300'
										}
										color={
											themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT
										}
										align='left'>
										{selectedItem.calories}{' '}
										calories
									</ETASimpleText>
								</ItemInfoCalories>
								<ItemInfoWeight>
									<ETASimpleText
										size={8.5}
										weight={
											Platform.OS ===
											'ios'
												? '500'
												: '300'
										}
										color={
											themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT
										}
										align='left'>
										{selectedItem.weight} g
									</ETASimpleText>
								</ItemInfoWeight>
							</ItemInfoContainer>
						</CardTop>
						<CardBottom>
							<ItemDetailsContainer>
								<ETASimpleText
									size={13}
									weight={
										Platform.OS ===
										'ios'
											? '500'
											: '500'
									}
									color={
										themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
									}
									align='center'>
									Details
								</ETASimpleText>
								<ETASimpleText
									size={11}
									weight={
										Platform.OS ===
										'ios'
											? '400'
											: '300'
									}
									color={
										themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT
									}
									align='left'>
									{selectedItem.details}
								</ETASimpleText>
							</ItemDetailsContainer>
							<FavoriteContainer>
								<Touchable
									onPress={() => _isFavorite()}
								>
									<Ionicons
										name={
											isFavorite
												? 'md-heart'
												: 'md-heart-outline'
										}
										size={20}
										color={
											isFavorite
												? themeContext.PRIMARY_COLOR
												: themeContext.PRIMARY_TEXT_COLOR_LIGHT
										}
									/>
								</Touchable>
							</FavoriteContainer>
						</CardBottom>
					</Animated.View>
				</ItemBottomContainer>
			</ItemContainer>
				:	null
			}
			<SuggestionsContainer>
				<SuggestionsComponent selectedItem={item} />
			</SuggestionsContainer>
		</Root>
	)
})

const GetOneItemComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(GetOneItemComponent)
export default GetOneItemComponentConnect
