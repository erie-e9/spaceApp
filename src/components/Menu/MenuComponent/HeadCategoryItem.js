import React, { useContext } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText } from '@etaui'
import { useTranslation } from '@etaui/translate'
import * as RNLocalize from 'react-native-localize'

const _height = 55
const _width = 37

const Item = styled.View`
	height: ${_height}px;
	width: ${_width}px;
	border-radius: ${_width / 2}px;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	margin: 4px 7px;
	justify-content: center;
	align-items: center;
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

const CategoryItem = ({itemcat}) => {
	const themeContext = useContext(ThemeContext)
	const { isnew } = useTranslation()
	let languageCode = RNLocalize.getLocales()

	return (
		<>
			<Item>
				<ItemImage source={{uri: itemcat.image}} />
			</Item>
			<ETASimpleText
				size={9}
				weight={Platform.OS === 'ios' ? '400' : '200'}
				color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
				align='center'>
				{languageCode === 'en' 
					?	itemcat.name
					:	itemcat.nombre
				}
			</ETASimpleText>
			{itemcat.isNew ? (
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

export default React.memo(CategoryItem)
