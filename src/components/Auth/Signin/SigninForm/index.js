import React, {useState, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Formik} from 'formik'
import * as yup from 'yup'
import {Entypo} from '@icons'
import {ETATextInputOutline, ETAButtonFilled, ETAErrorMessage} from '@etaui'
import {connect} from 'react-redux'
import {SIGNIN} from '@redux/user/actions'

const FormContainer = styled.View`
	flex: 1;
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-horizontal: 10px;
`
const TextInputIcon = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})``
const ButtonContainer = styled.View`	
	height: 20px;
	margin-top: 15px;
`

const validationSchema = yup.object().shape({
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
		.uppercase(),
})

const mapDispatchProps = (dispatch, props) => ({
	getAllUserInfoUser: ({cellphone, password}) => {
		dispatch({
			type: SIGNIN,
			payload: {
				cellphone: cellphone,
				password: password,
			},
		})
	},
})

const SigninForm = ({getAllUserInfoUser}) => {
	const themeContext = useContext(ThemeContext)
	const [toogleEye, settoogleEye] = useState(true)
	const [mysecureTextEntry, mysetSecureTextEntry] = useState(true)

	const _onPress = () => {
		mysetSecureTextEntry(!mysecureTextEntry)
		settoogleEye(!toogleEye)
	}

	return (
		<>
			<Formik
				enableReinitialize
				initialValues={{
					cellphone: '1234567890',
					password: '1234567890',
				}}
				onSubmit={(values, actions) => {
					getAllUserInfoUser({
						cellphone: values.cellphone,
						password: values.password,
					})

					setTimeout(() => {
						actions.setSubmitting(false)
					}, 3000)
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
							value={values.cellphone}
							placeholder='Cellphone'
							placeholderTextColor={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
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
							borderWidth={0.5}
							onChangeText={handleChange(
								'cellphone',
							)}
							onBlur={handleBlur('cellphone')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
							paddingHorizontal={15}
						/>
						{errors.cellphone ? (
							<ETAErrorMessage size={12}>
								{errors.cellphone}
							</ETAErrorMessage>
						) : null}
						<ETATextInputOutline
							value={values.password}
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
							borderWidth={0.5}
							onChangeText={handleChange(
								'password',
							)}
							onBlur={handleBlur('password')}
							// rightIcon={
							// 	<TextInputIcon
							// 		onPress={() =>
							// 			_onPress()
							// 		}>
							// 		<Entypo
							// 			style={{
							// 				color: '#777',
							// 				marginRight: 65,
							// 			}}
							// 			color={
							// 				themeContext.PRIMARY_TEXT_COLOR_LIGHT
							// 			}
							// 			name={
							// 				toogleEye
							// 					? 'eye'
							// 					: 'eye-with-line'
							// 			}
							// 			size={18}
							// 		/>
							// 	</TextInputIcon>
							// }
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
							// selection='1, 4'//? no sé we xd
							// onBlur={text => this._onBlur(text)}
							// onChangeText={onchangetext}
							// onEndEditing={text => this._onEndEditing(text)}
							// onFocus={text => this._onFocus(text)}
							// ref={(input) => {this.emailInput = input }}
							// onKeyPress={}
							// onScroll={}
							paddingHorizontal={15}
						/>
						{errors.password ? (
							<ETAErrorMessage size={12}>
								{errors.password}
							</ETAErrorMessage>
						) : null}
						<ButtonContainer>
							<ETAButtonFilled
								title='Sign in'
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
		</>
	)
}

const SigninConnect = connect(null, mapDispatchProps)(SigninForm)
export default SigninConnect
