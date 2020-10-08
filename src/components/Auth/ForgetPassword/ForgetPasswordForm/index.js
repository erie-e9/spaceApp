import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETATextInputOutline, ETASimpleText, ETAErrorMessage, ETAMultiStep, ETARadio } from '@etaui'
import { connect } from 'react-redux'
import { RECOVERY_PASS } from '@redux/user/actions'

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
const GenreContainer = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-around;
	padding-horizontal: 10px;
	margin-top: 15px;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const { cellphone } = state.user

	return { cellphone }
}

const mapDispatchProps = (dispatch, props) => ({
	recoveryPassUser: ({ cellphone }) => {
		dispatch({
			type: RECOVERY_PASS,
			payload: {
				cellphone: cellphone,
			},
		})
	},
})

const ForgetPasswordComponent = ({recoveryPassUser, cellphone}) => {
    const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ mysecureTextEntry ] = useState(true)
	const [ radioItem, setradioItem ] = useState(true)
	const [ disabledState, setdisabledState ] = useState(true)

	const _radioChange = async (item) => {
		await setradioItem(radioItem ? !radioItem : true)
		// await _setswitchItem(item)
		// toogleNotification(id)
	}

	useEffect(() => {
		console.log('actual disabledState', disabledState);
	}, [disabledState])

	const form = [
		{
			title: `Don't remember your password?`,
			description: `Don't worry, we will send you a SMS with instructions for get a new password.`,
			items: [
				{
					placeholder: 'What is your cellphone?',
					name: 'cellphone',
					controller: {
						type: 'textinput',
						keyboardtype: 'phone-pad',
						secureTextEntry: false
					}
				}
			]
		},
		{
			title: `Please insert code`,
			description: `We need to confirm that you are who you say you are.`,
			items: [
				{
					placeholder: 'Code',
					name: 'code',
					controller: {
						type: 'textinput',
						keyboardtype: 'phone-pad',
						secureTextEntry: false
					}
				}
			]
		},
		{
			title: `Great!, now you can choose a new password`,
			description: `Choose your new password.`,
			items: [
				{
					placeholder: 'New password',
					name: 'password',
					controller: {
						type: 'textinput',
						keyboardtype: 'default',
						secureTextEntry: true
					}
				},
				{
					placeholder: 'Repeat password',
					name: 'confirmPassword',
					controller: {
						type: 'textinput',
						keyboardtype: 'default',
						secureTextEntry: false
					}
				}
			]
		},
	]

	const _finishFunction = (values) => {
		navigation.goBack()
		console.log('_finishFunction', 
			{
				password: values?.password,
			}
		)
	}

	const _nextStepAvailable = () => {
		setdisabledNext(false)
	}

	return (
		<Root>
            <ETAMultiStep
				prevText='Previous'
				nextText='Next'
				finishText='Send'
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
				 form.map((element, index) => (
					<ETAMultiStep.Step
						key={index}
						disabledNext={disabledState}
					>
						{({ onChangeValue, values }) => (
							<StepContainer>
								<KeyboardAvoidingView 
										behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
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
																		maxLength={10}
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
																		onChangeText={text => {onChangeValue([item.name], text); setdisabledState(values?.[item.name] !== '' ? false : true)}}
																		// onBlur={handleBlur('cellphone')}
																		selectionColor={themeContext.PRIMARY_COLOR}
																	/>
																)
															case 'radioinput': 
																return (
																	<GenreContainer>
																		{
																			item.controller.values.map((subitem) => {
																				return (
																					<ETARadio 
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
																	</GenreContainer>
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

const ForgetPasswordComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(ForgetPasswordComponent)

export default ForgetPasswordComponentConnect
