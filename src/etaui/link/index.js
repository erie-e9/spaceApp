import React from 'react'
import { Linking } from 'react-native'
import { ETASimpleText } from '@etaui'

const ETALink = ({url, text, size, weight, color, align}) => {
	const openLink = () => {
		Linking.openURL(url).catch((err) =>
			console.error('An error occurred opening link', err),
		)
	}

	return (
		<>
			<ETASimpleText
				onPress={() => openLink()}
				size={size}
				weight={weight}
				color={color}
				align={align}>
				{text}
			</ETASimpleText>
		</>
	)
}

export default React.memo(ETALink)
