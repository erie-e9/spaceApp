import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Platform, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText, ETAButtonOutline, ETAButtonFilled } from '@etaui'
import { connect } from 'react-redux'
import { currencySeparator } from '@functions'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 0.5;
`
const CartDetailsContainer = styled.View`
	flex-direction: column;
	width: ${width - 20}px;
	height: 100%;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
	position: absolute;
	padding: 25px 30px;
	align-self: center;
	bottom: 0px;
	border-width: 0px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ResumeContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	width: 100%;
	margin: 2px 0px 0px 0px;
	padding: 5px 10px;
	background-color: transparent;
`
const DirectionContainer = styled.View`
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
	margin-vertical: 3px;
	padding-vertical: 5px;
	padding-horizontal: 10px;
	border-width: 0px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: transparent;
`
const ResumeTotalContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	min-height: 30px;
	width: 100%;
	margin-vertical: 3px;
	padding-vertical: 5px;
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

const CartDetailsComponent = ({data}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [totalItems, settotalItems] = useState(data.length)
	const [total, settotal] = useState(0)
	const [subtotal, setsubtotal] = useState(0)
	const [shipping] = useState(35)
	const [isSubmitting] = useState(false)
	let subtotalValue = 0
	let sum = 0

	useEffect(() => {
		_getsumatory()
	}, [data])

	const _getsumatory = async () => {
		await data.forEach((element) => {
			sum += element.howMany
			settotalItems(sum)
			subtotalValue =
				subtotalValue +
				(((100 - element.discount) * element.price) / 100) *
					element.howMany
			// console.log('element.howMany', element.howMany)
			// console.log('element.howMany', ((100 - element.discount) * element.price / 100) )
			// console.log('______________subtotalValue:', subtotalValue)
		})

		setsubtotal(subtotalValue)
		settotal(subtotalValue + shipping)
		// settotalItems(sum)
	}

	const _onPressItem = () => {
		navigation.navigate('CheckoutNavigator', {
			screen: 'PaymentScreen',
			// params: {
			// 	item: propitem,
			// },
		})
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
					Summary ({data.length === 0 ? '0' : totalItems}{' '}
					{data.length === 0
						? 'items'
						: totalItems === 1
						? 'item'
						: 'items'}
					)
				</ETASimpleText>
				<ResumeContainer>
					<ETASimpleText
						size={11}
						weight={
							Platform.OS === 'ios' ? '400' : '400'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='left'>
						Subtotal
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
									subtotal.toFixed(2),
							  )}
					</ETASimpleText>
				</ResumeContainer>
				<ResumeContainer>
					<ETASimpleText
						size={11}
						weight={
							Platform.OS === 'ios' ? '400' : '400'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='left'>
						Shipping
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
									shipping.toFixed(2),
							  )}
					</ETASimpleText>
				</ResumeContainer>
				<TotalContainer>
					<ResumeTotalContainer>
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
							Total
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
										total.toFixed(2),
								  )}
						</ETASimpleText>
					</ResumeTotalContainer>
				</TotalContainer>
				<DirectionContainer>
					<ETAButtonOutline
						title='Send to Home'
						onPress={() =>
							navigation.navigate(
								'SettingsNavigator',
								{
									screen:
										'MapAddressesScreen',
									params: {
										data: {
											_id: 1,
											headTitle:
												'Home',
											details:
												'Josue Junction, Ohio, 12661 42616-7741, Liechtenstein.',
											latitude: 24.02574090527505,
											isDefault: true,
											longitude: -104.67300467638253,
										},
									},
								},
							)
						}
						disabled={false}
						colorButton={
							themeContext.PRIMARY_TEXT_COLOR_LIGHT
						}
						padding={10}
						width={250}
						borderRadius={3}
						borderWidth={0.3}
					/>
				</DirectionContainer>
				<ButtonPayContainer>
					<ETAButtonFilled
						title='Check out'
						onPress={() => _onPressItem()}
						disabled={!!isSubmitting}
						colorButton={
							themeContext.SECONDARY_BACKGROUND_COLOR
						}
						padding={10}
						width={isSubmitting ? 40 : 250}
						borderRadius={isSubmitting ? 20 : 3}
					/>
				</ButtonPayContainer>
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
