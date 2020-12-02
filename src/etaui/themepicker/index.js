import React, { useState, useContext, useRef, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { TouchableWithoutFeedback, useColorScheme, Animated, Easing, Platform, Dimensions } from 'react-native'
import { ETASimpleText } from '@etaui'
import { Feather, MaterialCommunityIcons } from '@icons'

const { width } = Dimensions.get('window')
const heightPreviewTheme = 185

const Root = styled.View`
    flex: 1;
    width: 100%;
	flex-direction: column;
	align-items: center;
	background-color: transparent;
`
const ButtonsContainer = styled.View`
	height: 35px;
	width: ${width}px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-width: 0.2px;
	border-radius: 3px;
	margin: 5px 0px 0px 0px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	background-color: transparent;
`
const Switch = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 35px;
	z-index: 1000;
	border-width: ${(props) => props.chosen ? 0 : 0}px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	background-color: ${(props) => props.chosen ? props.theme.FOURTH_BACKGROUND_COLOR_LIGHT : 'transparent'};
`
const IndicatorContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-horizontal: 5px;
    z-index: 10;
    background-color: transparent;
`
const ThemePreviewContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 10;
	margin: 0px 0px;
	padding: 10px 0px;
    width: 100%;
    background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`
const ThemePreview = styled.TouchableOpacity`
    min-height: ${(props) => props.chosen ? heightPreviewTheme : heightPreviewTheme - 10}px;
    min-width: ${width / 3.5}px;
    justify-content: center;
	align-items: center;
	margin: 0px 9px;
    border-radius: 5px;
    elevation: 4;
    shadow-offset: 0px 1px;
    shadow-radius: 5px;
    shadow-opacity: ${(props) => props.chosen ? 0.3 : 0};
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	elevation: ${(props) => props.chosen ? 0.3 : 0};
	border-width: 0px;
	border-color: ${(props) => props.chosen ? props.theme.SECONDARY_TEXT_BACKGROUND_COLOR : 'transparent'};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ThemePreviewImage = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 5px;
`;

const ETAThemePicker = memo(({ chosen, activated, option1Text, option2Text, option3Text }) => {
	const themeContext = useContext(ThemeContext)
	const colorSchema = useColorScheme()
	const animation = useRef(new Animated.Value(activated ? 1 : 0)).current
	const [ toggled, setToggled ] = useState(!!activated)
	const [ themeChosen, setthemeChosen ] = useState(chosen)

	const _switchAnimated = (t) => {
		setthemeChosen(t)
		console.log('[ETAThemePicker] activated:', t);
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
			<ThemePreviewContainer>
				<ThemePreview
					onPress={() => _switchAnimated(0)}
					chosen={themeChosen === 0 ? true : false}
				>
					
					<ThemePreviewImage source={colorSchema === 'dark' ? require('@assets/screenshots/dark-theme.png') : require('@assets/screenshots/light-theme.png')} resizeMode={'stretch'}/>
				</ThemePreview>
				<ThemePreview
					onPress={() => _switchAnimated(1)}
					chosen={themeChosen === 1 ? true : false}
				>
					<ThemePreviewImage source={require('@assets/screenshots/light-theme.png')} resizeMode={'stretch'}/>
				</ThemePreview>
				<ThemePreview
					onPress={() => _switchAnimated(2)}
					chosen={themeChosen === 2 ? true : false}
				>
					<ThemePreviewImage source={require('@assets/screenshots/dark-theme.png')} resizeMode={'stretch'}/>
				</ThemePreview>
			</ThemePreviewContainer>
			<ButtonsContainer>
				<TouchableWithoutFeedback
					onPress={() => {
						_switchAnimated(0)
					}}
					style={{flex: 1}}>
					<Switch chosen={themeChosen === 0 ? true : false}>
						{/* <Animated.View
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
						/> */}
						<IndicatorContainer>
							<MaterialCommunityIcons
								name='theme-light-dark'
								size={18}
								color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
								style={{
									alignSelf:
										'center',
										marginRight: 5
								}}
							/>
							<ETASimpleText
								size={11}
								weight={Platform.OS === 'ios' ? '300' : '800'}
								color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
								align='left'>
								{option1Text}
							</ETASimpleText>
						</IndicatorContainer>
					</Switch>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback
					onPress={() => {
						_switchAnimated(1)
					}}
					style={{flex: 1}}>
					<Switch chosen={themeChosen === 1 ? true : false}>
						{/* <Animated.View
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
						/> */}
						<IndicatorContainer>
							<Feather
								name='sun'
								size={18}
								color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
								style={{
									alignSelf:
										'center',
										marginRight: 5
								}}
							/>
							<ETASimpleText
								size={11}
								weight={Platform.OS === 'ios' ? '300' : '800'}
								color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
								align='left'>
								{option2Text}
							</ETASimpleText>
						</IndicatorContainer>
					</Switch>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback
					onPress={() => {
						_switchAnimated(2)
					}}
					style={{flex: 1}}>
					<Switch chosen={themeChosen === 2 ? true : false}>
						{/* <Animated.View
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
						/> */}
						<IndicatorContainer>
							<Feather
								name='moon'
								size={17}
								color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
								style={{
									alignSelf:
										'center',
										marginRight: 5
								}}
							/>
							<ETASimpleText
								size={11}
								weight='300'
								color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
								align='left'>
								{option3Text}
							</ETASimpleText>
						</IndicatorContainer>
					</Switch>
				</TouchableWithoutFeedback>
			</ButtonsContainer>
		</Root>
	)
})

export default ETAThemePicker
