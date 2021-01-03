import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {ETASimpleText} from '@etaui'
import {variables} from '@utils/constants'

const logoSize = 35
const avatarRadius = logoSize / 2

const Root = styled.View`
	flex: 0.15;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
	padding-bottom: 20px;
`
const LogoContainer = styled.View`
	flex-direction: row;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60px;
	width: 60px;
	border-radius: ${avatarRadius}px;
	border-width: 0px;
	margin-horizontal: 10px;
	border-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
	background-color: #ffffff;
`
const Logo = styled.Image`
	height: ${Platform.OS === 'ios' ? logoSize : 40}px;
	width: ${Platform.OS === 'ios' ? logoSize : 40}px;
	border-radius: 5px;
`
const ContentContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	background-color: transparent;
`

const NoticeOfPrivacyComponent = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root>
			<LogoContainer>
				<Logo source={require('@assets/icons/app-icon.png')} />
			</LogoContainer>
			<ContentContainer>
				<ETASimpleText
					size={14}
					weight={Platform.OS === 'ios' ? '400' : '300'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='left'>
					{variables.COMPANYNAME}
				</ETASimpleText>
				<ETASimpleText
					size={11}
					weight={Platform.OS === 'ios' ? '400' : '300'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'
					style={{
						marginTop: 7
					}}>
					{variables.COMPANYSLOGAN}
				</ETASimpleText>
			</ContentContainer>
		</Root>
	)
}

export default React.memo(NoticeOfPrivacyComponent)
