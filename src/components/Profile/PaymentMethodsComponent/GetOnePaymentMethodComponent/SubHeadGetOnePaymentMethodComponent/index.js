import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {ETASimpleText, ETAButtonOutline, ETAButtonFilled} from '@etaui'
import Card from './Card'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: center;
	padding-top: 15px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const DataContainer = styled.View`
	flex-direction: column;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	padding: 5px 15px;
`

const HeadGetOnePaymentMethodComponent = () => {
	const themeContext = useContext(ThemeContext)
	const route = useRoute()
	const {item} = route.params

	return (
		<Root>
			<DataContainer>
				<ETASimpleText
					size={15}
					weight={Platform.OS === 'ios' ? '400' : '800'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='left'>
					Card number
				</ETASimpleText>
				<Card
					headTitle={item.details}
					message='16 digits of your card number'
				/>
			</DataContainer>

			<DataContainer>
				<ETASimpleText
					size={15}
					weight={Platform.OS === 'ios' ? '400' : '800'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='left'>
					Owner
				</ETASimpleText>
				<Card
					headTitle={item.owner}
					message='Name owner is printed in card'
				/>
			</DataContainer>

			<DataContainer>
				<ETASimpleText
					size={15}
					weight={Platform.OS === 'ios' ? '400' : '800'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='left'>
					Expiration date
				</ETASimpleText>
				<Card
					headTitle={item.expDate}
					message='Date expirate of your card'
				/>
			</DataContainer>

			<DataContainer>
				<ETASimpleText
					size={15}
					weight={Platform.OS === 'ios' ? '400' : '800'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='left'>
					Alias
				</ETASimpleText>
				<Card
					headTitle='BBVA first card'
					message='A name that you can identify faster each card'
				/>
			</DataContainer>

			<ETAButtonOutline
				title='Set default'
				// onPress={handleSubmit}
				// disabled={isSubmitting ? true : false}
				colorButton={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
				padding={10}
				width={240}
				borderRadius={3}
				borderWidth={0.3}
			/>
			<ETAButtonFilled
				title='Remove'
				// onPress={handleSubmit}
				// disabled={isSubmitting ? true : false}
				colorButton={themeContext.SECONDARY_BACKGROUND_COLOR}
				padding={10}
				width={240}
				borderRadius={3}
				borderWidth={0.7}
			/>
		</Root>
	)
}

export default HeadGetOnePaymentMethodComponent
