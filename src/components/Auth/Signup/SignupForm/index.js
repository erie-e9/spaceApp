import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { ETATextInputOutline, ETASimpleText, ETAErrorMessage, ETAMultiStep, ETARadio } from '@etaui'
import {connect} from 'react-redux'
import {SIGNUP} from '@redux/user/actions'

const Root = styled.TouchableWithoutFeedback`
	flex: 1;
    background-color: red;
`
const StepContainer = styled.View`
	flex: 1;
	flex-direction: column;
    background-color: transparent;
`
const HeadContainer = styled.View`
	flex: 0.2;
    justify-content: center;
    align-items: flex-start;
	margin-top: 100px;
	padding-horizontal: 20px;
    background-color: transparent;
`
const FormContainer = styled.View`
	flex: 0.5;
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-horizontal: 10px;
    background-color: transparent;
`
const ButtonContainer = styled.View`
	height: 20px;
	margin-top: 15px;
`
const GenreContainer = styled.View`
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
	const [ mysecureTextEntry ] = useState(true)
	const [ radioItem, setradioItem ] = useState(true)
	const [ radioItem2, setradioItem2 ] = useState(false)

	const _radioChange = async (item) => {
		console.log({radioItem, radioItem2});
		await setradioItem(!radioItem)
		await setradioItem2(!radioItem2)
		// await _setswitchItem(item)
		// toogleNotification(id)
	}

	return (
		<Root>
            <ETAMultiStep>
                <ETAMultiStep.Step>
                    <StepContainer>
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
								Welcome to create new account
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
								Please use a real cellphone. We'll send a confirmation code.
							</ETASimpleText>
						</HeadContainer>
                        <FormContainer>
							<ETATextInputOutline
								// value={values.cellphone}
								placeholder='Cellphone'
								placeholderTextColor={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
								keyboardType='phone-pad'
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
								// onChangeText={handleChange(
								// 	'cellphone',
								// )}
								// onBlur={handleBlur('cellphone')}
								selectionColor={themeContext.PRIMARY_COLOR}
							/>
						</FormContainer>
                    </StepContainer>
                </ETAMultiStep.Step>

                <ETAMultiStep.Step>
                    <StepContainer>
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
								Personal Data
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
								Your personal data is confidential. We need it for identification use.
							</ETASimpleText>
						</HeadContainer>
						<FormContainer>
							<ETATextInputOutline
								// value={values.fullname}
								placeholder='Fullname'
								placeholderTextColor={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
								keyboardType='default'
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
								// onChangeText={handleChange(
								// 	'fullname',
								// )}
								// onBlur={handleBlur('fullname')}
								selectionColor={
									themeContext.PRIMARY_COLOR
								}
							/>

							<GenreContainer>
								<ETARadio 
									text='Men'
									sizeText={14}
									colorText={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
									onChange={() => _radioChange(radioItem)}
									activated={radioItem}
									sizeRadio={15}
									colorRadio={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
								/>
								
								<ETARadio 
									text='Women'
									sizeText={14}
									colorText={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
									onChange={() => _radioChange(radioItem2)}
									activated={radioItem2}
									sizeRadio={15}
									colorRadio={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
								/>
							</GenreContainer>

						</FormContainer>
					</StepContainer>
				</ETAMultiStep.Step>

				<ETAMultiStep.Step>
                    <StepContainer>
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
								Account Data
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
								The data will be usefull for use our app, please fill fields to finish your sign in.
							</ETASimpleText>
						</HeadContainer>
						<FormContainer>
							<ETATextInputOutline
								// value={values.username}
								placeholder='Username'
								placeholderTextColor={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
								keyboardType='default'
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
								// onChangeText={handleChange(
								// 	'username',
								// )}
								// onBlur={handleBlur('username')}
								selectionColor={
									themeContext.PRIMARY_COLOR
								}
							/>

							<ETATextInputOutline
								// value={values.password}
								placeholder='Password'
								placeholderTextColor={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
								keyboardType='default'
								autoCapitalize='none'
								allowFontScaling
								autoCorrect
								autoFocus={false}
								blurOnSubmit={false}
								caretHidden={false}
								clearButtonMode='while-editing'
								contextMenuHidden={false}
								editable
								enablesReturnKeyAutomatically={false}
								underlineColorAndroid='transparent'
								keyboardAppearance='dark'
								maxLength={100}
								multiline={false}
								numberOfLines={1} // android
								returnKeyLabel='next' // android
								secureTextEntry={mysecureTextEntry} // password
								spellCheck
								textContentType='none'
								returnKeyType='none'
								textsize={14}
								height={40}
								width={270}
								borderWidth={0.3}
								// onChangeText={handleChange(
								// 	'password',
								// )}
								// onBlur={handleBlur('password')}
								selectionColor={
									themeContext.PRIMARY_COLOR
								}
							/>
							
							<ETATextInputOutline
								// value={values.confirmPassword}
								placeholder='Confirm password'
								placeholderTextColor={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
								keyboardType='default'
								autoCapitalize='none'
								allowFontScaling
								autoCorrect
								autoFocus={false}
								blurOnSubmit={false}
								caretHidden={false}
								clearButtonMode='while-editing'
								contextMenuHidden={false}
								editable
								enablesReturnKeyAutomatically={false}
								underlineColorAndroid='transparent'
								keyboardAppearance='dark'
								maxLength={100}
								multiline={false}
								numberOfLines={1} // android
								returnKeyLabel='next' // android
								secureTextEntry={mysecureTextEntry} // password
								spellCheck
								textContentType='none'
								returnKeyType='none'
								textsize={14}
								height={40}
								width={270}
								borderWidth={0.3}
								// onChangeText={handleChange(
								// 	'confirmPassword',
								// )}
								// onBlur={handleBlur('confirmPassword')}
								selectionColor={
									themeContext.PRIMARY_COLOR
								}
							/>
						</FormContainer>
					</StepContainer>
				</ETAMultiStep.Step>
            </ETAMultiStep>
        </Root>
    )
}

const SignupFormConnect = connect(null, mapDispatchProps)(SignupForm)
export default SignupFormConnect