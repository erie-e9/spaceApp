import React, { useContext, memo } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { ETASimpleText } from '@etaui'
import { truncateString } from '@functions'

const Root = styled.View`
	flex: 1;
	flex-direction: row;
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
	background-color: transparent;
`
const CounterContainer = styled.View`
	flex: 0.2;
	justify-content: center;
	align-items: flex-start;
	background-color: transparent
`
const BadgeContainer = styled.View`
	min-height: 20px;
	min-width: 20px;
	border-radius: 11px;
	padding-vertical: 1px;
	justify-content: center;
	align-items: center;
	border-width: 0.7px;
	z-index: 100;
	border-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	background-color: #25D366;
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
					{truncateString(text, 30)}
				</ETASimpleText>
			</ChatContentContainer>
			<CounterContainer>
				<BadgeContainer>
					<ETASimpleText
						size={8.5}
						weight={
							Platform.OS === 'ios'
								? '600'
								: '600'
						}
						color='white'
						align='left'>
						1
					</ETASimpleText>
				</BadgeContainer>
			</CounterContainer>
		</Root>
	)
})

export default CardBody
