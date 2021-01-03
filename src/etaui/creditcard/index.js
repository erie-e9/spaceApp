import React, { useState, useContext, useLayoutEffect, memo, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import {
	Dimensions,
	KeyboardAvoidingView,
	StyleSheet,
	Animated,
	Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETATextInputOutline, ETASimpleText, ETAButtonFilled } from '@etaui'
import { creditnumberSeparator, expirationDateSeparator } from '@functions'
import TextInputMask from 'react-native-text-input-mask'
import { useTranslation } from '@etaui/translate'

const {width, height} = Dimensions.get('window')

const CreditCardTopContainer = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: ${width}px;
	background-color: transparent;
`
const Card = styled.View`
	height: ${height / 4.75}px;
	width: ${width - 50}px;
	margin: 15px;
	border-radius: 10px;
	background-color: #efefef;
`
const CardFrontContainer = styled.View`
	flex: 1;
`
const CardBackContainer = styled.View`
	flex: 1;
`
const CardItemsContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-start;
	padding: 10px 20px 20px 20px;
`
const CreditCardBottomContainer = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: ${width}px;
	background-color: transparent;
`
const CardBackBand = styled.View`
	height: 35px;
	width: 100%;
	margin-top: 20px;
	background-color: #282828;
`
const CardIBacktemsContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding: 10px 20px 20px 20px;
`
const CVCContainer = styled.View`
	height: 25px;
	width: 35px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	background-color: #fdfdfd;
`
const TextInputsContainer = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	width: ${width}px;
	background-color: transparent;
`
const TextInputContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const TextInput = styled.TextInput.attrs({})`
	height: ${(props) => (props.height ? props.height : 40)}px;
	width: 100%;
	font-size: ${(props) => (props.textsize ? props.textsize : 14)}px;
	color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	justify-content: center;
	align-items: center;
	align-self: center;
	align-content: center;
	background-color: transparent;
	padding-horizontal: 15px;
	margin-vertical: 7px;
	border-bottom-width: 0.3px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
`

const ETACreditCard = memo(({lang, placeholderTextColor}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const { owner_name, expiry_placeholder, save } = useTranslation()
	const [ creditCard, setcreditCard ] = useState('1234 5678 9012 3456')
	const [ expiry, setexpiry ] = useState(expiry_placeholder)
	const [ cvc, setcvc ] = useState('123')
	const [ onwerName, setonwerName ] = useState(owner_name)
	const animatedValue = new Animated.Value(0)
	const numberCardRef = useRef()
	const mmyy = useRef()

	useLayoutEffect(() => {
		animatedValue.addListener(({value}) => {
		})
	}, [])

	const frontInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ['0deg', '180deg'],
	})
	const backInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ['180deg', '360deg'],
	})

	const flipCard = (deg) => {
		console.log('flip switch', animatedValue)
		switch (true) {
			case deg === 180: // front to back
				console.log('front to back === 180')
				Animated.spring(animatedValue, {
					toValue: 180,
					friction: 8,
					tension: 0,
					useNativeDriver: true,
				}).start()
				break
			case deg < 80: // back to front
				console.log('back to front < 80')
				Animated.spring(animatedValue, {
					toValue: 0,
					friction: 8,
					tension: 0,
					useNativeDriver: true,
				}).start()
				break
			case deg > 80: // back to front
				console.log('front to back > 80')
				Animated.spring(animatedValue, {
					toValue: 180,
					friction: 8,
					tension: 0,
					useNativeDriver: true,
				}).start()
				break
			default:
				return false
		}
	}

	return (
		<>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
				style={{flex: 1}}>
				<CreditCardTopContainer>
					<Animated.View
						style={{
							backfaceVisibility: 'hidden',
							transform: [
								{
									rotateY: frontInterpolate,
								},
							],
						}}>
						<Card>
							<CardFrontContainer>
								<CardItemsContainer
									style={{
										...StyleSheet.absoluteFillObject,
									}}>
									<ETASimpleText
										size={20}
										weight={
											Platform.OS ===
											'ios'
												? '500'
												: 'bold'
										}
										color={creditCard === '' ? themeContext.PRIMARY_TEXT_COLOR_LIGHT :  '#333'}
										align='center'>
										{creditCard === ''
											? '1234 5678 9012 3456'.padEnd(
													16,
													'•',
											  )
											: creditnumberSeparator(creditCard
												// .padEnd(
												// 	16,
												// 	'•')
											  )
										}
									</ETASimpleText>
									<ETASimpleText
										size={13}
										weight={
											Platform.OS ===
											'ios'
												? '500'
												: '300'
										}
										color={expiry === '' ? themeContext.PRIMARY_TEXT_COLOR_LIGHT :  '#333'}
										align='center'>
										{expiry === ''
											? expiry_placeholder.toUpperCase()
											: expirationDateSeparator(expiry.toUpperCase())}
									</ETASimpleText>
									<ETASimpleText
										size={13}
										weight={
											Platform.OS ===
											'ios'
												? '500'
												: '300'
										}
										color={onwerName === '' ? themeContext.PRIMARY_TEXT_COLOR_LIGHT :  '#333'}
										align='center'>
										{onwerName === ''
											? owner_name.toUpperCase()
											: onwerName.toUpperCase()}
									</ETASimpleText>
								</CardItemsContainer>
							</CardFrontContainer>
						</Card>
					</Animated.View>

					<Animated.View
						style={{
							backfaceVisibility: 'hidden',
							position: 'absolute',
							top: 0,
							transform: [
								{
									rotateY: backInterpolate,
								},
							],
						}}>
						<Card>
							<CardBackContainer
								style={{
									...StyleSheet.absoluteFillObject,
								}}>
								<CardBackBand />
								<CardIBacktemsContainer>
									<CVCContainer>
										<ETASimpleText
											size={14}
											weight={
												Platform.OS ===
												'ios'
													? '500'
													: '300'
											}
											color={cvc === '' ? themeContext.PRIMARY_TEXT_COLOR_LIGHT :  '#333'}
											align='center'>
											{cvc === ''
												? lang ===
												'es'
													? '123'
													: '123'
												: cvc}
										</ETASimpleText>
									</CVCContainer>
								</CardIBacktemsContainer>
							</CardBackContainer>
						</Card>
					</Animated.View>
				</CreditCardTopContainer>

				<CreditCardBottomContainer>
					<TextInputsContainer>
						<TextInputContainer>
							<ETATextInputOutline
								refInput={numberCardRef}
								// value={values?.[item.name]}
								mask={'[0000] [0000] [0000] [0000]'}
								placeholder='1234 5678 9012 3456'
								placeholderTextColor={
									placeholderTextColor || themeContext.PRIMARY_TEXT_COLOR_LIGHT
								}
								clearButtonMode='always'
								keyboardType='phone-pad'
								autoCapitalize='none'
								allowFontScaling
								autoCorrect
								autoFocus
								blurOnSubmit={false}
								caretHidden={false}
								contextMenuHidden={false}
								editable
								enablesReturnKeyAutomatically={false}
								underlineColorAndroid='transparent'
								keyboardAppearance='dark'
								maxLength={16}
								multiline={false}
								numberOfLines={1} // android
								returnKeyLabel='next' // android
								secureTextEntry={false} // password
								spellCheck
								textContentType='none'
								returnKeyType='next'
								textsize={14}
								height={40}
								width={width}
								borderWidth={0.3}
								onChangeText={(formatted, extracted) => {
									setcreditCard(
										formatted.replace(
											/[^0-9]/g,
											'',
										),
									)
									console.log(extracted)
								}}
								// onBlur={handleBlur('cellphone')}
								selectionColor={themeContext.PRIMARY_COLOR}
							/>
						</TextInputContainer>
					</TextInputsContainer>

					<TextInputsContainer>
						<TextInputContainer>
							<ETATextInputOutline
								// refInput={numberCardRef}
								// value={values?.[item.name]}
								mask={'[00]{/}[00]'}
								placeholder={expiry_placeholder.toUpperCase()}
								placeholderTextColor={
									placeholderTextColor || themeContext.PRIMARY_TEXT_COLOR_LIGHT
								}
								clearButtonMode='always'
								keyboardType='phone-pad'
								autoCapitalize='none'
								allowFontScaling
								autoCorrect
								autoFocus
								blurOnSubmit={false}
								caretHidden={false}
								contextMenuHidden={false}
								editable
								enablesReturnKeyAutomatically={false}
								underlineColorAndroid='transparent'
								keyboardAppearance='dark'
								maxLength={4}
								multiline={false}
								numberOfLines={1} // android
								returnKeyLabel='next' // android
								secureTextEntry={false} // password
								spellCheck
								textContentType='none'
								returnKeyType='next'
								textsize={14}
								height={40}
								width={width / 2}
								borderWidth={0.3}
								onChangeText={(formatted, extracted) => {
									setexpiry(
										formatted.replace(
											/[^0-9]/g,
											'',
										),
									)
									console.log(extracted)
								}}
								// onBlur={handleBlur('cellphone')}
								selectionColor={themeContext.PRIMARY_COLOR}
							/>
						</TextInputContainer>
						<TextInputContainer>
							<ETATextInputOutline
								// refInput={numberCardRef}
								// value={values?.[item.name]}
								mask={'[000]'}
								placeholder={
									lang === 'es'
										? 'CVC/CCV'
										: 'CVC/CCV'
								}
								placeholderTextColor={
									placeholderTextColor || themeContext.PRIMARY_TEXT_COLOR_LIGHT
								}
								clearButtonMode='always'
								keyboardType='phone-pad'
								autoCapitalize='none'
								allowFontScaling
								autoCorrect
								autoFocus
								blurOnSubmit={false}
								caretHidden={false}
								contextMenuHidden={false}
								editable
								enablesReturnKeyAutomatically={false}
								underlineColorAndroid='transparent'
								keyboardAppearance='dark'
								maxLength={3}
								multiline={false}
								numberOfLines={1} // android
								returnKeyLabel='next' // android
								secureTextEntry={false} // password
								spellCheck
								textContentType='none'
								returnKeyType='next'
								textsize={14}
								height={40}
								width={width / 2}
								borderWidth={0.3}
								onChangeText={(formatted, extracted) => {
									setcvc(
										formatted.replace(
											/[^0-9]/g,
											'',
										),
									)
									console.log(extracted)
								}}
								onFocus={() => flipCard(180)}
								onBlur={() => flipCard(0)}
								selectionColor={themeContext.PRIMARY_COLOR}
							/>
							{/* <TextInput
								// value={}
								defaultValue=''
								placeholder={
									lang === 'es'
										? 'CVC/CCV'
										: 'CVC/CCV'
								}
								placeholderTextColor={
									placeholderTextColor || themeContext.PRIMARY_TEXT_COLOR_LIGHT
								}
								keyboardType='phone-pad'
								autoCapitalize='none'
								allowFontScaling
								autoCorrect
								autoFocus={false}
								blurOnSubmit={false}
								caretHidden={false}
								clearButtonMode='while-editing'
								contextMenuHidden={false}
								editable
								enablesReturnKeyAutomatically={
									false
								}
								underlineColorAndroid='transparent'
								keyboardAppearance='dark'
								maxLength={3}
								multiline={false}
								numberOfLines={1} // android
								returnKeyLabel='next' // android
								secureTextEntry={false} // password
								spellCheck
								textContentType='none'
								returnKeyType='default'
								textsize={14}
								clearButtonMode='always'
								onChangeText={(value) =>
									setcvc(value)
								}
								onFocus={() => flipCard(180)}
								onBlur={() => flipCard(0)}
							/> */}
						</TextInputContainer>
					</TextInputsContainer>

					<TextInputsContainer>
						<TextInputContainer>
							<TextInput
								// value={}
								defaultValue=''
								placeholder={owner_name.toUpperCase()}
								placeholderTextColor={
									placeholderTextColor || themeContext.PRIMARY_TEXT_COLOR_LIGHT
								}
								keyboardType='default'
								autoCapitalize='characters'
								allowFontScaling
								autoCorrect
								autoFocus={false}
								blurOnSubmit={false}
								caretHidden={false}
								clearButtonMode='while-editing'
								contextMenuHidden={false}
								editable
								enablesReturnKeyAutomatically={
									false
								}
								underlineColorAndroid='transparent'
								keyboardAppearance='dark'
								maxLength={100}
								multiline={false}
								numberOfLines={1} // android
								returnKeyLabel='next' // android
								secureTextEntry={false} // password
								spellCheck
								textContentType='none'
								returnKeyType='default'
								textsize={14}
								clearButtonMode='always'
								onChangeText={(value) =>
									setonwerName(value)
								}
							/>
						</TextInputContainer>
					</TextInputsContainer>

					<ETAButtonFilled
						title={save.charAt(0).toUpperCase() + save.slice(1)}
						onPress={() =>
							navigation.navigate(
								'SettingsNavigator',
								{
									screen:
										'NewPaymentMethodScreen',
								},
							)
						}
						colorButton={themeContext.PRIMARY_COLOR}
						padding={10}
						width={250}
						borderRadius={3}
					/>
				</CreditCardBottomContainer>
			</KeyboardAvoidingView>
		</>
	)
})

export default ETACreditCard
