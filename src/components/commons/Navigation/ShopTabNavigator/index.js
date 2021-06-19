import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
// import { eq, multiply, greaterThan, cond } from 'react-native-reanimated';
// import { withTransition } from 'react-native-redash';
import { SubMenuNavigator, GetOneItemNavigator, CustomProductNavigator } from './MenuNavigator'
import { ChatItemNavigator, NewChatNavigator } from './ChatNavigator'
import { CheckoutNavigator } from './CartNavigator'
import { SettingsNavigator } from './SettingsNavigator'
import { AuthNavigator } from './AuthNavigator'
import ShopTabNavigator from './ShopTabNavigator'

const Stack = createStackNavigator()
const ShopNavigator = () => (
	<Stack.Navigator
		screenOptions={{
			headerTransparent: !true,
			headerShown: !true,
		}}>
		<Stack.Screen
			name='ShopTabNavigator'
			component={ShopTabNavigator}
		/>
		<Stack.Screen
			name='SubMenuNavigator'
			component={SubMenuNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forHorizontalIOS,
			}}
		/>
		<Stack.Screen
			name='GetOneItemNavigator'
			component={GetOneItemNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forModalPresentationIOS,
			}}
		/>
		<Stack.Screen
			name='CustomProductNavigator'
			component={CustomProductNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forModalPresentationIOS,
			}}
		/>
		<Stack.Screen
			name='CheckoutNavigator'
			component={CheckoutNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forHorizontalIOS,
			}}
		/>
		<Stack.Screen
			name='ChatItemNavigator'
			component={ChatItemNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forHorizontalIOS,
			}}
		/>
		<Stack.Screen
			name='NewChatNavigator'
			component={NewChatNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forHorizontalIOS,
			}}
		/>		
		<Stack.Screen
			name='AuthNavigator'
			component={AuthNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forModalPresentationIOS,
			}}
		/>
		<Stack.Screen
			name='SettingsNavigator'
			component={SettingsNavigator}
			options={{
				cardStyleInterpolator:
					CardStyleInterpolators.forHorizontalIOS,
			}}
		/>
	</Stack.Navigator>
)

// const ShopNavigatorConnect = connect(mapStateToProps)(ShopNavigator)
// export default ShopNavigatorConnect
export default ShopNavigator