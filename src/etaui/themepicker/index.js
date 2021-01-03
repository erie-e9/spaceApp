import React, { useState, useEffect, useContext, useRef, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { TouchableWithoutFeedback, useColorScheme, Animated, Easing, Platform, Dimensions, PanResponder } from 'react-native'
import { ETASimpleText } from '@etaui'
import { Feather, MaterialCommunityIcons } from '@icons'
import { connect } from 'react-redux'
import { SWITCH_THEME } from '@redux/settings/appsettings/themepicker/actions'

const { width } = Dimensions.get('window')
const heightPreviewTheme = 185

const Root = styled.View`
    flex: 1;
    width: 100%;
	flex-direction: column;
	align-items: center;
	background-color: transparent;
`
const ThemePreviewContainer = styled.View`
	flex: 0.8;
	min-height: 100px;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 10;
	margin: 0px 0px;
	padding: 10px 0px;
    background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`
const ThemePreview = styled.TouchableHighlight`
    min-height: ${(props) => props.chosen ? heightPreviewTheme : heightPreviewTheme - 20}px;
    min-width: ${width / 4.1}px;
    justify-content: center;
	align-items: center;
	margin: 0px 12px;
    border-radius: 5px;
    elevation: 4;
    shadow-offset: 0px 1px;
    shadow-radius: 5px;
    shadow-opacity: ${(props) => props.chosen ? 0.3 : 0};
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	elevation: ${(props) => props.chosen ? 0.3 : 0};
	border-width: 0.3px;
	border-radius: 12px;
	padding: 3px;
	border-color: ${(props) => props.chosen ? props.theme.SECONDARY_TEXT_BACKGROUND_COLOR : 'transparent'};
`
const ThemePreviewImage = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 10px;
`;
const ButtonsContainer = styled.View`
	flex: 0.2;
	height: 35px;
	width: ${width - 25}px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-width: 0.2px;
	border-radius: 3px;
	margin: 5px 0px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	background-color: transparent;
`
const Switch = styled.TouchableOpacity`
	flex: 1;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 100%;
	z-index: 1000;
	border-width: ${(props) => props.chosen ? 0 : 0}px;
	border-radius: ${(props) => props.chosen ? 7 : 0}px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	background-color: ${(props) => props.chosen ? props.theme.FOURTH_BACKGROUND_COLOR_LIGHT : 'transparent'};
`
const IndicatorContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-horizontal: 5px;
    z-index: 10;
	height: 100%;
    background-color: transparent;
`

const mapDispatchProps = (dispatch, props) => ({
	switchTheme: (theme) => {
		console.log('switchTheme theme: ', theme)
		dispatch({
			type: SWITCH_THEME,
			payload: {
				theme
			}
		})
	}
})

const ETAThemePicker = memo(({ chosen, activated, option1Text, option2Text, option3Text, switchTheme, disableScroll, onStatusChanged, disableSwitch }) => {
	const themeContext = useContext(ThemeContext)
	const colorSchema = useColorScheme()
	const animation = useRef(new Animated.Value(activated ? 1 : 0)).current
	const position = useRef(new Animated.Value(0))
	const [ toggled, setToggled ] = useState(!!activated)
	const [ themeChosen, setthemeChosen ] = useState(chosen ? chosen : 0)

	const [ currentStatus, setcurrentStatus ] = useState(0)
	const [ posValue, setposValue ] = useState(0)
	const [ selectedPosition, setselectedPosition ] = useState(0)
	const [ duration ] = useState(100)
	const [ mainWidth ] = useState(width - 30)
	const [ switcherWidth ] = useState(width / 2.7)
	const [ thresholdDistance ] = useState(width - 8 - width / 2.4)
	const [ isParentScrollDisabled ] = useState(false) 

	useEffect(() => {
		let _panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => true,
			onMoveShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
	  
			onPanResponderGrant: () => {
			  // disable parent scroll if slider is inside a scrollview
			  if (!isParentScrollDisabled) {
				disableScroll(false);
				isParentScrollDisabled = true;
			  }
			},
	  
			onPanResponderMove: (evt, gestureState) => {
			  if (!disableSwitch) {
				let finalValue = gestureState.dx + posValue;
				if (finalValue >= 0 && finalValue <= thresholdDistance)
				  position.setValue(posValue + gestureState.dx);
			  }
			},
	  
			onPanResponderTerminationRequest: () => true,
	  
			onPanResponderRelease: (evt, gestureState) => {
			  if (!disableSwitch) {
				let finalValue = gestureState.dx + posValue;
				isParentScrollDisabled = false;
				disableScroll(true);
				if (gestureState.dx > 0) {
				  if (finalValue >= 0 && finalValue <= 30) {
					notStartedSelected();
				  } else if (finalValue >= 30 && finalValue <= 121) {
					inProgressSelected();
				  } else if (finalValue >= 121 && finalValue <= 280) {
					if (gestureState.dx > 0) {
					  completeSelected();
					} else {
					  inProgressSelected();
					}
				  }
				} else {
				  if (finalValue >= 78 && finalValue <= 175) {
					inProgressSelected();
				  } else if (finalValue >= -100 && finalValue <= 78) {
					notStartedSelected();
				  } else {
					completeSelected();
				  }
				}
			  }
			},
	  
			onPanResponderTerminate: () => {},
			onShouldBlockNativeResponder: () => {
			  // Returns whether this component should block native components from becoming the JS
			  // responder. Returns true by default. Is currently only supported on android.
			  return true;
			}
		  });
		  moveInitialState();
	}, [])

	const notStartedSelected = () => {
		if (disableSwitch) return;
		Animated.timing(position, {
		  toValue: Platform.OS === 'ios' ? -2 : 0,
		  duration: duration
		}).start();
		setTimeout(() => {
		setposValue(Platform.OS === 'ios' ? -2 : 0)
		setselectedPosition(0)
		}, 100);
		onStatusChanged('Open');
	};

	const inProgressSelected = () => {
		if (disableSwitch) return;
		Animated.timing(position, {
			toValue: mainWidth / 2 - switcherWidth / 2,
			duration: duration
		}).start();
		setTimeout(() => {
			setposValue(mainWidth / 2 - switcherWidth / 2)
			setselectedPosition(1)
		}, 100);
		onStatusChanged('In Progress');
	};

	const completeSelected = () => {
		if (disableSwitch) return;
		Animated.timing(position, {
			toValue:
			Platform.OS === 'ios'
				? mainWidth - switcherWidth
				: mainWidth - switcherWidth - 2,
			duration: duration
		}).start();
		setTimeout(() => {
			setposValue(Platform.OS === 'ios' ? mainWidth - switcherWidth : mainWidth - switcherWidth - 2,)
			setselectedPosition(2)
		}, 100);
		onStatusChanged('Complete');
	};

	const getStatus = () => {
		switch (selectedPosition) {
			case 0:
			return 'Open';
			case 1:
			return 'In Progress';
			case 2:
			return 'Complete';
		}
	};

	const moveInitialState = () => {
		switch (currentStatus) {
			case 'Open':
			notStartedSelected();
			break;
			case 'In Progress':
			inProgressSelected();
			break;
			case 'Complete':
			completeSelected();
			break;
		}
	};
	
	//
	const _switchAnimated = async (themeOption) => {
		await setthemeChosen(themeOption)
		await switchTheme(themeOption)
		// console.log('[ETAThemePicker] activated:', themeOption);
		await setToggled(!toggled)
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
					<Switch
						onPress={() => {
							_switchAnimated(0)
						}}
						chosen={themeChosen === 0 ? true : false}>
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
								color={themeChosen === 0 ? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_COLOR_LIGHT}
								style={{
									alignSelf:
										'center',
										marginRight: 5
								}}
							/>
							<ETASimpleText
								size={11}
								weight={Platform.OS === 'ios' ? '300' : '800'}
								color={themeChosen === 0 ? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_COLOR_LIGHT}
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
					<Switch
						onPress={() => {
							_switchAnimated(1)
						}}
						chosen={themeChosen === 1 ? true : false}>
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
								color={themeChosen === 1 ? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_COLOR_LIGHT}
								style={{
									alignSelf:
										'center',
										marginRight: 5
								}}
							/>
							<ETASimpleText
								size={11}
								weight={Platform.OS === 'ios' ? '300' : '800'}
								color={themeChosen === 1 ? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_COLOR_LIGHT}
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
					<Switch
						onPress={() => {
							_switchAnimated(2)
						}}
						chosen={themeChosen === 2 ? true : false}>
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
								color={themeChosen === 2 ? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_COLOR_LIGHT}
								style={{
									alignSelf:
										'center',
										marginRight: 5
								}}
							/>
							<ETASimpleText
								size={11}
								weight='300'
								color={themeChosen === 2 ? themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_COLOR_LIGHT}
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

const ETAThemePickerConnect = connect(
    null,
    mapDispatchProps,
)(ETAThemePicker)

export default React.memo(ETAThemePickerConnect)
