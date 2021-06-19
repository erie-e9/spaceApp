import React, { useState, useEffect, useContext, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETATextInputOutline, ETASimpleText, ETAMultiStep, ETARadio } from '@etaui'
import SigninBody from '@components/Auth/Signin/SigninBody'
import { connect } from 'react-redux'
import { SIGNUP } from '@redux/user/actions'
import { useTranslation } from '@etaui/translate'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KeyboardMisser = styled.TouchableWithoutFeedback`
	flex: 1;
	width: 100%;
`
const Root = styled.View`
	flex: 1;
`
const StepContainer = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: transparent;
`
const ContentContainer = styled.View`
	flex: 1;
    align-items: center;
    background-color: transparent;
`
const HeadContainer = styled.View`
	flex: 0.25;
    justify-content: flex-end;
    align-items: flex-start;
	width: 100%;
	padding-horizontal: 20px;
	padding-vertical: 20px;
    background-color: transparent;
`
const FormContainer = styled.View`
	flex: 0.75;
	flex-direction: column;
	display: flex;
	justify-content: center;
	width: 100%;
    background-color: transparent;
`
const RadioContainer = styled.View`
	flex: 0.3;
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding-horizontal: 50px;
    background-color: transparent;
`
const RadioContainerItems = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-around;
	padding-horizontal: 10px;
	margin-top: 15px;
	background-color: transparent;
`

const mapDispatchProps = (dispatch, props) => ({
	getAllUserInfoUser: ({cellphone, password}) => {
		dispatch({
			type: SIGNUP,
			payload: {
				cellphone: cellphone,
				password: password,
			},
		})
	},
})

const SigninForm = ({getAllUserInfoUser}) => {
    const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ mysecureTextEntry ] = useState(true)
	const [ radioItem, setradioItem ] = useState(true)
	const cellphoneRef = React.forwardRef()
	const codeRef = React.forwardRef()
	const nameRef = React.forwardRef()
	const lastnameRef = React.forwardRef()
	const genreRef = React.forwardRef()
	const usernameRef = React.forwardRef()
	const passwordRef = React.forwardRef()
	const confirmPasswordRef = React.forwardRef()
	const { log_in, was_log_in, log_in_text, was_log_in_text, cellphone_placeholder, password_placeholder, previous, next } = useTranslation()
	const [ wasLoggedin, setwasLoggedin ] = useState(!false)

	useEffect(() => {
		let isUnMounted = false
		
		wasLoggedIn()
		return () => {
			isUnMounted = true
		}
	}, [])

	const wasLoggedIn = async () => {
		let userID = await AsyncStorage.getItem('@userID')
		console.log('[wasLoggedIn]: ', userID)
		if (userID !== undefined && userID !== null) {
			setwasLoggedin(userID)
		}
	}

	const signedForm = [
		{
			title: log_in.charAt(0).toUpperCase() + log_in.slice(1),
			description: log_in_text.charAt(0).toUpperCase() + log_in_text.slice(1),
			items: [
				{
					placeholder: cellphone_placeholder.charAt(0).toUpperCase() + cellphone_placeholder.slice(1),
					name: 'cellphone',
					ref: cellphoneRef,
					mask: '([000]) [000]-[00]-[00]',
					controller: {
						type: 'textinput',
						keyboardtype: 'phone-pad',
						secureTextEntry: false,
						maxLength: 24
					}
				},
				{
					placeholder: password_placeholder.charAt(0).toUpperCase() + password_placeholder.slice(1),
					name: 'password',
					ref: passwordRef,
					mask: '[A…]',
					controller: {
						type: 'textinput',
						keyboardtype: 'default',
						secureTextEntry: true,
						maxLength: 100
					}
				},
			],
		},
	]
	
	const semisignedForm = [
		{
			title: was_log_in.charAt(0).toUpperCase() + was_log_in.slice(1),
			description: was_log_in_text.charAt(0).toUpperCase() + was_log_in_text.slice(1),
			items: [
				{
					placeholder: password_placeholder.charAt(0).toUpperCase() + password_placeholder.slice(1),
					name: 'password',
					ref: passwordRef,
					mask: '[A…]',
					controller: {
						type: 'textinput',
						keyboardtype: 'default',
						secureTextEntry: true,
						maxLength: 100
					}
				},
			],
		},
	]
	
	const _finishFunction = (values) => {
		navigation.goBack()
		console.log('_finishFunction')
	}

	return (
		<Root>
            <ETAMultiStep
				prevText={previous.charAt(0).toUpperCase() + previous.slice(1)}
				nextText={next.charAt(0).toUpperCase() + next.slice(1)}
				finishText={log_in.charAt(0).toUpperCase() + log_in.slice(1)}
				finishFunction={() => _finishFunction()}
				initialValues={{
					cellphone: '',
					name: '',
					lastname: '',
					genre: 'men',
					username: '',
					password: '',
					confirmPassword: ''
					// email: ''
				}}
			>
             {
				(wasLoggedin !== false ? semisignedForm : signedForm).map((element, index) => (
					<ETAMultiStep.Step key={index}>
						{({ onChangeValue, values }) => (
							<StepContainer>
								<KeyboardAvoidingView 
									behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
									// contentContainerStyle=''
									style={{flex: 1}}
								>	
								<KeyboardMisser onPress={() => Keyboard.dismiss()}>
									<ContentContainer>
										<HeadContainer>
											<ETASimpleText
												size={24}
												weight={
													Platform.OS === 'ios'
													? '700'
													: 'bold'
												}
												color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
												align='left'
												style={{ marginTop: 10 }}>
												{element.title}
											</ETASimpleText>
											<ETASimpleText
												size={13}
												weight={
													Platform.OS === 'ios'
													? '400'
													: '500'
												}
												color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
												align='left'
												style={{ marginTop: 0 }}>
												{element.description}
											</ETASimpleText>
										</HeadContainer>
										<FormContainer>
											{
												element.items.map((item, i) => {
													switch (item.controller.type) {
														case 'textinput':
															return (
																<ETATextInputOutline
																	key={i}
																	ref={item.ref ? item.ref : null}
																	mask={item.mask}
																	value={values?.[item.name]}
																	placeholder={item.placeholder}
																	placeholderTextColor={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
																	keyboardType={item.controller.keyboardtype}
																	autoCapitalize='none'
																	allowFontScaling
																	autoCorrect
																	autoFocus
																	blurOnSubmit={false}
																	caretHidden={false}
																	clearButtonMode='while-editing'
																	contextMenuHidden={false}
																	editable
																	enablesReturnKeyAutomatically={false}
																	underlineColorAndroid='transparent'
																	keyboardAppearance='dark'
																	maxLength={item.controller.maxLength}
																	multiline={false}
																	numberOfLines={1} // android
																	returnKeyLabel='next' // android
																	secureTextEntry={false} // password
																	spellCheck
																	textContentType='none'
																	returnKeyType='next'
																	textsize={14}
																	height={40}
																	width={270}
																	borderWidth={0.3}
																	onChangeText={(formatted, extracted) => onChangeValue([item.name], extracted)}
																	// onBlur={handleBlur('cellphone')}
																	selectionColor={themeContext.PRIMARY_COLOR}
																/>
															)
														case 'radioinput': 
															return (
																<RadioContainer
																	key={i}>
																	<ETASimpleText
																		size={14}
																		weight={
																			Platform.OS === 'ios'
																			? '700'
																			: 'bold'
																		}
																		color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																		align='center'
																		style={{ marginTop: 10 }}>
																		{item.placeholder}
																	</ETASimpleText>
																		<RadioContainerItems>
																		{
																			item.controller.values.map((subitem) => {
																				return (
																					<ETARadio 
																						key={subitem.value}
																						text={subitem.value.charAt(0).toUpperCase() + subitem.value.slice(1)}
																						sizeText={14}
																						colorText={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																						onChange={() => onChangeValue([item.name], subitem?.value) }
																						activated={values?.genre === subitem?.value ? true : false }
																						sizeRadio={15}
																						colorRadio={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																					/>
																				)
																			})
																		}
																		</RadioContainerItems>
																</RadioContainer>
															)
														default:
															return;
														}
													})
												}
												<SigninBody />
											</FormContainer>
										</ContentContainer>
									</KeyboardMisser>
								</KeyboardAvoidingView>
							</StepContainer>
						)}
					</ETAMultiStep.Step>
				 ))
			 }   
            </ETAMultiStep>
        </Root>
    )
}

const SigninFormConnect = connect(null, mapDispatchProps)(SigninForm)
export default SigninFormConnect