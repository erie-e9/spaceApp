import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'

const Root = styled.View`
	height: 120px;
	width: 100%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`

const ProfileHeadComponent = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root>
			<ETASimpleText
				size={42}
				weight={Platform.OS === 'ios' ? '400' : '600'}
				color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
				align='left'>
				100°
			</ETASimpleText>
			<ETASimpleText
				size={14}
				weight={Platform.OS === 'ios' ? '400' : '600'}
				color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
				align='left'>
				pts
			</ETASimpleText>
		</Root>
	)
}

export default React.memo(ProfileHeadComponent)
