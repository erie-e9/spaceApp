import React, {useContext} from 'react'
import {ActivityIndicator} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {ETASimpleText} from '@etaui'

const Root = styled.View`
	margin-vertical: 5px;
	padding-horizontal: 10px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	height: 38px;
	padding: 10px;
`

const ETAButtonFilled = ({
	title,
	onPress,
	disabled,
	colorButton,
	align,
	padding,
	borderRadius,
	width,
}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<>
			<Root>
				<Touchable
					style={{
						width,
						backgroundColor: disabled ? themeContext.THIRD_BACKGROUND_COLOR : colorButton,
						paddingLeft: padding || 20,
						paddingRight: padding || 20,
						borderRadius,
					}}
					onPress={onPress}
					disabled={disabled || false}>
					<ETASimpleText
						size={13}
						weight='400'
						// color={
						// 	colorButton === 'white'
						// 		? 'gray'
						// 		: 'white'
						// }
						color={
							disabled
							?	themeContext.SECONDARY_TEXT_BACKGROUND_COLOR_LIGHT
							:	colorButton === 'white' ? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : 'white'
						}
						align={align}>
						{title || 'Text'}
						</ETASimpleText>
				</Touchable>
			</Root>
		</>
	)
}

export default React.memo(ETAButtonFilled)
