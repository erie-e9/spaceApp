import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ETASimpleText} from '@etaui'
import {Feather} from '@icons'
import Card from './Card'

const Root = styled.ScrollView`
	flex: 1;
	flex-direction: column;
	padding-top: 15px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const Touchable = styled.TouchableWithoutFeedback`
	z-index: 100;
`
const HelpContainer = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	min-height: 50px;
	padding: 2.5px 10px;
	background-color: transparent;
	margin-vertical: 0px;
`
const LeftContainer = styled.View`
	flex: 0.9;
	flex-direction: column;
	padding: 1px 10px;
	background-color: transparent;
`
const IconContainer = styled.View`
	flex: 0.1;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`

const HelpComponent = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()

	return (
		<Root>
			<Touchable
				onPress={() =>
					navigation.navigate('SettingsNavigator', {
						screen: 'AboutUsScreen',
					})
				}>
				<HelpContainer>
					<LeftContainer>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '700'
									: '800'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							About us
						</ETASimpleText>
						<Card
							headTitle=' '
							message='All info about us and our success factory.'
						/>
					</LeftContainer>
					<IconContainer>
						<Feather
							name='chevron-right'
							size={15}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
						/>
					</IconContainer>
				</HelpContainer>
			</Touchable>

			<Touchable
				onPress={() =>
					navigation.navigate('SettingsNavigator', {
						screen: 'ContactUsScreen',
					})
				}>
				<HelpContainer>
					<LeftContainer>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '700'
									: '800'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							Contact us
						</ETASimpleText>
						<Card
							headTitle=' '
							message='Hey talk with us, you have doubts, recommendations or complaints? we´ll be a pleasure heard you.'
						/>
					</LeftContainer>
					<IconContainer>
						<Feather
							name='chevron-right'
							size={15}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
						/>
					</IconContainer>
				</HelpContainer>
			</Touchable>

			<Touchable
				onPress={() =>
					navigation.navigate('SettingsNavigator', {
						screen: 'FAQSScreen',
					})
				}>
				<HelpContainer>
					<LeftContainer>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '700'
									: '800'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							FAQ
						</ETASimpleText>
						<Card
							headTitle=' '
							message='Frequently asked questions about our company and products.'
						/>
					</LeftContainer>
					<IconContainer>
						<Feather
							name='chevron-right'
							size={15}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
						/>
					</IconContainer>
				</HelpContainer>
			</Touchable>

			<Touchable
				onPress={() =>
					navigation.navigate('SettingsNavigator', {
						screen: 'TermsOfServiceScreen',
					})
				}>
				<HelpContainer>
					<LeftContainer>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '700'
									: '800'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							Terms of service
						</ETASimpleText>
						<Card
							headTitle=' '
							message='See our terms of service.'
						/>
					</LeftContainer>
					<IconContainer>
						<Feather
							name='chevron-right'
							size={15}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
						/>
					</IconContainer>
				</HelpContainer>
			</Touchable>

			<Touchable
				onPress={() =>
					navigation.navigate('SettingsNavigator', {
						screen: 'NoticeOfPrivacyScreen',
					})
				}>
				<HelpContainer>
					<LeftContainer>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '700'
									: '800'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							Notice of privacy
						</ETASimpleText>
						<Card
							headTitle=' '
							message='See our notice of privacy and use of this application.'
						/>
					</LeftContainer>
					<IconContainer>
						<Feather
							name='chevron-right'
							size={15}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
						/>
					</IconContainer>
				</HelpContainer>
			</Touchable>
		</Root>
	)
}

export default HelpComponent
