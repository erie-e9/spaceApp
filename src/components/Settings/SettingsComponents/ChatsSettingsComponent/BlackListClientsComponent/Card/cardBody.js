import React, { useContext, memo } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { ETASimpleText } from '@etaui'
import { truncateString } from '@functions'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: center;
	padding-horizontal: 10px;
	padding-right: 20px;
	border-bottom-width: 0px;
	border-bottom-color: ${(props) => props.theme.GRAYFACEBOOK};
`
const ChatContentContainer = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	padding-horizontal: 10px;
`

const CardBody = memo(({text}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root>
			<ChatContentContainer>
				<ETASimpleText
					size={14}
					weight={Platform.OS === 'ios' ? '500' : '300'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'>
					{truncateString(text, 35)}
				</ETASimpleText>
			</ChatContentContainer>
		</Root>
	)
})

export default CardBody
