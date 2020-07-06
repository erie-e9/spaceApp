import React from 'react'
import {TextInput} from 'react-native'
// https://snack.expo.io/@react-ui-kit/textinput-validation-regex

const ETAValidationInput = ({
	pattern,
	onChangeText,
	children,
	style,
	onValidation,
	...props
}) => {
	const handleValidation = (value) => {
		if (!pattern) {
			return true
		}
		// string pattern, one validation rule
		if (typeof pattern === 'string') {
			const condition = new RegExp(pattern, 'g')
			return condition.test(value)
		}
		// array patterns, multiple validation rules
		if (typeof pattern === 'object') {
			const conditions = pattern.map(
				(rule) => new RegExp(rule, 'g'),
			)
			return conditions.map((condition) => condition.test(value))
		}
	}

	const onChange = (value) => {
		const isValid = handleValidation(value)
		onValidation && onValidation(isValid)
		onChangeText && onChangeText(value)
	}

	return (
		<TextInput
			placeholderTextColor='#f1f1f1'
			style={style}
			onChangeText={(value) => onChange(value)}
			{...props}>
			{children}
		</TextInput>
	)
}

export default ETAValidationInput
