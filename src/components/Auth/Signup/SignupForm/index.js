import React, { useState, useContext, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETATextInputOutline, ETASimpleText, ETAMultiStep, ETARadio } from '@etaui'
import { connect } from 'react-redux'
import { SIGNUP } from '@redux/user/actions'
import { useTranslation } from '@etaui/translate'

const KeyboardMisser = styled.TouchableWithoutFeedback`
	flex: 1;
	width: 100%;
`
const Root = styled.TouchableWithoutFeedback`
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

const SignupForm = ({getAllUserInfoUser}) => {
    const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ radioItem, setradioItem ] = useState(true)
	const cellphoneRef = useRef()
	const codeRef = useRef()
	const nameRef = useRef()
	const lastnameRef = useRef()
	const genreRef = useRef()
	const usernameRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()
	const { sign_up_title, 
			sign_up_text,
			ask_cellphone,
			insert_code, 
			insert_code_text, 
			password_placeholder,
			confirm_password,
			previous,
			next,
			send,
			man,
			woman,
			code,
			personal_data,
			personal_data_text,
			ask_name,
			ask_lastname,
			ask_genre,
			account_data_title,
			account_data_text,
			ask_username
	 } = useTranslation()

	const _radioChange = async (item) => {
		await setradioItem(radioItem ? !radioItem : true)
		// await _setswitchItem(item)
		// toggleNotification(id)
	}

	const form = [
		{
			title: sign_up_title.charAt(0).toUpperCase() + sign_up_title.slice(1),
			description: sign_up_text.charAt(0).toUpperCase() + sign_up_text.slice(1),
			items: [
				{
					placeholder: ask_cellphone.charAt(0).toUpperCase() + ask_cellphone.slice(1),
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
			]
		},
		{
			title: insert_code.charAt(0).toUpperCase() + insert_code.slice(1),
			description: insert_code_text.charAt(0).toUpperCase() + insert_code_text.slice(1),
			items: [
				{
					placeholder: code.charAt(0).toUpperCase() + code.slice(1),
					name: 'code',
					ref: codeRef,
					mask: '',
					controller: {
						type: 'textinput',
						keyboardtype: 'phone-pad',
						secureTextEntry: false,
						maxLength: 5
					}
				}
			]
		},
		{
			title: personal_data.charAt(0).toUpperCase() + personal_data.slice(1),
			description: personal_data_text.charAt(0).toUpperCase() + personal_data_text.slice(1),
			items: [
				{
					placeholder: ask_name.charAt(0).toUpperCase() + ask_name.slice(1),
					name: 'name',
					ref: nameRef,
					mask: '',
					controller: {
						type: 'textinput',
						keyboardtype: 'default',
						secureTextEntry: false,
						maxLength: 100
					}
				},
				{
					placeholder: ask_lastname.charAt(0).toUpperCase() + ask_lastname.slice(1),
					name: 'lastname',
					ref: lastnameRef,
					mask: '',
					controller: {
						type: 'textinput',
						keyboardtype: 'default',
						secureTextEntry: false,
						maxLength: 100
					}
				},
				{
					placeholder: ask_genre.charAt(0).toUpperCase() + ask_genre.slice(1),
					name: 'genre',
					ref: genreRef,
					mask: '',
					controller: {
						type: 'radioinput',
						values: [
							{
								value: man.charAt(0).toUpperCase() + man.slice(1)
							},
							{
								value: woman.charAt(0).toUpperCase() + woman.slice(1)
							}
						]
					}
				}
			]
		},
		{
			title: account_data_title.charAt(0).toUpperCase() + account_data_title.slice(1),
			description: account_data_text.charAt(0).toUpperCase() + account_data_text.slice(1),
			items: [
				{
					placeholder: ask_username.charAt(0).toUpperCase() + ask_username.slice(1),
					name: 'username',
					ref: usernameRef,
					mask: '',
					controller: {
						type: 'textinput',
						keyboardtype: 'default',
						secureTextEntry: false,
						maxLength: 100
					}
				},
				{
					placeholder: password_placeholder.charAt(0).toUpperCase() + password_placeholder.slice(1),
					name: 'password',
					ref: passwordRef,
					mask: '',
					controller: {
						type: 'textinput',
						keyboardtype: 'default',
						secureTextEntry: true,
						maxLength: 100
					}
				},
				{
					placeholder: confirm_password.charAt(0).toUpperCase() + confirm_password.slice(1),
					name: 'confirmPassword',
					ref: confirmPasswordRef,
					mask: '',
					controller: {
						type: 'textinput',
						keyboardtype: 'default',
						secureTextEntry: false,
						maxLength: 100
					}
				}
			]
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
				finishText={send.charAt(0).toUpperCase() + send.slice(1)}
				finishFunction={() => _finishFunction()}
				initialValues={{
					cellphone: '',
					name: '',
					lastname: '',
					genre: 'man',
					username: '',
					password: '',
					confirmPassword: ''
					// email: ''
				}}
			>
             {
				 form.map((element, index) => (
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
												style={{ marginTop: 10 }}>
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
																	onChangeText={text => onChangeValue(
																		[item.name], text
																	)}
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

const SignupFormConnect = connect(null, mapDispatchProps)(SignupForm)
export default SignupFormConnect