import React, { useContext } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import {
	Fontisto,
	AntDesign,
	FontAwesome,
	SimpleLineIcons,
	Octicons,
} from '@icons'
import { ETASimpleText, ETALink } from '@etaui'
import { variables } from '@utils/constants'
import { useTranslation } from '@etaui/translate'

const iconSize = 23

const Root = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const InfoContainer = styled.View`
	flex-direction: row;
	min-width: 240px;
	justify-content: flex-start;
	align-items: center;
	padding-vertical: 2px;
	background-color: transparent;
`
const TitleContainer = styled.View`
	margin-left: 15px;
`
const LinkContainer = styled.View``
const Touchable = styled.TouchableWithoutFeedback`
	z-index: 100;
	width: 100%;
`
const TouchableContainer = styled.View`
	z-index: 100;
	width: 75%;
	justify-content: center;
	align-items: center;
	align-self: center;
	margin-top: 10px;
	background-color: transparent;
`
const ButtonContainer = styled.TouchableOpacity`
	height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	background-color: ${props => props.theme.GRAYFACEBOOK};
`

const SubHeadAboutUsComponent = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const { main_branch_offices_text,
		customer_client_center,
		add_whatsapp,
		like_facebook,
		follow_twitter,
		follow_instagram,
		link_text_web,
		need_help,
		faq_text_link
	} = useTranslation()

	return (
		<Root>
			<InfoContainer>
				<ButtonContainer>
					<AntDesign
						name='phone'
						size={iconSize - 6}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
					/>
				</ButtonContainer>
				<TitleContainer>
					<ETALink
						url={`tel:${variables.COMPANYPHONE1}`}
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='justify'
						children={main_branch_offices_text.charAt(0).toUpperCase() + main_branch_offices_text.slice(1)}
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<ButtonContainer>
					<AntDesign
						name='phone'
						size={iconSize - 6}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
					/>
				</ButtonContainer>
				<TitleContainer>
					<ETALink
						url={`tel:${variables.COMPANYPHONE2}`}
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='justify'
						children={customer_client_center.charAt(0).toUpperCase() + customer_client_center.slice(1)}
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<ButtonContainer>
					<FontAwesome
						name='whatsapp'
						size={iconSize - 6}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
					/>
				</ButtonContainer>
				<TitleContainer>
					<ETALink
						url={`https://wa.me/${variables.COMPANYWHATSAPP}`}
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='justify'
						children={add_whatsapp.charAt(0).toUpperCase() + add_whatsapp.slice(1)}
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<ButtonContainer>
					<SimpleLineIcons
						name='social-facebook'
						size={iconSize - 6}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
					/>
				</ButtonContainer>
				<TitleContainer>
					<ETALink
						url={variables.COMPANYFACEBOOK}
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='justify'
						children={like_facebook.charAt(0).toUpperCase() + like_facebook.slice(1)}
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<ButtonContainer>
					<SimpleLineIcons
						name='social-twitter'
						size={iconSize - 6}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
					/>
				</ButtonContainer>
				<TitleContainer>
					<ETALink
						url={variables.COMPANYTWITTER}
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='justify'
						children={follow_twitter.charAt(0).toUpperCase() + follow_twitter.slice(1)}
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<ButtonContainer>
					<SimpleLineIcons
						name='social-instagram'
						size={iconSize - 8}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
					/>
				</ButtonContainer>
				<TitleContainer>
					<ETALink
						url={variables.COMPANYINSTAGRAM}
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='justify'
						children={follow_instagram.charAt(0).toUpperCase() + follow_instagram.slice(1)}
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<ButtonContainer>
					<Fontisto
						name='world-o'
						size={iconSize - 8}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
					/>
				</ButtonContainer>
				<TitleContainer>
					<ETASimpleText
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '300'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='center'>
						{link_text_web.charAt(0).toUpperCase() + link_text_web.slice(1)}
					</ETASimpleText>
				</TitleContainer>
			</InfoContainer>
			<LinkContainer>
				<ETALink
					url={variables.COMPANYURL}
					size={13}
					weight={Platform.OS === 'ios' ? '300' : '200'}
					color={themeContext.LINK}
					align='center'
					text={variables.COMPANYURL}
				/>
			</LinkContainer>

			<InfoContainer>
				<ButtonContainer>
					<Octicons
						name='mail'
						size={iconSize - 6}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
					/>
				</ButtonContainer>
				<TitleContainer>
					<ETASimpleText
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '300'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='center'>
						{need_help.charAt(0).toUpperCase() + need_help.slice(1)}
					</ETASimpleText>
				</TitleContainer>
			</InfoContainer>
			<LinkContainer>
				<ETALink
					url={`mailto:${variables.COMPANYMAIL}`}
					size={13}
					weight={Platform.OS === 'ios' ? '300' : '200'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='center'
					text={variables.COMPANYMAIL}
				/>
			</LinkContainer>

			<InfoContainer>
				<Touchable
					onPress={() =>
						navigation.navigate('SettingsNavigator', {
							screen: 'FAQSScreen',
						})
					}>
					<TouchableContainer>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '300'
									: '200'
							}
							color={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							align='center'>
							{faq_text_link.charAt(0).toUpperCase() + faq_text_link.slice(1)}
						</ETASimpleText>
					</TouchableContainer>
				</Touchable>
			</InfoContainer>
		</Root>
	)
}

export default React.memo(SubHeadAboutUsComponent)
