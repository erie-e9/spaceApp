import React, {useContext} from 'react'
import {Platform, Dimensions} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import {
	Fontisto,
	AntDesign,
	FontAwesome,
	SimpleLineIcons,
	Octicons,
} from '@icons'
import {ETASimpleText, ETALink} from '@etaui'
import {variables} from '@utils/constants'

const {width} = Dimensions.get('window')
const iconSize = 23

const Root = styled.View`
	flex: 1;
	width: ${width - 30}px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const InfoContainer = styled.View`
	flex-direction: row;
	width: ${width - 30}px;
	justify-content: center;
	align-items: center;
	padding-vertical: 10px;
	background-color: transparent;
`
const TitleContainer = styled.View`
	margin-left: 15px;
`
const LinkContainer = styled.View``
const Touchable = styled.TouchableWithoutFeedback`
	z-index: 100;
`
const TouchableContainer = styled.View`
	z-index: 100;
`

const SubHeadAboutUsComponent = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()

	return (
		<Root>
			<InfoContainer>
				<AntDesign
					name='phone'
					size={iconSize - 6}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
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
						text='Main branch office'
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<AntDesign
					name='phone'
					size={iconSize - 6}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
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
						text='Customer client center'
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<FontAwesome
					name='whatsapp'
					size={iconSize - 6}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
				<TitleContainer>
					<ETALink
						url='https://wa.me/6181092045'
						size={13}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='justify'
						text='Add us on WhatsApp'
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<SimpleLineIcons
					name='social-facebook'
					size={iconSize - 6}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
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
						text='Like us on facebook'
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<SimpleLineIcons
					name='social-twitter'
					size={iconSize - 6}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
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
						text='Follow us on twitter'
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<SimpleLineIcons
					name='social-instagram'
					size={iconSize - 8}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
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
						text='Give us love on instagram'
					/>
				</TitleContainer>
			</InfoContainer>

			<InfoContainer>
				<Fontisto
					name='world-o'
					size={iconSize - 8}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
				<TitleContainer>
					<ETASimpleText
						size={13}
						weight={
							Platform.OS === 'ios' ? '500' : '300'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='center'>
						Visit our store online
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
				<Octicons
					name='mail'
					size={iconSize - 6}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
				<TitleContainer>
					<ETASimpleText
						size={13}
						weight={
							Platform.OS === 'ios' ? '500' : '300'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='center'>
						Need help?
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
						<TitleContainer>
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
								Have you seen our frecuently
								question asked section?
							</ETASimpleText>
						</TitleContainer>
					</TouchableContainer>
				</Touchable>
			</InfoContainer>
		</Root>
	)
}

export default React.memo(SubHeadAboutUsComponent)
