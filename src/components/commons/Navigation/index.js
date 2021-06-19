import React, { useState, useEffect, useContext } from 'react'
import { StatusBar, SafeAreaView, useColorScheme } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
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
	const [ navMode, setnavMode ] = useState()
	
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

		if (theme === 0) { // theme system
			if (colorSchema === 'dark') {
				setthemepicked(darkTheme)
				setbarStyleTheme('light-content')
				setbackgroundTheme(darkTheme.PRIMARY_TEXT_BACKGROUND_COLOR)
				setnavMode(navDarkMode)
			} else {
				setthemepicked(lightTheme)
				setbarStyleTheme('dark-content')
				setbackgroundTheme(lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR)
				setnavMode(navLightMode)
			}
		} else if (theme === 1) { // light theme
			setthemepicked(lightTheme)
			setbarStyleTheme('dark-content')
			setbackgroundTheme(lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR)
			setnavMode(navLightMode)
		} else if (theme === 2) { // dark theme
			setthemepicked(darkTheme)
			setbarStyleTheme('light-content')
			setbackgroundTheme(darkTheme.PRIMARY_TEXT_BACKGROUND_COLOR)
			setnavMode(navDarkMode)
		}
	}

	return (
        <NavigationContainer
          theme={navMode}
        >
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
								theme={themepicked ? themepicked : colorSchema === 'dark' ? darkTheme: lightTheme}
								>
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
		</NavigationContainer>
	)
}

const NavigationConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(Navigation)
export default NavigationConnect