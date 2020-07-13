import React, {useState, useEffect, useContext, memo} from 'react'
import {Dimensions, Platform, Animated} from 'react-native'
import {useRoute} from '@react-navigation/native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText, ETAStarRating} from '@etaui'
import {Ionicons, FontAwesome} from '@icons'
import SuggestionsComponent from './SuggestionsComponent'
import {connect} from 'react-redux'
import {ADD_TO_CART, REMOVE_FROM_CART} from '@redux/cart/actions'

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
const AddCartTouchable = styled.TouchableOpacity`
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
	height: 24px;
	width: 24px;
	border-radius: 12px;
	border-width: 0.5px;
	border-color: white;
	align-items: center;
	justify-content: center;
`
const AddCart = styled.TouchableOpacity`
	padding: 5px;
	flex-direction: row;
	z-index: 1000;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const AddRemoveButtonContainer = styled.View`
	height: 18px;
	width: 12px;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const RemoveCart = styled.TouchableOpacity`
	padding: 5px;
	flex-direction: row;
	z-index: 1000;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const CardTop = styled.View`
	min-height: 10px;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	margin-top: 10px;
`
const StatusContainer = styled.View`
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	z-index: 100;
	height: 14px;
	paddinghorizontal: 4px;
	top: -15px;
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
	justify-content: space-between;
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
	flex-direction: column;
	justify-content: space-between;
	min-height: 90px;
	width: 100%;
	align-items: flex-start;
	padding-horizontal: 10px;
	margin-top: 10px;
	background-color: transparent;
`
const ItemDetailsContainer = styled.View`
	min-height: 50px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`
const FavoriteContainer = styled.View`
	position: absolute;
	bottom: 0px;
	right: 5px;
	z-index: 1000;
`
const Touchable = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
`

const mapStateToProps = (state, props) => {
	const {data} = state.cart
	return {data}
}
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
})

const GetOneItemComponent = ({addToCart, removeFromCart, data}) => {
	const themeContext = useContext(ThemeContext)
	const [addedCounter, setaddedCounter] = useState(0)
	const [animatedValueTransform] = useState(new Animated.Value(0.9))
	const route = useRoute()
	const {item} = route.params
	const delayValue = 1500

	useEffect(() => {
		if (data.length > 0) {
			const itemFound = data.find(
				(element) => element._id === item._id,
			)
			if (itemFound) {
				setaddedCounter(itemFound.howMany)
			}
		} else {
			// console.log('data: ', data);
		}
	}, [data])

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

	return (
		<Root>
			<ItemContainer>
				<BackgroundPresentationContainer>
					<ItemImage
						style={{
							resizeMode: 'cover',
						}}
						source={{
							uri:
								// 'https://minimalistbaker.com/wp-content/uploads/2016/05/THE-BEST-Vegan-Chocolate-Ice-Cream-SO-creamy-rich-and-easy-to-make-vegan-glutenfree-icecream-dessert-chocolate-recipe-summer.jpg',
								item.images[0].image,
						}}
					/>
				</BackgroundPresentationContainer>
				<ItemBottomContainer>
					<Animated.View
						style={{
							width: width - 60,
							bottom: -10,
							backgroundColor:
								themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
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
						}}>
						{addedCounter === 0 ? (
							<AddCartTouchable
								onPress={() => _addCart(item)}>
								<AddRemoveButtonContainer>
									<ETASimpleText
										size={18}
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
									size={18}
									color='white'
									style={{
										alignSelf: 'center',
									}}
								/>
							</AddCartTouchable>
						) : (
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
											size={12}
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
									<AddCart
										onPress={() =>
											_addCart(item)
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
							</AddCartContainer>
						)}
						<CardTop>
							{item.status ? (
								<StatusContainer>
									<ETASimpleText
										size={11}
										weight={
											Platform.OS ===
											'ios'
												? '400'
												: '300'
										}
										// color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
										color='white'
										align='center'>
										{item.status}
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
												? '500'
												: '400'
										}
										color={
											themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
										}
										align='left'>
										{item.name}
									</ETASimpleText>
								</NameContainer>
								<ShopContainer>
									<PriceContainer>
										<ETASimpleText
											size={14}
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
											{(
												((100 -
													item.discount) *
													item.price) /
												100
											).toFixed(2)}
										</ETASimpleText>
									</PriceContainer>
									<DiscountContainer>
										{item.discount >
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
													{item.price.toFixed(
														2,
													)}
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
															item.discount
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
											item.rating
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
										{item.calories}{' '}
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
										{item.weight} g
									</ETASimpleText>
								</ItemInfoWeight>
							</ItemInfoContainer>
						</CardTop>
						<CardBottom>
							<ItemDetailsContainer>
								<ETASimpleText
									size={12}
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
											? '300'
											: '300'
									}
									color={
										themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT
									}
									align='left'>
									{item.details}
								</ETASimpleText>
							</ItemDetailsContainer>
							<FavoriteContainer>
								<Touchable
								// onPress={() =>
								// 	console.log(
								// 		'ñeñe ñeñe ñeñe',
								// 	)
								// }
								>
									<Ionicons
										name={
											item.isFavorite
												? 'md-heart'
												: 'md-heart-outline'
										}
										size={20}
										color={
											item.isFavorite
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
			<SuggestionsContainer>
				<SuggestionsComponent selectedItemName={item.name} />
			</SuggestionsContainer>
		</Root>
	)
}

const GetOneItemComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(GetOneItemComponent)
export default GetOneItemComponentConnect
