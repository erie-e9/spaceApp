import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'
import { variables } from '@utils/constants'

const logoSize = 70
const avatarRadius = logoSize / 2

const Root = styled.View`
	flex: 0.3;
	justify-content: center;
	align-items: center;
`
const LogoContainer = styled.View`
	flex-direction: row;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${Platform.OS === 'ios' ? logoSize + 20 : logoSize + 20}px;
	height: ${Platform.OS === 'ios' ? logoSize + 20 : logoSize + 20}px;
	border-radius: ${avatarRadius + 10}px;
	background-color: #ffffff;
	margin-vertical: 30px;
	border-width: 0.3px;
	border-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
`
const Logo = styled.Image`
	width: ${Platform.OS === 'ios' ? logoSize : logoSize}px;
	height: ${Platform.OS === 'ios' ? logoSize : logoSize}px;
	border-radius: ${avatarRadius}px;
`

const SigninHead = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root>
			<ETASimpleText
				size={25}
				weight={Platform.OS === 'ios' ? '400' : '300'}
				color={themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT}
				align='left'>
				{variables.COMPANYNAME}
			</ETASimpleText>
			<LogoContainer>
				<Logo source={require('@assets/icons/app-icon.png')} />
			</LogoContainer>
			<ETASimpleText
				size={13}
				weight={Platform.OS === 'ios' ? '300' : '300'}
				color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
				align='left'>
				{variables.COMPANYSLOGAN}
			</ETASimpleText>
		</Root>
	)
}

export default React.memo(SigninHead)
