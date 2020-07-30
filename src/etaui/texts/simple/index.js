import React from 'react'
import styled from 'styled-components/native'

const Text = styled.Text`
	align-items: center;
	justify-content: center;
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
			fontSize: size || 14,
			...style,
		}}>
		{children || 'Text'}
	</Text>
)

export default ETASimpleText
