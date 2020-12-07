import React, { useState, useEffect, useContext, useRef, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native'
import { ETASimpleText } from '@etaui'

const Root = styled.View`
	min-height: 20px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-vertical: 0px;
	background-color: transparent;
`
const CheckBox = styled.View`
	height: 20px;
	width: 20px;
	border-width: 1.5px;
	margin: 0px 3px;
	border-radius: 3px;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const CheckBoxIndicator = styled.View`
	height: 14px;
	width: 14px;
	border-radius: 2px;
	background-color: transparent;
`
const TitleContainer = styled.View`
	justify-content: center;
	align-items: center;
`
const Touchable = styled.TouchableOpacity`
	min-height: 30px;
	padding: 0px 10px;
	justify-content: center;
	align-items: center;
	background-color: transparent
`

const ETACheckBox = memo(({
	title,
	checkedTitle,
	color,
	onChange,
	checked,
	onPressTitle,
}) => {
	const themeContext = useContext(ThemeContext)
	const animation = useRef(new Animated.Value(checked ? 1 : 0)).current

	useEffect(() => {
		let isUnMounted = false
        if (checked) {
            // console.log('checked');
            Animated.timing(animation, {
				duration: 100,
				toValue: 1,
				easing: Easing.materialUIStandard,
				useNativeDriver: true,
			}).start()
		} else {
            // console.log('!checked');
			Animated.timing(animation, {
				duration: 100,
				toValue: 0,
				easing: Easing.materialUIStandard,
				useNativeDriver: true,
			}).start()
		}
		
		return () => {
			isUnMounted = true
		}
	}, [checked])
	
	return (
		<Root>
			<TouchableWithoutFeedback
				onPress={onChange}
				style={{flex: 1}}>
				<CheckBox
					style={{
						borderColor: checked ? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.SECONDARY_BACKGROUND_COLOR
					}}
				>
					<Animated.View
						style={[
							{
								height: 14,
								width: 14,
								borderRadius: 2,
								backgroundColor:
									checked ? color : 'transparent',
								justifyContent: 'center',
								alignSelf: 'center',
								transform: [
									{
										scaleX: animation.interpolate(
											{
												inputRange: [0,1],
												outputRange: [0, 1],
											},
										),
									},
									{
										scaleY: animation.interpolate(
											{
												inputRange: [0,1],
												outputRange: [0, 1],
											},
										),
									},
								],
							},
						]}
					/>
				</CheckBox>
			</TouchableWithoutFeedback>

			<Touchable onPress={onPressTitle}>
				<TitleContainer>
					<ETASimpleText
						size={14}
						weight='400'
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='left'>
						{checked ? checkedTitle : title}
					</ETASimpleText>
				</TitleContainer>
			</Touchable>
		</Root>
	)
})

export default ETACheckBox
