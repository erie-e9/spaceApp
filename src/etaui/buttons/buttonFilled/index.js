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
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	height: 40px;
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
						backgroundColor: colorButton,
						paddingLeft: padding || 20,
						paddingRight: padding || 20,
						borderRadius,
					}}
					onPress={onPress}
					disabled={disabled || false}>
					{disabled ? (
						<ActivityIndicator
							color={
								colorButton === 'white'
									? themeContext.PRIMARY_COLOR
									: 'white'
							}
						/>
					) : (
						<ETASimpleText
							size={13}
							weight='400'
							color={
								colorButton === 'white'
									? 'gray'
									: 'white'
							}
							align={align}>
							{title || 'Text'}
						</ETASimpleText>
					)}
				</Touchable>
			</Root>
		</>
	)
}

export default ETAButtonFilled
