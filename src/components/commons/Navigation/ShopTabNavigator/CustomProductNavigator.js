
import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import {Ionicons} from '@icons'
import CustomProductScreen from '@screens/CustomProduct/CustomProductScreen'
import {ETASimpleText} from '@etaui'

const HeaderLeftCard = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 5, bottom: 5, right: 5, left: 5}
})`
	height: 22px;
	width: 22px;
	z-index: 100;
	justify-content: center;
	align-items: center;
	margin-left: 15px;
	margin-top: 25px;
	border-radius: 15px;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const CustomProductStack = createStackNavigator()
const CustomProductNavigator = () => {
	const themeContext = useContext(ThemeContext)
	return (
		<CustomProductStack.Navigator>
			<CustomProductStack.Screen
				name='CustomProductScreen'
				component={CustomProductScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '500',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
					},
					headerLeft: () => (
						<HeaderLeftCard
							onPress={() => navigation.goBack()}>
							<Ionicons
								name='md-close'
								size={18}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeftCard>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forModalPresentationIOS,
				})}
			/>
		</CustomProductStack.Navigator>
	)
}

export default CustomProductNavigator
