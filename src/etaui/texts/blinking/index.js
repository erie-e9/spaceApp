import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'

const Text = styled.Text`
	align-items: center;
	justify-content: center;
`

const ETABlinkingText = ({
	children,
	size,
	weight,
	color,
	align,
	onPress,
	style,
	time,
}) => {
	const [textBlink, settextBlink] = useState(true)

	useEffect(() => {
		let isUnMounted = false
		let isSubscribed = true
		setInterval(() => {
			settextBlink(!textBlink)
		}, 1000)
		
		return () => {
			isUnMounted = true
		}
	}, [textBlink])

	return (
		<Text
			onPress={onPress || null}
			style={{
				textAlign: align || 'center',
				color: color || 'black',
				fontWeight: weight || '500',
				fontSize: size || 14,
				...style,
			}}>
			{textBlink === true ? children : ' '}
		</Text>
	)
}

// export default React.memo(ETABlinkingText);
export default ETABlinkingText
