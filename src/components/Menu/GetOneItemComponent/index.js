import React, { useState, useEffect, useContext, memo, useRef, createRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Dimensions, Platform, Animated, useColorScheme } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ETASimpleText, ETAStarRating, ETABottomModal } from '@etaui'
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@icons'
import SuggestionsComponent from './SuggestionsComponent'
import { connect } from 'react-redux'
import { ADD_TO_CART, REMOVE_FROM_CART } from '@redux/cart/actions'
import { GET_DATA_REQUEST } from '@redux/menu/similarto/actions'
import { GET_DATA_REQUEST as GET_ALL_FAVORITE_ITEMS_REQUEST, TOOGLE_FAVORITE } from '@redux/profile/favorites/actions'
import { currencySeparator } from '@functions'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LottieView from 'lottie-react-native'
import InfoTopTabsComponent from './Info'
import ReviewsComponent from './ReviewsComponent'
import NoteProduct from '@commons/NoteProduct'

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
	z-index: 999;
	background-color: transparent;
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
	justify-content: flex-end;
	align-items: center;
	align-self: center;
	position: absolute;
	height: 100%;
	z-index: 100;
	background-color: transparent;
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
	z-index: 1000;
	background-color: transparent;
`
const CardTop = styled.View`
	min-height: 10px;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	margin-top: 0px;
	padding-horizontal: 15px;
	background-color: transparent;
`
const CardHeaderContainer = styled.View`
	min-height: 15px;
	justify-content: center;
	align-items: stretch;
	margin-bottom: 2px;
	background-color: transparent;
`
const StatusContainer = styled.View`
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	height: 14px;
	padding-horizontal: 4px;
	z-index: 100;
	border-radius: 4px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
`
const PointsContainer = styled.View`
	justify-content: flex-end;
	position: absolute;
	min-height: 13px;
	min-width: 30px;
	right: 25px;
	padding-horizontal: 4px;
	border-radius: 4px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CardTopHead = styled.View`
	min-height: 30px;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 7px;
	background-color: transparent;
`
const NameContainer = styled.View`
	flex: 0.8;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding-horizontal: 2px;
	background-color: transparent;
`
const ShopContainer = styled.View`
	flex: 0.35;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-horizontal: 2px;
	background-color: transparent;
`
const PriceContainer = styled.View`
	flex: 0.6;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const DiscountContainer = styled.View`
	flex: 0.3;
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
	padding-horizontal: 3px;
	padding-vertical: 0px;
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
	justify-content: space-around;
	padding-horizontal: 10px;
	align-items: stretch;
	background-color: transparent;
`
const ItemInfo = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 20px;
	min-width: 20px;
	max-width: 75px;
	padding-horizontal: 10px;
	border-radius: 20px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	shadow-offset: 0px 1px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	elevation: 0;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	margin-horizontal: 7px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CardBottom = styled.View`
	min-height: 60px;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	margin-top: 7px;
	background-color: transparent;
`
const ItemDetailsContainer = styled.View`
	min-height: 30px;
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding-horizontal: 20px;
	background-color: transparent;
`
const DetailsTextContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 4px 0px;
	margin-bottom: 5px;
	border-bottom-width: 0.5px;
	border-bottom-color: ${(props) => props.theme.GRAYFACEBOOK};
`
const ToolsContainer = styled.View`
	height: 30px;
	width: 95%;
	flex-direction: row;
	margin-top: 2px;
	justify-content: flex-end;
	align-items: center;
	z-index: 1000;
	background-color: transparent;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 5, bottom: 5, right: 0, left: 0}
})`
	justify-content: center;
	align-items: center;
`
const SummaryRow = styled.View`
    min-height: 30px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-vertical: 1px;
    background-color: transparent;
`
const SumamryRowFlavor = styled.View`
    height: 25px;
    width: 25px;
    border-radius: 12.5px;
	border-width: 1.5px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
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
	const colorScheme = useColorScheme()
	const { item } = route.params
	const [ addedCounter, setaddedCounter ] = useState(0)
	const [ isFavorite, setisFavorite ] = useState(false)
	const [ animatedValueTransform ] = useState(new Animated.Value(0.9))
	const [ selectedItem, setselectedItem ] = useState(item)
	const [ similarid, setsimilarid ] = useState(0)
	const [ isBottomModalVisible, setisBottomModalVisible ] = useState(false)
	const [ contentModal, setcontentModal ] = useState()
	const [ bottommodalTitle, setbottommodalTitle ] = useState('')
	const [ isFancyModalVisible, setisFancyModalVisible ] = useState(false)
	const delayValue = 1500
	const heart = useRef(false)
	const bottomModalRef = useRef()
	
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
				console.log('Favorito es');
				setisFavorite(true)
				// heart.current?.play(25, 169)
			}
			else {
				console.log('Es no favorito');
				setisFavorite(!true)
				heart.current?.reset()
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
		if (!isFavorite) {
			await heart.current?.play(0, 169)
			await setTimeout(() => {
				heart.current?.pause()
				setisFavorite(true)
			}, 1690/2);
		} else {
			// await heart.current?.play(169, 0)
			// await setTimeout(() => {
			// 	heart.current?.pause()
			// }, 1690/2)
			setisFavorite(false)
		}
		
		toogleFavorite(selectedItem)
	}

	const _onShowModal = (id, title) => {
		setbottommodalTitle(title)
		setisBottomModalVisible(true)
		setcontentModal(id)
	}

	const _contentModal = () => {
		switch (contentModal) {
			case 1:
				return <ReviewsComponent totalRaitings={selectedItem.rating} />
			case 2:
				return (
					<>
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
							I am the modal calories content!
						</ETASimpleText>
					</>
				)
			case 3:
				return <InfoTopTabsComponent />
			default:
				return (
					<>
						<ETASimpleText
							size={12}
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
							I am the modal content!
						</ETASimpleText>
					</>
				)
		}
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
								colors={[ 'transparent', themeContext.FOURTH_BACKGROUND_COLOR_LIGHT, themeContext.FOURTH_BACKGROUND_COLOR_LIGHT ]} 
								style={{ flex: 1, bottom: 15, zIndex: 100 }}>
							</LinearGradient>
						</GradientContainer>
						<ItemBottomContainer>
							<Animated.View
								style={{
									width: width - 60,
									minHeight: 100,
									marginVertical: 5,
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
									paddingBottom: 10,
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
									<CardHeaderContainer>
										{selectedItem.status !== '' ?  (
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
										) : null
										}
										
										{
											selectedItem.points > 0
											?	<PointsContainer>
													<ETASimpleText
														size={9.5}
														weight={
															Platform.OS ===
															'ios'
																? '400'
																: '300'
														}
														color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
														align='center'
													>
														{selectedItem.points}° pts
													</ETASimpleText>
												</PointsContainer>
											:	null
										}
									</CardHeaderContainer>
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
												{
													selectedItem.discount > 0
													?	<PercentContainer>
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
													:	null
												}
											</PriceContainer>
											<DiscountContainer>
												{selectedItem.discount >
												0 ? (
													<>
														<ETASimpleText
															size={
																11
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
													</>
												) : null}
											</DiscountContainer>
										</ShopContainer>
									</CardTopHead>
									{
										selectedItem.status !== 'custom'
										?	<ItemInfoContainer>
												<ItemInfo
													onPress={() => _onShowModal(1, 'Reviews')}
													style={{ borderWidth: colorScheme === 'dark' ? 0.5 : 0.75}}
												>
													<ETAStarRating
														ratings={
															selectedItem.rating
														}
													/>
												</ItemInfo>
												<ItemInfo
													onPress={() => _onShowModal(2, 'Nutritional info')}
													style={{ borderWidth: colorScheme === 'dark' ? 0.5 : 0.75}}
												>
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
												</ItemInfo>
												<ItemInfo
													onPress={() => _onShowModal(3, 'Information')}
													style={{ borderWidth: colorScheme === 'dark' ? 0.5 : 0.75}}
												>
													<MaterialCommunityIcons 
														name='information-variant'
														size={14}
														color={
															themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT
														}
													/>
													{/* <ETASimpleText
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
													</ETASimpleText> */}
												</ItemInfo>
											</ItemInfoContainer>
										:	<SummaryRow style={{ justifyContent: 'space-between' }}>
												<ETASimpleText
													size={13}
													weight={
														Platform.OS === 'ios'
														? '500'
														: '500'
													}
													color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
													align='center'
													>
													Flavors chosen: {' '}
												</ETASimpleText>
												<SumamryRowFlavor style={{ backgroundColor: '#93D932' }}/>
												<SumamryRowFlavor style={{ backgroundColor: '#EE569E' }}/>
												<SumamryRowFlavor style={{ backgroundColor: '#694B0C' }}/>
											</SummaryRow>
										}
										<ETABottomModal
											title={bottommodalTitle}
											isVisible={isBottomModalVisible}
											onSwipeComplete={() => setisBottomModalVisible(false)}
											closeModal={() => setisBottomModalVisible(false)}
											// headerRight={<AntDesign
											// 				name='plus'
											// 				size={16}
											// 				color={
											// 					themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											// 				}
											// 			/>
											// }
										>
											{
												_contentModal(contentModal)
											}
										</ETABottomModal>
										<NoteProduct 
											title={selectedItem.name}
											isVisible={isFancyModalVisible}
											onSwipeComplete={() => setisFancyModalVisible(false)}
											closeModal={() => setisFancyModalVisible(false)}
										/>
								</CardTop>
								<CardBottom>
									<ItemDetailsContainer>
										<DetailsTextContainer>
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
										</DetailsTextContainer>
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
									<ToolsContainer>
										<Touchable
											onPress={() => setisFancyModalVisible(true)}
											disabled={addedCounter > 0 ? false : true}
										>
											<FontAwesome
												name='sticky-note-o'
												size={17}
												color={
													addedCounter > 0
														? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
														: themeContext.SECONDARY_TEXT_COLOR_LIGHT
												}
											/>
										</Touchable>
										<Touchable
											onPress={() => _isFavorite()}
										>
											{/* <Ionicons
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
											/> */}

											<LottieView
												ref={heart}
												source={require('@assets/heart2.json')}
												style={{ height: 35, backgroundColor: 'transparent', marginHorizontal: 5, top: 0.9 }}
												colorFilters={[
													{
														keypath: 'button',
														color: themeContext.PRIMARY_COLOR
													},
													{
														keypath: 'Sending Loader',
														color: '#FFF000'
													}
												]}
												progress={isFavorite ? 1 : 0}
												autoSize={true}
											/>
											{/* <ETASimpleText
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
											{JSON.stringify(isFavorite)}
										</ETASimpleText> */}
										</Touchable>										
									</ToolsContainer>
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