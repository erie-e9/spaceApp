import React, {useState, useContext, useEffect} from 'react'
import {Platform} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {Formik} from 'formik'
import * as yup from 'yup'
import {
	ETATextInputOutline,
	ETAButtonFilled,
	ETAErrorMessage,
	ETASimpleText,
} from '@etaui'
import {connect} from 'react-redux'
import {RECOVERY_PASS} from '@redux/user/actions'

const validationSchema = yup.object().shape({
	cellphone: yup
		.string()
		.matches(/^[0-9]*$/, 'Cellphone should has only numbers')
		.min(10, 'Cellphone should has 10 characters')
		.max(10, 'Cellphone should has 10 characters')
		.typeError('Phone should has only numbers')
		.required('This field is required'),
})

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const FormContainer = styled.View`
	flex: 0.7;
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
const RecoverTextContainer = styled.View`
	justify-content: center;
	align-items: center;
	margin-top: 15px;
`

const mapStateToProps = (state, props) => {
	const {cellphone} = state.user

	return {cellphone}
}

const mapDispatchProps = (dispatch, props) => ({
	recoveryPassUser: ({cellphone}) => {
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
	const [recoverytext, setrecoverytext] = useState(
		'We will send you a SMS with instructions for recover your password.',
	)
	const [buttonrecoverytext, setbuttonrecoverytext] = useState(
		'Recover password',
	)

	useEffect(() => {
		console.log('ForgetPasswordComponent cellphone:', cellphone)
	}, [])

	return (
		<Root>
			<Formik
				enableReinitialize
				initialValues={{
					cellphone: '',
				}}
				onSubmit={(values, actions) => {
					recoveryPassUser({
						cellphone: values.cellphone,
					})

					setTimeout(() => {
						actions.setSubmitting(false)
						setbuttonrecoverytext('Send again')
						setrecoverytext(
							'We have sent you a SMS with instructions for recover your password. If you did not receive it, click to send again.',
						)
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
							<ETAErrorMessage size={13}>
								{errors.cellphone}
							</ETAErrorMessage>
						) : null}
						<ButtonContainer>
							<ETAButtonFilled
								title={buttonrecoverytext}
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
			<RecoverTextContainer>
				<ETASimpleText
					size={13}
					weight={Platform.OS === 'ios' ? '500' : '300'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='center'>
					{recoverytext}
				</ETASimpleText>
			</RecoverTextContainer>
		</Root>
	)
}

const ForgetPasswordComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(ForgetPasswordComponent)

export default ForgetPasswordComponentConnect
