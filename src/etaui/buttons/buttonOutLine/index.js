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
	hitSlot: {top: 50, bottom: 50, right: 50, left: 50}
})`
	height: 40px;
	padding: 10px;
`

const ETAButtonOutline = ({
	title,
	onPress,
	disabled,
	colorButton,
	align,
	padding,
	borderRadius,
	width,
	borderWidth,
}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<>
			<Root>
				<Touchable
					style={{
						width,
						backgroundColor: 'transparent',
						borderColor: colorButton,
						borderWidth: borderWidth,
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
							size={14}
							weight='500'
							color={
								colorButton === 'white'
									? 'gray'
									: colorButton
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

export default React.memo(ETAButtonOutline)
