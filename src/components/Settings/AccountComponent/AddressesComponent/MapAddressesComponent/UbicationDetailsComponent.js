import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, Dimensions } from 'react-native'
import { ETASimpleText, ETAButtonOutline, ETAButtonFilled } from '@etaui'
import { useTranslation } from '@etaui/translate'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 0.6;
	align-items: center;
	align-self: center;
	flex-direction: column;
	min-height: 100px;
	width: ${width - 20}px;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
	position: absolute;
	padding: 10px 10px;
	bottom: -2px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	border-width: 0px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
`
const InfoContainer = styled.View`
	flex: 1;
	align-items: flex-start;
	min-height: 50px;
	align-self: flex-start;
	padding: 5px 5px;
	background-color: transparent;
`

const UbicationDetailsComponent = ({headTitle, details}) => {
	const themeContext = useContext(ThemeContext)
	const { set_default, save } = useTranslation()

	return (
		<Root
			style={{
				shadowColor: '#333',
				shadowOpacity: 0.5,
				shadowOffset: {height: 7},
				shadowRadius: 2,
				elevation: 5,
			}}>
			<InfoContainer>
				<ETASimpleText
					size={13}
					weight={Platform.OS === 'ios' ? '500' : '800'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='left'>
					{headTitle}
				</ETASimpleText>
				<ETASimpleText
					size={11}
					weight={Platform.OS === 'ios' ? '300' : '200'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'
					style={{
						marginTop: 5
					}}>
					{details}
				</ETASimpleText>
			</InfoContainer>
			<ETAButtonOutline
				title={set_default.charAt(0).toUpperCase() + set_default.slice(1)}
				// onPress={handleSubmit}
				// disabled={isSubmitting ? true : false}
				colorButton={
					themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
				}
				padding={10}
				width={240}
				borderRadius={3}
				borderWidth={0.3}
			/>
			<ETAButtonFilled
				title={save.charAt(0).toUpperCase() + save.slice(1)}
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

export default React.memo(UbicationDetailsComponent)
