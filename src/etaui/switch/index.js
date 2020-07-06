import React, {useState, useRef} from 'react'
import styled from 'styled-components/native'
import {TouchableWithoutFeedback, Animated, Easing} from 'react-native'

const Root = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const Switch = styled.View`
	height: 20px;
	width: 40px;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	margin: 10px;
	border-radius: 20px;
	align-items: flex-start;
	padding: 1px;
	background-color: transparent;
`

const ETASwitch = ({color, onChange, activated}) => {
	const animation = useRef(new Animated.Value(activated ? 1 : 0)).current
	const [toggled, setToggled] = useState(!!activated)
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
				<Switch>
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
				</Switch>
			</TouchableWithoutFeedback>
		</Root>
	)
}

// export default React.memo(ETASwitch);
export default ETASwitch
