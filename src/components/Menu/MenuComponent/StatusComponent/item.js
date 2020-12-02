import React, { useContext } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText } from '@etaui'

const _height = 45
const _width = 45

const ItemContainer = styled.View`
	padding: 1.75px;
	border-radius: 50px;
	height: ${_height + 8}px;
	width: ${_width + 8}px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	border-width: 2px;
	margin: 4px 6px;
	justify-content: center;
	align-items: center;
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
	justify-content: flex-end;
	position: absolute;
	height: 12px;
	width: 23px;
	bottom: 12px;
	right: 8px;
	border-radius: 4px;
	border-width: 1.3px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	border-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const StatusItem = ({item}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<>
			<ItemContainer>
				<Item>
					<ItemImage source={{uri: item.image}} />
				</Item>
			</ItemContainer>
			<ETASimpleText
				size={9}
				weight={Platform.OS === 'ios' ? '400' : '200'}
				color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
				align='center'>
				{item.title}
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
						new
					</ETASimpleText>
				</NewContainer>
			) : null}
		</>
	)
}

export default React.memo(StatusItem)
