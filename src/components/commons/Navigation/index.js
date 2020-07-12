import React, {useEffect, useContext} from 'react'
import {StatusBar, useColorScheme} from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import {ETANetInfo} from '@etaui'
import SplashScreen from '@components/commons/SplashScreen'
import {lightTheme, darkTheme} from '@utils/constants'
import SigninStackScreen from './SigninStack'
import ShopTabNavigator from './ShopTabNavigator'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
	const { userToken } = state.user;
  
	return { userToken }
}

const Navigation = ({userToken}) => {
	const colorSchema = useColorScheme()

	// if (userToken) {
	// 	return <SplashScreen />
	// }

	return (
		<>
			<StatusBar
				backgroundColor={
					colorSchema === 'dark'
						? darkTheme.PRIMARY_TEXT_BACKGROUND_COLOR
						: lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR
				}
				barStyle={
					colorSchema === 'dark'
						? 'light-content'
						: 'dark-content'
				}
				hidden={false}
			/>
			<ETANetInfo />
			{userToken !== null ? (
				<ShopTabNavigator />
			) : (
				<SigninStackScreen />
			)}
		</>
	)
}

const NavigationConnect = connect(
	mapStateToProps
  )(Navigation)
  
export default NavigationConnect
