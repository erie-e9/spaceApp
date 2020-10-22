import React, {useContext} from 'react'
import {Platform} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {ETASimpleText} from '@etaui'

const Card = styled.View`
	flex-direction: row;
	margin-bottom: 1px;
	min-height: 20px;
	align-items: center;
	padding-horizontal: 10px;
	margin-top: 5px;
	background-color: transparent;
`
const MetadataInfo = styled.View`
	width: 100%;
	flex-direction: column;
	justify-content: center;
	padding-bottom: 5px;
	padding-horizontal: 1px;
	background-color: transparent;
`
const MessageContainer = styled.View`
	flex-direction: row;
	min-height: 20px;
	align-items: center;
	padding-horizontal: 0px;
	background-color: transparent;
`

const HelpCardComponent = ({message}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<>
			<Card>
				<MetadataInfo>
					<MessageContainer>
						<ETASimpleText
							size={11}
							weight={
								Platform.OS === 'ios'
									? '400'
									: '200'
							}
							color={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							align='left'>
							{message}
						</ETASimpleText>
					</MessageContainer>
				</MetadataInfo>
			</Card>
		</>
	)
}

export default HelpCardComponent
