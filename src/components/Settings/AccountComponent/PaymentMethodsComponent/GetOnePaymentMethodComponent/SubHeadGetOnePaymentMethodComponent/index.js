import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {ETASimpleText, ETAButtonOutline, ETAButtonFilled} from '@etaui'
import Card from './Card'
import { useTranslation } from '@etaui/translate'

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
	const { item } = route.params
	const { 
		set_default,
		remove,
		card_number,
		card_number_text,
		owner,
		owner_text,
		expiration_date,
		expiration_date_text,
		alias,
		alias_text
	} = useTranslation()

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
					{card_number.charAt(0).toUpperCase() + card_number.slice(1)}
				</ETASimpleText>
				<Card
					headTitle={item.details}
					message={card_number_text.charAt(0).toUpperCase() + card_number_text.slice(1)}
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
					{owner.charAt(0).toUpperCase() + owner.slice(1)}
				</ETASimpleText>
				<Card
					headTitle={item.owner}
					message={owner_text.charAt(0).toUpperCase() + owner_text.slice(1)}
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
					{expiration_date.charAt(0).toUpperCase() + expiration_date.slice(1)}
				</ETASimpleText>
				<Card
					headTitle={item.expDate}
					message={expiration_date_text.charAt(0).toUpperCase() + expiration_date_text.slice(1)}
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
					{alias.charAt(0).toUpperCase() + alias.slice(1)}
				</ETASimpleText>
				<Card
					headTitle={item.alias.charAt(0).toUpperCase() + item.alias.slice(1)}
					message={alias_text.charAt(0).toUpperCase() + alias_text.slice(1)}
				/>
			</DataContainer>

			<ETAButtonOutline
				title={set_default.charAt(0).toUpperCase() + set_default.slice(1)}
				// onPress={handleSubmit}
				// disabled={isSubmitting ? true : false}
				colorButton={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
				padding={10}
				width={240}
				borderRadius={3}
				borderWidth={0.3}
			/>
			<ETAButtonFilled
				title={remove.charAt(0).toUpperCase() + remove.slice(1)}
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
