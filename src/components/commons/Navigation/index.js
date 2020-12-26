import React, { useState, useEffect, useContext } from 'react'
import { StatusBar, SafeAreaView, useColorScheme } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, navLightMode, navDarkMode } from '@utils/constants'
import { ETANetInfo, ETATranslate as TranslateProvider} from '@etaui'
import { LanguageContextProvider } from '@etaui/translate'
import SplashScreen from '@components/commons/SplashScreen'
import SigninStackScreen from './SigninStack'
import ShopTabNavigator from './ShopTabNavigator'
import { GET_DATA_REQUEST } from '@redux/settings/appsettings/themepicker/actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
	const { theme } = state.themepicker

	return { theme }
}

const mapDispatchProps = (dispatch, props) => ({
    getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {}
		})
	},
})

const Navigation = ({ getDataRequest, theme }) => {
	const colorSchema = useColorScheme()
	const [ themepicked, setthemepicked ] = useState()
	const [ barStyleTheme, setbarStyleTheme ] = useState('dark-content')
	const [ backgroundTheme, setbackgroundTheme ] = useState(darkTheme.PRIMARY_TEXT_BACKGROUND_COLOR)
	
	useEffect(() => {
		// console.log('[Navigation] colorSchema: ', colorSchema);
	}, [colorSchema])

	useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		switchTheme()
		// console.log('[Navigation] colorSchema: ', colorSchema);
		
		return () => {
			isUnMounted = true
		}
	}, [theme,])

	const switchTheme = async () => {
		console.log('[Navigation] theme: ', theme)
		console.log('[Navigation] colorSchema: ', colorSchema);

		if (theme === 0) {
			if (colorSchema === 'dark') {
				await setthemepicked(darkTheme)
				await setbarStyleTheme('light-content')
				await setbackgroundTheme(darkTheme.PRIMARY_TEXT_BACKGROUND_COLOR)
			} else {
				await setthemepicked(lightTheme)
				await setbarStyleTheme('dark-content')
				await setbackgroundTheme(lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR)
			}
		} else if (theme === 1) {
			await setthemepicked(lightTheme)
			await setbarStyleTheme('dark-content')
			await setbackgroundTheme(lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR)
		} else if (theme === 2) {
			await setthemepicked(darkTheme)
			await setbarStyleTheme('light-content')
			await setbackgroundTheme(darkTheme.PRIMARY_TEXT_BACKGROUND_COLOR)
		}
	}

	return (
		<>
			<SafeAreaView
				style={{
					flex: 0,
					backgroundColor: backgroundTheme
				}}
			/>
				<SafeAreaView
					style={{
						flex: 1,
						backgroundColor: backgroundTheme
					}}>
						
					<LanguageContextProvider>
					{
						theme !== undefined 
						?	<ThemeProvider 
								// theme={themepicked === 1 ? lightTheme : themepicked === 2 ? darkTheme : colorSchema === 'dark' ? darkTheme : lightTheme}
								theme={themepicked ? themepicked : colorSchema === 'dark' ? darkTheme: lightTheme}
								>
								{/* <StatusBar
									backgroundColor={backgroundTheme ? backgroundTheme : lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR}
									barStyle={barStyleTheme ? barStyleTheme : 'light-content'}
									hidden={false}
								/> */}

								<StatusBar
									backgroundColor={backgroundTheme}
									barStyle={barStyleTheme ? barStyleTheme : 'light-content'}
									hidden={false}
								/>
								<ETANetInfo />
									<ShopTabNavigator />
								{/* {userToken !== null ? (
									<ShopTabNavigator />
									) : (
										<SigninStackScreen />
									)} */}
							</ThemeProvider>
						:	null
					}
					</LanguageContextProvider>
			</SafeAreaView>
		</>
	)
}

const NavigationConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(Navigation)
export default NavigationConnect