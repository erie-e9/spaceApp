import React, {useContext} from 'react'
import {Platform} from 'react-native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText} from '@etaui'

const Item = styled.View`
	width: 40px;
	height: 60px;
	border-radius: 20px;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	margin: 4px 9px;
	justify-content: center;
	align-items: center;
`
const ItemImage = styled.Image`
	width: 40px;
	height: 60px;
	border-radius: 20px;
`
const NewContainer = styled.View`
	justify-content: flex-end;
	position: absolute;
	height: 12px;
	width: 23px;
	bottom: 12px;
	right: 8px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	border-radius: 4px;
	border-width: 1.3px;
	border-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const CategoryItem = ({itemcat}) => {
	const themeContext = useContext(ThemeContext)

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
				{itemcat.name}
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
						new
					</ETASimpleText>
				</NewContainer>
			) : null}
		</>
	)
}

export default React.memo(CategoryItem)
