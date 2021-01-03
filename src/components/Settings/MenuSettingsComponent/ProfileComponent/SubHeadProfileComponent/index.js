import React, { useContext, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ETATextInputOutline, ETAButtonFilled, ETAErrorMessage } from '@etaui'
import { useTranslation } from '@etaui/translate'
// import { graphql, compose } from 'react-apollo';
// import { connect } from 'react-redux';
// import signupMutation from '../graphql/mutations/signup'
// import Loading from '../Loading';
// import { login } from '../actions/client'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const FormContainer = styled.View`
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-horizontal: 10px;
`
const ButtonContainer = styled.View`
	height: 20px;
	margin-top: 15px;
`

const validationSchema = yup.object().shape({
	fullname: yup
		.string()
		.matches(
			/^[A-Za-zÑñ ]*$/,
			'Please do not insert special characters',
		)
		.required('This field is required')
		.uppercase(),
	username: yup
		.string()
		.matches(
			/^[A-Za-z0-9]*$/,
			'Please do not insert special characters',
		)
		.required('This field is required')
		.uppercase(),
	cellphone: yup
		.string()
		.matches(/^[0-9]*$/, 'Cellphone should has only numbers')
		.min(10, 'Cellphone should has 10 characters')
		.max(10, 'Cellphone should has 10 characters')
		.typeError('Phone should has only numbers')
		.required('This field is required'),
	password: yup
		.string()
		.matches(
			/^[A-Za-z0-9]*$/,
			'Please do not insert special characters',
		)
		.required('This field is required')
		.min(5, 'Password must be bigger')
		.uppercase(),
	email: yup
		.string()
		.matches(
			/^[A-Za-z0-9]*$/,
			'Please do not insert special characters',
		)
		.required('This field is required'),
})

const SubHeadProfileComponent = () => {
	const themeContext = useContext(ThemeContext)
	const fullnameRef = useRef()
	const usernameRef = useRef()
	const cellphoneRef = useRef()
	const passwordRef = useRef()
	const emailRef = useRef()
	const { fullname_placeholder,
			username_placeholder,
			cellphone_placeholder,
			password_placeholder,
			email_placeholder,
			save } = useTranslation()

	return (
		<Root>
			<Formik
				enableReinitialize
				initialValues={{
					fullname: '',
					username: '',
					cellphone: '',
					password: '',
				}}
				onSubmit={(values, actions) => {
					setTimeout(() => {
						actions.setSubmitting(false)
						// alert(JSON.stringify(values))
					}, 2000)
				}}
				validationSchema={validationSchema}>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					isSubmitting,
					errors,
				}) => (
					<FormContainer>
						<ETATextInputOutline
							ref={fullnameRef}
							value={values.fullname}
							placeholder={fullname_placeholder.charAt(0).toUpperCase() + fullname_placeholder.slice(1)}
							placeholderTextColor={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
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
							textsize={13}
							height={40}
							width={270}
							borderWidth={0.7}
							onChangeText={handleChange(
								'fullname',
							)}
							onBlur={handleBlur('fullname')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>
						{errors.fullname ? (
							<ETAErrorMessage size={12}>
								{errors.fullname}
							</ETAErrorMessage>
						) : null}
						<ETATextInputOutline
							ref={usernameRef}
							value={values.username}
							placeholder={username_placeholder.charAt(0).toUpperCase() + username_placeholder.slice(1)}
							placeholderTextColor={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
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
							textsize={13}
							height={40}
							width={270}
							borderWidth={0.7}
							onChangeText={handleChange(
								'username',
							)}
							onBlur={handleBlur('username')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>
						{errors.username ? (
							<ETAErrorMessage size={12}>
								{errors.username}
							</ETAErrorMessage>
						) : null}
						<ETATextInputOutline
							ref={cellphoneRef}
							mask={'([000]) [000]-[00]-[00]'}
							value={values.cellphone}
							placeholder={cellphone_placeholder.charAt(0).toUpperCase() + cellphone_placeholder.slice(1)}
							placeholderTextColor={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							keyboardType='phone-pad'
							autoCapitalize='none'
							allowFontScaling
							autoCorrect
							autoFocus
							blurOnSubmit={false}
							caretHidden={false}
							clearButtonMode='while-editing'
							contextMenuHidden={false}
							editable={!false}
							enablesReturnKeyAutomatically={false}
							underlineColorAndroid='transparent'
							keyboardAppearance='dark'
							maxLength={24}
							multiline={false}
							numberOfLines={1} // android
							returnKeyLabel='next' // android
							secureTextEntry={false} // password
							spellCheck
							textContentType='none'
							returnKeyType='next'
							textsize={13}
							height={40}
							width={270}
							borderWidth={0.7}
							onChangeText={handleChange(
								'cellphone',
							)}
							onBlur={handleBlur('cellphone')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>
						{errors.cellphone ? (
							<ETAErrorMessage size={12}>
								{errors.cellphone}
							</ETAErrorMessage>
						) : null}
						<ETATextInputOutline
							ref={passwordRef}
							value={values.password}
							placeholder={password_placeholder.charAt(0).toUpperCase() + password_placeholder.slice(1)}
							placeholderTextColor={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
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
							secureTextEntry={!true} // password
							spellCheck
							textContentType='none'
							returnKeyType='none'
							textsize={13}
							height={40}
							width={270}
							borderWidth={0.7}
							onChangeText={handleChange(
								'password',
							)}
							onBlur={handleBlur('password')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>

						{errors.password ? (
							<ETAErrorMessage size={12}>
								{errors.password}
							</ETAErrorMessage>
						) : null}
						<ETATextInputOutline
							ref={emailRef}
							value={values.email}
							placeholder={email_placeholder.charAt(0).toUpperCase() + email_placeholder.slice(1)}
							placeholderTextColor={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
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
							editable={!true}
							enablesReturnKeyAutomatically={false}
							underlineColorAndroid='transparent'
							keyboardAppearance='dark'
							maxLength={100}
							multiline={false}
							numberOfLines={1} // android
							returnKeyLabel='next' // android
							secureTextEntry={!true} // password
							spellCheck
							textContentType='none'
							returnKeyType='none'
							textsize={13}
							height={40}
							width={270}
							borderWidth={0.7}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>
						{errors.email ? (
							<ETAErrorMessage size={12}>
								{errors.email}
							</ETAErrorMessage>
						) : null}
						<ButtonContainer>
							<ETAButtonFilled
								title={save.charAt(0).toUpperCase() + save.slice(1)}
								onPress={handleSubmit}
								disabled={!!isSubmitting}
								colorButton={
									themeContext.SECONDARY_BACKGROUND_COLOR
								}
								padding={10}
								width={isSubmitting ? 40 : 270}
								borderRadius={
									isSubmitting ? 20 : 3
								}
							/>
						</ButtonContainer>
					</FormContainer>
				)}
			</Formik>
		</Root>
	)
}

export default SubHeadProfileComponent
// export default compose(
//         graphql(signupMutation),
//         connect(undefined, { login }),
//             )(SubHeadProfileComponent);
