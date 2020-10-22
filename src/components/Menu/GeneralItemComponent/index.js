import React, { useState, useEffect, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Dimensions, Platform, PixelRatio, useColorScheme } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { ETASimpleText, ETAProgressiveImage } from '@etaui'
import { truncateString, currencySeparator } from '@functions'
import { connect} from 'react-redux'
import { GET_DATA_REQUEST as GET_ALL_FAVORITE_ITEMS_REQUEST, TOOGLE_FAVORITE } from '@redux/profile/favorites/actions'

const {width} = Dimensions.get('window')
const size = 75

const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'red',
	// hitSlop: {top: 5, bottom: 5, right: 5, left: 5}
})`
	z-index: 100;
`
const Card = styled.View`
	height: 210px;
	width: ${width / 2.8}px;
	margin-horizontal: ${width / 30}px;
	margin-vertical: 10px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	border-radius: 15px;
	shadow-offset: 2px 3px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CardTop = styled.View`
	flex: 1.25;
	border-top-left-radius: 13px;
	border-top-right-radius: 13px;
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`
const ItemImage = styled.Image`
	height: 100%;
	width: 100%;
	border-top-left-radius: 13px;
	border-top-right-radius: 13px;
`
const StatusContainer = styled.View`
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 100;
	height: 14px;
	padding-horizontal: 4px;
	bottom: 2px;
	left: 3px;
	border-radius: 4px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
`
const CardBottom = styled.View`
	flex: 0.75;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	border-bottom-left-radius: 13px;
	border-bottom-right-radius: 13px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ShopContainer = styled.View`
	flex: 0.6;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-start;
	padding-horizontal: 10px;
	margin-bottom: 6px;
	background-color: transparent;
`
const NameContainer = styled.View`
	flex: 0.5;
	flex-direction: column;
	justify-content: flex-start;
	padding-horizontal: 10px;
	padding-top: 5px;
`
const PriceContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	padding-vertical: 1.5px;
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
	margin-left: 5px;
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`
const FavoriteContainer = styled.View`
	position: absolute;
	bottom: 7px;
	right: 15px;
	z-index: 1000;
`
const PointsContainer = styled.View`
	justify-content: flex-end;
	position: absolute;
	min-height: 13px;
	min-width: 30px;
	top: 7px;
	right: 10px;
	z-index: 100;
	padding-horizontal: 4px;
	border-radius: 4px;
	border-width: 0.5px;
	border-color: white;
	background-color: rgba(255, 255, 255, 0.85);
`
const PointsContainer2 = styled.View`
	justify-content: flex-end;
	position: absolute;
	min-height: 13px;
	min-width: 30px;
	bottom: 1px;
	right: 8px;
	z-index: 100;
	padding-horizontal: 4px;
	border-radius: 4px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const mapStateToProps = (state, props) => {
	const favoritesdata = state.favorites.data
	return { favoritesdata }
}

const mapDispatchProps = (dispatch, props) => ({	

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

const GeneralItemComponent = memo(({ getAllFavoriteItemsRequest, favoritesdata, toogleFavorite, item }) => {
	const themeContext = useContext(ThemeContext)
	const colorSchema = useColorScheme()
	const navigation = useNavigation()
	const [ isFavorite, setisFavorite ] = useState(false)
	const isFocused = useIsFocused()

	useEffect(() => {
		if (isFocused) {
			getAllFavoriteItemsRequest()
		}
	}, [isFocused])

	useEffect(() => {
		if (favoritesdata.length > 0) {
			const favoriteItem = favoritesdata.find(
				(element) => element._id === item._id,
			)

			if (favoriteItem !== undefined) {
				setisFavorite(true)
				// console.log('Es favorito');
			}
			else {
				// console.log('No es favorito');
				setisFavorite(!true)
			}
		}
}, [isFocused, item])
	
	const _isFavorite = () => {
		setisFavorite(!isFavorite)		
		toogleFavorite(item)
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
		<Touchable key={item._id} onPress={() => _onPressItem(item)}>
			<Card>
				<CardTop>
					{item.status !== '' ? (
						<StatusContainer>
							<ETASimpleText
								size={10}
								weight={
									Platform.OS === 'ios'
										? '400'
										: '300'
								}
								color='white'
								align='center'>
								{item.status}
							</ETASimpleText>
						</StatusContainer>
					) : null}
					{/* <ETAProgressiveImage
						thumbnailSource={{ uri: `${item.images[0].image}?w=50&buster=${Math.random()}` }}
						source={{ uri: `${item.images[0].image}?w=${width * 2}&buster=${Math.random()}` }}
						style={{
							width: '100%',
							height: '100%', 
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15
						}}
					/> */}
					<ItemImage
						source={{
							uri: item.images[0].image,
						}}
						// style={{
						// 	height: PixelRatio.getPixelSizeForLayoutSize(size),
						// 	width: PixelRatio.getPixelSizeForLayoutSize(size)
						// }}
					/>
				</CardTop>
				<CardBottom
					style={{
						borderWidth: colorSchema === 'dark' ? 0.4 : 0.75
					}}
				>
					<NameContainer>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '400'
									: '600'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'
							style={{zIndex: 100}}>
							{truncateString(item.name, 26)}
						</ETASimpleText>
					</NameContainer>
					<ShopContainer>
						<PriceContainer>
							<ETASimpleText
								size={13}
								weight={
									Platform.OS === 'ios'
										? '400'
										: '600'
								}
								color={
									themeContext.PRIMARY_COLOR
								}
								align='left'
								style={{
									zIndex: 100,
								}}>
								$
								{currencySeparator((
									((100 - item.discount) *
										item.price) /
									100
								).toFixed(2))}
							</ETASimpleText>
								{item.discount > 0 ? (
									<PercentContainer>
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
											-
											{
												item.discount
											}
											%
										</ETASimpleText>
									</PercentContainer>
								) : null}
						</PriceContainer>
						
						<DiscountContainer>
							{item.discount > 0 ? (
								<>
									<ETASimpleText
										size={10}
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
										{currencySeparator(item.price.toFixed(
											2,
										))}
									</ETASimpleText>
								</>
							) : null}
						</DiscountContainer>
						{
							item.points > 0
							?	<PointsContainer2>
									<ETASimpleText
										size={9}
										weight={Platform.OS === 'ios' ? '400' : '400'}
										color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
										align='center'
										// style={{
										// 	elevation: 4,
										// 	textShadowColor: 'rgba(0, 0, 0, 0.7)',
										// 	textShadowOffset: {
										// 		width: 0.1,
										// 		height: 0.2,
										// 	},
										// 	textShadowRadius: 1.5,
										// }}
									>
										{item.points}° pts
									</ETASimpleText>
								</PointsContainer2>
							:	null
						}
						{/* <FavoriteContainer>
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
						</FavoriteContainer> */}
						{/* {
                item.discount !== 0
                ? <ETASimpleText size={10} weight={Platform.OS === 'ios' ? '400' : '400'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'center'}
                    style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                    ${(item.price.toFixed(2))}
                  </ETASimpleText>
                : null
              } */}
						{/* <TouchableCart>
              <Ionicons name='md-cart' size={16} color={themeContext.PRIMARY_COLOR} />
            </TouchableCart> */}
					</ShopContainer>
				</CardBottom>
			</Card>
		</Touchable>
	)
})

const GeneralItemComponenttConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(GeneralItemComponent)

export default GeneralItemComponenttConnect
