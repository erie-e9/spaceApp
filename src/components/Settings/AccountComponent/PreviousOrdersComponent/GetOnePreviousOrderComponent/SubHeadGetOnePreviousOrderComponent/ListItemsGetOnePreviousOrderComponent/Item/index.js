import React, {useState, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {Platform, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ETASimpleText} from '@etaui'
import {currencySeparator} from '@functions'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex-direction: column;
	min-height: 80px;
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
	padding: 5px 5px 0px 5px;
	background-color: transparent;
`
const CartTitleContainer = styled.View`
	flex: 1;
	align-items: flex-start;
	background-color: transparent;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	min-height: 25px;
	min-width: 25px;
`
const CartItemContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	background-color: transparent;
`
const CartItemLeftContainer = styled.View`
	flex: 0.9;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 5px 0px 5px 0px;
	padding-horizontal: 2px;
	background-color: transparent;
`
const PriceContainer = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 4px;
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
	flex: 0.1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 5px 5px 10px 5px;
	padding-horizontal: 2px;
	background-color: transparent;
`
const AddCartContainer = styled.View`
	justify-content: center;
	align-items: center;
	align-self: center;
	position: absolute;
	flex-direction: row;
	min-height: 25px;
	min-width: 20px;
	border-radius: 12.5px;
	shadow-offset: 0px 1px;
	shadow-radius: 2px;
	shadow-opacity: 0.2;
	elevation: 0.3;
	z-index: 1000;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
`
const AddRemoveContainer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`
const CounterContainer = styled.View`
	height: 20px;
	width: 20px;
	border-radius: 12px;
	align-items: center;
	justify-content: center;
`

const ItemGetOnePreviousOrderComponent = ({ item }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ addedCounter, setaddedCounter ] = useState(1)

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
						</CartItemLeftContainer>
						<CartItemRightContainer>
							<AddCartContainer>
								<AddRemoveContainer>
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
								</AddRemoveContainer>
							</AddCartContainer>
						</CartItemRightContainer>
					</CartItemContainer>
				</CartItemData>
			</Item>
		</Root>
	)
}

export default React.memo(ItemGetOnePreviousOrderComponent)
