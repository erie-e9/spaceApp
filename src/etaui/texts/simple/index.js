import React from 'react'
import styled from 'styled-components/native'
import { PixelRatio } from 'react-native'

const Text = styled.Text`
	align-items: center;
	justify-content: center;
	font-size: 12px
`

const ETASimpleText = ({
	children,
	size,
	weight,
	color,
	align,
	onPress,
	style,
}) => (
	<Text
		onPress={onPress || null}
		/* eslint-disable no-alert, no-console */
		style={{
			textAlign: align || 'center',
			color: color || 'black',
			fontWeight: weight || '400',
			fontSize: size || PixelRatio.getFontScale(),
			...style,
		}}>
		{children !== '' ? children : children ? 'Text': null}
	</Text>
)

export default ETASimpleText
