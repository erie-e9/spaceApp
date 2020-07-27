import React, {useState, useContext, useRef} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {TouchableWithoutFeedback, Animated, Easing} from 'react-native'
import {ETASimpleText} from '@etaui'

const Root = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const Switch = styled.View`
	flex-direction: row;
	align-items: flex-start;
	height: 20px;
	width: 40px;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	margin: 10px;
	border-radius: 20px;
	padding: 1px;
	background-color: transparent;
	z-index: 1000;
`
const IndicatorContainer = styled.View`
	flex-direction: row;
	align-items: center;
	position: absolute;
	bottom: 3px;
	width: 100%;
	justify-content: space-between;
	padding-horizontal: 5px;
	background-color: transparent;
	z-index: 10;
`

const ETASwitch = ({color, onChange, activated}) => {
	const animation = useRef(new Animated.Value(activated ? 1 : 0)).current
	const [toggled, setToggled] = useState(!!activated)
	const themeContext = useContext(ThemeContext)
	const [containerWidth] = useState(0)

	const _switchAnimated = () => {
		setToggled(!toggled)
		if (!toggled) {
			Animated.timing(animation, {
				duration: 100,
				toValue: 1,
				easing: Easing.materialUIStandard,
				useNativeDriver: true,
			}).start()
		} else {
			Animated.timing(animation, {
				duration: 100,
				toValue: 0,
				easing: Easing.materialUIStandard,
				useNativeDriver: true,
			}).start()
		}
	}

	return (
		<Root>
			<TouchableWithoutFeedback
				onPress={() => {
					onChange()
					_switchAnimated()
				}}
				style={{flex: 1}}>
				<Switch activated={activated}>
					<Animated.View
						style={[
							{
								height: 18,
								width: 18,
								borderRadius: 9,
								backgroundColor:
									color || '#333',
								justifyContent: 'center',
								bottom: 0.5,
								transform: [
									{
										translateX: animation.interpolate(
											{
												inputRange: [
													0,
													1,
												],
												outputRange: [
													0,
													containerWidth +
														18.5,
												],
											},
										),
									},
								],
							},
						]}
					/>
					<IndicatorContainer>
						<ETASimpleText
							size={11}
							weight={Platform.OS === 'ios' ? '700' : '800'}
							color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
							align='left'>
							o
						</ETASimpleText>
						<ETASimpleText
							size={11}
							weight='300'
							color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
							align='left'>
							|
						</ETASimpleText>
					</IndicatorContainer>
				</Switch>
			</TouchableWithoutFeedback>
		</Root>
	)
}

export default React.memo(ETASwitch);
