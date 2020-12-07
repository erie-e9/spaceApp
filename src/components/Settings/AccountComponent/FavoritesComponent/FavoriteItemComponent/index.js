import React, { useState, useContext, useEffect, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Platform, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText } from '@etaui'
import { Ionicons } from '@icons'
import { connect } from 'react-redux'
import { TOGGLE_FAVORITE } from '@redux/profile/favorites/actions'
import { currencySeparator, truncateString } from '@functions'
import LottieView from 'lottie-react-native'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex-direction: column;
	min-height: 80px;
	width: ${width}px;
`
const Item = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-height: 50px;
	padding-horizontal: 5px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	shadow-offset: 2px 3px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ItemImage = styled.Image`
	height: 60px;
	width: 60px;
	border-radius: 5px;
	margin-left: 5px;
`
const FavoriteItemData = styled.View`
	flex: 1;
	flex-direction: column;
	margin-left: 15px;
	align-items: flex-start;
	justify-content: center;
	background-color: transparent;
`
const FavoriteItemHeadContainer = styled.View`
	min-height: 30px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 5px 5px 0px 5px;
	background-color: transparent;
`
const FavoriteTitleContainer = styled.View`
	flex: 1;
	align-items: flex-start;
	background-color: transparent;
`
const CardItemFunctions = styled.View`
	flex: 0.1;
	align-items: flex-end;
	justify-content: center;
	margin: 10px 10px 10px 0px;
	z-index: 1000;
	background-color: transparent;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	min-height: 25px;
	min-width: 25px;
`
const FavoriteItemContainer = styled.View`
	flex-direction: row;
	width: 100%;
	background-color: transparent;
`
const FavoriteItemLeftContainer = styled.View`
	flex: 0.9;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding-horizontal: 2px;
	background-color: transparent;
`
const DescriptionContainer = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	z-index: 100;
	border-width: 0px;
	padding-horizontal: 5px;
	padding-vertical: 3px;
	border-color: white;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	background-color: transparent;
`
const FavoriteItemRightContainer = styled.View`
	flex: 0.1;
	align-items: center;
	justify-content: center;
	margin: 0px 10px 0px 0px;
	padding-horizontal: 2px;
	background-color: transparent;
`
const AddFavoriteContainer = styled.View`
	flex: 0.5;
	flex-direction: row;
	align-items: flex-end;
	justify-content: center;
	margin: 0px 10px 10px 0px;
	padding-horizontal: 2px;
	position: absolute;
	border-radius: 20px;
	z-index: 1000;
`
const AddFavorite = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	flex-direction: row;
	height: 30px;
	width: 30px;
	padding-horizontal: 5px;
	z-index: 1000;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`

const mapDispatchProps = (dispatch, props) => ({
	toggleFavorite: (paramItem) => {
		dispatch({
			type: TOGGLE_FAVORITE,
			payload: {
				paramItem,
			}
		})
	},
})

const FavoriteItemComponent = ({ toggleFavorite, item, howMany }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ addedCounter, setaddedCounter ] = useState()
	const heart = useRef(false)

	useEffect(() => {
		let isUnMounted = false
		setaddedCounter(howMany)
		
		return () => {
			isUnMounted = true
		}
	}, [howMany])

	const _removeFromFavorite = async (paramItem) => {
		toggleFavorite(paramItem)
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
			<Item>
				<Touchable onPress={() => _onPressItem(item)}>
					<ItemImage source={{uri: item.images[0].image}} />
				</Touchable>
				<FavoriteItemData>
					<FavoriteItemHeadContainer>
						<FavoriteTitleContainer>
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
						</FavoriteTitleContainer>
						{/* <CardItemFunctions>
							<FavoriteItemRightContainer>
								<AddFavoriteContainer>
									<AddFavorite
										onPress={() =>
											_removeFromFavorite(
												item,
											)
										}>
										<LottieView
											ref={heart}
											source={require('@assets/heart2.json')}
											style={{ height: 35, backgroundColor: 'transparent' }}
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
											progress={1}
											autoSize={true}
									/>
									</AddFavorite>
								</AddFavoriteContainer>
							</FavoriteItemRightContainer>
						</CardItemFunctions> */}
					</FavoriteItemHeadContainer>
					<FavoriteItemContainer>
						<FavoriteItemLeftContainer>
							<DescriptionContainer>
								<ETASimpleText
									size={11}
									weight={
										Platform.OS ===
										'ios'
											? '400'
											: '300'
									}
									color={
										themeContext.PRIMARY_TEXT_COLOR_LIGHT
									}
									align='left'
									style={{
										zIndex: 100,
									}}>
									{truncateString(item.details, 70)}
								</ETASimpleText>
							</DescriptionContainer>
						</FavoriteItemLeftContainer>
						
						<FavoriteItemRightContainer>
							<AddFavoriteContainer>
								<AddFavorite
									onPress={() =>
										_removeFromFavorite(
											item,
										)
									}>
									<LottieView
										ref={heart}
										source={require('@assets/heart2.json')}
										style={{ height: 35, backgroundColor: 'transparent' }}
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
										progress={1}
										autoSize={true}
								/>
								</AddFavorite>
							</AddFavoriteContainer>
						</FavoriteItemRightContainer>
					</FavoriteItemContainer>
				</FavoriteItemData>
			</Item>
		</Root>
	)
}

const FavoriteItemComponentConnect = connect(
	null,
	mapDispatchProps,
)(FavoriteItemComponent)

export default React.memo(FavoriteItemComponentConnect)
