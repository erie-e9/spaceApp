import React, { useContext, memo } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { ETASimpleText } from '@etaui'
import { truncateString } from '@functions'

const Root = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-around;
	align-items: flex-start;
	margin: 0px 0px 2px 4px;
	border-bottom-width: 0px;
	border-bottom-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: transparent;
`
const ChatContentContainer = styled.View`
	flex: 1;
	min-width: 120px;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	background-color: transparent;
`
const CounterContainer = styled.View`
	flex: 0.12;
	justify-content: center;
	align-items: center;
	padding-horizontal: 5px;
	background-color: transparent
`
const BadgeContainer = styled.View`
	min-height: 20px;
	min-width: 20px;
	border-radius: 11px;
	padding-vertical: 1px;
	padding-horizontal: 3px;
	justify-content: center;
	align-items: center;
	border-width: 0.7px;
	z-index: 100;
	border-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	background-color: #25D366;
`

const CardBody = memo(({text, unreaded_massages}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root>
			<ChatContentContainer>
				<ETASimpleText
					size={14}
					weight={unreaded_massages > 0 ? 'bold' : '300'}
					color={unreaded_massages > 0 ? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'>
					{truncateString(text, 35)}
				</ETASimpleText>
			</ChatContentContainer>
			<CounterContainer>
				{
					unreaded_massages > 0
					?	<BadgeContainer>
							<ETASimpleText
								size={8.5}
								weight={
									Platform.OS === 'ios'
										? '600'
										: '600'
								}
								color='white'
								align='left'
								style={{
									elevation: 4,
									textShadowColor:
										themeContext.THIRD_TEXT_COLOR_LIGHT,
									textShadowOffset: {
										width: 0.5,
										height: 0.7,
									},
									textShadowRadius: 3,
								}}>
								{unreaded_massages}
							</ETASimpleText>
						</BadgeContainer>
					:	null
				}
			</CounterContainer>
		</Root>
	)
})

export default CardBody
