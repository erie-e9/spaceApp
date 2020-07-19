import React, {useContext} from 'react'
import {Platform, Dimensions} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {ETASimpleText} from '@etaui'
import {EvilIcons} from '@icons'

const {width} = Dimensions.get('window')
const iconSize = 23

const Card = styled.View`
    flex-direction: row;
    width: ${width}px;
    min-height: 50px;
    justify-content: space-between;
    align-self: center;
    align-items: center;
    border-radius: 5px
    margin-bottom: 1px;
    background-color: transparent;
`
const MetadataInfo = styled.View`
	flex: 1;
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	padding-bottom: 5px;
	background-color: transparent;
`
const MetadaInfoHead = styled.View`
	min-height: 20px;
	width: ${width}px;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-horizontal: 10px;
	padding-right: 50px;
	background-color: transparent;
`
const IconContainer = styled.View`
	justify-content: center;
	align-items: center;
	padding-right: 5px;
	background-color: transparent;
`
const MetadaAnswerContainer = styled.View`
	min-height: 20px;
	width: ${width - 30}px;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-left: 40px;
	padding-top: 5px;
	background-color: transparent;
`

const AddressCardComponent = ({question, answer}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<>
			<Card>
				<MetadataInfo>
					<MetadaInfoHead>
						<IconContainer>
							<EvilIcons
								name='question'
								size={iconSize}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</IconContainer>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '500'
									: '800'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							{question}
						</ETASimpleText>
					</MetadaInfoHead>
					<MetadaAnswerContainer>
						<ETASimpleText
							size={11}
							weight={
								Platform.OS === 'ios'
									? '300'
									: '200'
							}
							color={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							align='left'>
							{answer}
						</ETASimpleText>
					</MetadaAnswerContainer>
				</MetadataInfo>
			</Card>
		</>
	)
}

export default AddressCardComponent
