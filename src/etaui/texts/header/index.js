import React from 'react'
import styled from 'styled-components/native'

const Text = styled.Text`
	align-items: center;
	justify-content: center;
`

const ETAHeaderText = ({children, size, weight, color, align}) => (
	<Text
		style={{
			textAlign: align || 'left',
			color: color || 'black',
			fontWeight: weight || '500',
			fontSize: size || 26,
		}}>
		{children || 'Text'}
	</Text>
)

export default ETAHeaderText
