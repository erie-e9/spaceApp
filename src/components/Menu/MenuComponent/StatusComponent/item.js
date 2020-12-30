import React, { useContext } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText } from '@etaui'
import { useTranslation } from '@etaui/translate'
import * as RNLocalize from 'react-native-localize'

const _height = 45
const _width = 45

const ItemContainer = styled.View`
	justify-content: center;
	align-items: center;
	padding: 1.75px;
	border-radius: 50px;
	height: ${_height + 8}px;
	min-width: ${_width + 8}px;
	border-width: 2px;
	margin: 4px 3px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: transparent;
`
const Item = styled.View`
	height: ${_height}px;
	width: ${_width}px;
	border-radius: ${_width / 2}px;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`
const ItemImage = styled.Image`
	height: ${_height}px;
	width: ${_width}px;
	border-radius: ${_width / 2}px;
`
const NewContainer = styled.View`
	height: 12px;
	min-width: 23px;
	justify-content: flex-end;
	position: absolute;
	bottom: 12px;
	right: 8px;
	padding-horizontal: 2px;
	border-radius: 4px;
	border-width: 1.3px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	border-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const StatusItem = ({ item }) => {
	const themeContext = useContext(ThemeContext)
	let languageCode = RNLocalize.getLocales()
	const { isnew } = useTranslation()

	return (
		<>
			<ItemContainer>
				<Item>
					<ItemImage source={{uri: item.image}} />
				</Item>
			</ItemContainer>
			<ETASimpleText
				size={8.5}
				weight={Platform.OS === 'ios' ? '400' : '200'}
				color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
				align='center'>
				{	languageCode[0].languageCode === 'en'
					?	`${item.en.name.charAt(0).toUpperCase() + item.en.name.slice(1)}`
					:	`${item.es.name.charAt(0).toUpperCase() + item.es.name.slice(1)}`
				}
			</ETASimpleText>
			{item.isNew ? (
				<NewContainer>
					<ETASimpleText
						size={8}
						weight={
							Platform.OS === 'ios' ? '400' : '200'
						}
						// color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
						color='white'
						align='center'>
						{isnew}
					</ETASimpleText>
				</NewContainer>
			) : null}
		</>
	)
}

export default React.memo(StatusItem)
