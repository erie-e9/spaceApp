import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {ETASimpleText} from '@etaui'
import {variables} from '@utils/constants'

const logoSize = 70
const avatarRadius = logoSize / 2

const Root = styled.View`
	flex: 0.3;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	padding: 15px;
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
	background-color: #ffffff;
`
const Logo = styled.Image`
	height: ${Platform.OS === 'ios' ? logoSize : 70}px;
	width: ${Platform.OS === 'ios' ? logoSize : 70}px;
	border-radius: ${avatarRadius}px;
`

const GeneralHeadComponent = ({imagePath}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root>
			<LogoContainer>
				<Logo source={imagePath} />
			</LogoContainer>
			<ContentContainer>
				<ETASimpleText
					size={17}
					weight={Platform.OS === 'ios' ? '400' : '300'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='left'>
					{variables.COMPANYNAME}
				</ETASimpleText>
				<ETASimpleText
					size={13}
					weight={Platform.OS === 'ios' ? '300' : '300'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'>
					{variables.COMPANYSLOGAN}
				</ETASimpleText>
			</ContentContainer>
		</Root>
	)
}

export default React.memo(GeneralHeadComponent)
