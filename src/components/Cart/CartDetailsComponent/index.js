import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Platform, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText, ETAButtonOutline, ETAButtonFilled, ETAToast } from '@etaui'
import { connect } from 'react-redux'
import { currencySeparator } from '@functions'
import DiscountCodeModal from '@commons/DiscountCodeModal'
import { useToast } from '@etaui/toast/useToast'
import { useTranslation } from '@etaui/translate'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 0.5;
`
const CartDetailsContainer = styled.View`
	flex-direction: column;
	width: ${width - 20}px;
	min-height: 200px
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
	position: absolute;
	padding: 25px 30px;
	bottom: 0px;
	justify-content: center;
	align-self: center;
	border-width: 0px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const SummaryContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	width: 100%;
	padding: 2px 10px;
	margin-top: 3px;
	background-color: transparent;
`
const DiscountCodeContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 40px;
	margin-vertical: 3px;
	padding-vertical: 5px;
	padding-horizontal: 10px;
	border-width: 0px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: transparent;
`
const TotalContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 40px;
	padding-vertical: 5px;
	padding-horizontal: 10px;
	border-width: 0px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: transparent;
`
const SummaryTotalContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	min-height: 30px;
	width: 100%;
	background-color: transparent;
`
const ButtonPayContainer = styled.View`
	height: 50px;
	width: 100%;
	align-items: center;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const {data} = state.cart
	return {data}
}

const CartDetailsComponent = ({ data }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ totalItems, settotalItems ] = useState(data.length)
	const [ totalState, settotalState ] = useState(0)
	const [ subtotalState, setsubtotalState ] = useState(0)
	const [ shippingState ] = useState(35)
	const [ isFancyModalVisible, setisFancyModalVisible ] = useState(false)
	const { showToast } = useToast()
	let subtotalValue = 0
	let sum = 0
	const { summary, item, items, subtotal, shipping, total, discount_code,  check_out } = useTranslation()

	useEffect(() => {
		let isUnMounted = false
		_getsumatory()
		
		return () => {
			isUnMounted = true
		}
	}, [data])

	const _getsumatory = async () => {
		await data.forEach((element) => {
			sum += element.howMany
			settotalItems(sum)
			subtotalValue =
				subtotalValue +
				(((100 - element.discount) * element.price) / 100) *
					element.howMany
		})

		setsubtotalState(subtotalValue)
		settotalState(subtotalValue + shippingState)
		// settotalItems(sum)
	}

	const _onPressItem = () => {
		navigation.navigate('CheckoutNavigator', {
			screen: 'PaymentScreen',
			params: {
				data: data,
				totalvalue: totalState,
				subtotal: subtotalState,
				totalItems
			},
		})
	}

	const _onPressToast = () => {
		showToast('Info', 'Error toast')
	}

	return (
		<Root>
			<CartDetailsContainer>
				<ETASimpleText
					size={15}
					weight={Platform.OS === 'ios' ? '600' : 'bold'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='left'>
					{summary.charAt(0).toUpperCase() + summary.slice(1)} ({data.length === 0 ? '0' : totalItems}{' '}
					{data.length === 0
						? `${items}`
						: totalItems === 1
						? `${item}`
						: `${items}`
					}
					)
				</ETASimpleText>
				<SummaryContainer>
					<ETASimpleText
						size={11}
						weight={
							Platform.OS === 'ios' ? '400' : '400'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='left'>
						{subtotal.charAt(0).toUpperCase() + subtotal.slice(1)}
					</ETASimpleText>

					<ETASimpleText
						size={11}
						weight={
							Platform.OS === 'ios' ? '400' : '400'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='left'>
						$
						{data.length === 0
							? data.length.toFixed(2)
							: currencySeparator(
								subtotalState.toFixed(2),
							  )}
					</ETASimpleText>
				</SummaryContainer>
				<SummaryContainer>
					<ETASimpleText
						size={11}
						weight={
							Platform.OS === 'ios' ? '400' : '400'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='left'>
						{shipping.charAt(0).toUpperCase() + shipping.slice(1)}
					</ETASimpleText>

					<ETASimpleText
						size={11}
						weight={
							Platform.OS === 'ios' ? '400' : '400'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='left'>
						$
						{data.length === 0
							? data.length.toFixed(2)
							: currencySeparator(
								shippingState.toFixed(2),
							  )}
					</ETASimpleText>
				</SummaryContainer>
				<TotalContainer>
					<SummaryTotalContainer>
						<ETASimpleText
							size={15}
							weight={
								Platform.OS === 'ios'
									? '600'
									: 'bold'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							{total.charAt(0).toUpperCase() + total.slice(1)}
						</ETASimpleText>

						<ETASimpleText
							size={15}
							weight={
								Platform.OS === 'ios'
									? '600'
									: 'bold'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							$
							{data.length === 0
								? data.length.toFixed(2)
								: currencySeparator(
									totalState.toFixed(2),
								  )}
						</ETASimpleText>
					</SummaryTotalContainer>
				</TotalContainer>
				<DiscountCodeContainer>
					<ETAButtonOutline
						title={discount_code.charAt(0).toUpperCase() + discount_code.slice(1)}
						onPress={() => setisFancyModalVisible(true)}
						// disabled={data.length === 0 ? true : false}
						colorButton={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						padding={10}
						width={240}
						borderRadius={3}
						borderWidth={0.3}
					/>
				</DiscountCodeContainer>
				<DiscountCodeModal
					isVisible={isFancyModalVisible}
					onSwipeComplete={() => setisFancyModalVisible(false)}
					closeModal={() => setisFancyModalVisible(false)}
				/>
				<ButtonPayContainer>
					<ETAButtonFilled
						title={`${check_out.charAt(0).toUpperCase() + check_out.slice(1)}`}
						onPress={() => _onPressItem()}
						disabled={data.length === 0 ? true : false}
						colorButton={
							themeContext.SECONDARY_BACKGROUND_COLOR
						}
						padding={10}
						width={240}
						borderRadius={3}
					/>
				</ButtonPayContainer>
				
				{/* <ButtonPayContainer>
					<ETAButtonFilled
						title='Toast'
						onPress={() => _onPressToast()}
						disabled={false}
						colorButton={
							themeContext.SECONDARY_BACKGROUND_COLOR
						}
						padding={10}
						width={240}
						borderRadius={3}
					/>
				</ButtonPayContainer>
				<ETAToast /> */}
			</CartDetailsContainer>
		</Root>
	)
}

const CartDetailsComponentConnect = connect(
	mapStateToProps,
	null,
)(CartDetailsComponent)

// export default CartDetailsComponentConnect
export default React.memo(CartDetailsComponentConnect)
