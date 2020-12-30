import React,  { useContext } from 'react'
import styled,  { ThemeContext } from 'styled-components/native'
import  { Platform } from 'react-native'
import  { ETASimpleText } from '@etaui'
import  { fakeavatar } from '@utils/constants'
import { useTranslation } from '@etaui/translate'

const logoSize = 90
const avatarRadius = logoSize / 2

const Root = styled.View`
	flex: 0.3;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 15px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ContentContainer = styled.View`
	min-height: 20px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	padding: 10px 20px;
`
const LogoContainer = styled.View`
	height: ${Platform.OS === 'ios' ? logoSize + 10: logoSize + 10}px;
	width: ${Platform.OS === 'ios' ? logoSize + 10: logoSize + 10}px;
	border-radius: ${avatarRadius + 10}px;
	flex-direction: row;
	display: flex;
	justify-content: center;
	align-items: center;
	border-width: 0.3px;
	border-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`
const Logo = styled.Image`
	height: ${Platform.OS === 'ios' ? logoSize : logoSize}px;
	width: ${Platform.OS === 'ios' ? logoSize : logoSize}px;
	border-radius: ${avatarRadius}px;
`

const HeadProfileComponent = () => {
	const themeContext = useContext(ThemeContext)
	const { member_from } = useTranslation()

	return (
		<Root>
			<LogoContainer>
				<Logo source={{uri: fakeavatar}} />
			</LogoContainer>
			<ContentContainer>
				<ETASimpleText
					size={13}
					weight={Platform.OS === 'ios' ? '300' : '300'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'>
					{member_from.charAt(0).toUpperCase() + member_from.slice(1)} 15 jun 2017
				</ETASimpleText>
			</ContentContainer>
		</Root>
	)
}

export default React.memo(HeadProfileComponent)
