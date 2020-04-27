import React, { useState, useContext } from 'react';
import { Platform, Keyboard } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import ETAInputOutline from '@etaui/inputs/inputOutline';
import ETAButtonFilled from '@etaui/buttons/buttonFilled';
// import { graphql, compose } from 'react-apollo';
// import { connect } from 'react-redux';
// import signupMutation from '../graphql/mutations/signup'
// import Loading from '../Loading';
// import { login } from '../actions/client'

const signup = 'Sign up'

const Root = styled.TouchableWithoutFeedback`
    flex: 1;
    position: relative;
    justifyContent: center;
`;
const FormContainer = styled.View`
    flex: 1;
    flexDirection: column;
    display: flex;
    justifyContent: center;
    alignItems: center;
    paddingHorizontal: 10px;
`;
const ErrorMessage = styled.Text`
    color: #ff2075;
    fontSize: 12px;
    zIndex: 100;
`;
const ButtonSignupContainer = styled.View`
    height: 20px;
    marginVertical: 20px;
`;

const validationSchema = yup.object().shape({
    signupFullname: yup
        .string()
        .matches(/^[A-Za-zÑñ ]*$/, 'Please do not insert special characters')
        .required('This field is required')
        .uppercase(),
    signupUsername: yup
        .string()
        .matches(/^[A-Za-z0-9]*$/, 'Please do not insert special characters')
        .required('This field is required')
        .uppercase(),
    signupCellphone: yup
        .string()
        .matches(/^[0-9]*$/, 'Cellphone should has only numbers')
        .min(10, 'Cellphone should has 10 characters')
        .max(10, 'Cellphone should has 10 characters')
        .typeError('Phone should has only numbers')
        .required('This field is required'),
    signupPassword: yup
        .string()
        .matches(/^[A-Za-z0-9]*$/, 'Please do not insert special characters')
        .required('This field is required')
        .min(5, 'Password must be bigger')
        .uppercase(),
    signupConfirmPassword: yup
        .string()
        .matches(/^[A-Za-z0-9]*$/, 'Please do not insert special characters')
        .required('This field is required')
        .min(5, 'Password must be bigger')
        .oneOf([yup.ref('signupPassword'), null], 'Passwords must match')
});

const SignupForm = () => {
    const [ loading, setloading ] = useState(false);
    const themeContext = useContext(ThemeContext);
    const [ mysecureTextEntry, mysetSecureTextEntry ] = useState(true);

    const _onOutSidePress = () => Keyboard.dismiss();
    
    return (
      <Root onPress={() => _onOutSidePress()}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    signupFullname: '',
                    signupUsername: '',
                    signupCellphone: '',
                    signupPassword: ''
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        actions.setSubmitting(false)
                        alert(JSON.stringify(values))
                    }, 2000);
                }}
                validationSchema={validationSchema}
                >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors }) => (
                    <FormContainer>
                        <ETAInputOutline
                            value={values.signupFullname}
                            placeholder='Fullname'
                            placeholderTextColor='#777'
                            keyboardType='default'
                            autoCapitalize='none'
                            allowFontScaling={true}
                            autoCorrect={true}
                            autoFocus={true}
                            blurOnSubmit={false}
                            caretHidden={false}
                            clearButtonMode='while-editing'
                            contextMenuHidden={false}
                            editable={true}
                            enablesReturnKeyAutomatically={false}
                            underlineColorAndroid='transparent'
                            keyboardAppearance='dark'
                            maxLength={10}
                            multiline={false}
                            numberOfLines={1} //android
                            returnKeyLabel='next' //android
                            secureTextEntry={false} //password
                            spellCheck={true}
                            textContentType='none'
                            returnKeyType='next'
                            textsize={14}
                            height={40}
                            width={240}
                            onChangeText={handleChange('signupFullname')}
                            onBlur={handleBlur('signupFullname')}
                            // selection='1, 4'//? no sé we xd
                            // onBlur={text => this._onBlur(text)}
                            // onChangeText={onchangetext}
                            // onEndEditing={text => this._onEndEditing(text)}
                            // onFocus={text => this._onFocus(text)}
                            // ref={(input) => {this.emailInput = input }}
                            // onKeyPress={}
                            // onScroll={}
                        />
                        {
                            errors.signupFullname
                            ? <ErrorMessage>{errors.signupFullname}</ErrorMessage>
                            : null
                        }
                        <ETAInputOutline
                            value={values.signupUsername}
                            placeholder='Username'
                            placeholderTextColor='#777'
                            keyboardType='default'
                            autoCapitalize='none'
                            allowFontScaling={true}
                            autoCorrect={true}
                            autoFocus={true}
                            blurOnSubmit={false}
                            caretHidden={false}
                            clearButtonMode='while-editing'
                            contextMenuHidden={false}
                            editable={true}
                            enablesReturnKeyAutomatically={false}
                            underlineColorAndroid='transparent'
                            keyboardAppearance='dark'
                            maxLength={10}
                            multiline={false}
                            numberOfLines={1} //android
                            returnKeyLabel='next' //android
                            secureTextEntry={false} //password
                            spellCheck={true}
                            textContentType='none'
                            returnKeyType='next'
                            textsize={14}
                            height={40}
                            width={240}
                            onChangeText={handleChange('signupUsername')}
                            onBlur={handleBlur('signupUsername')}
                            // selection='1, 4'//? no sé we xd
                            // onBlur={text => this._onBlur(text)}
                            // onChangeText={onchangetext}
                            // onEndEditing={text => this._onEndEditing(text)}
                            // onFocus={text => this._onFocus(text)}
                            // ref={(input) => {this.emailInput = input }}
                            // onKeyPress={}
                            // onScroll={}
                        />
                        {
                            errors.signupUsername
                            ? <ErrorMessage>{errors.signupUsername}</ErrorMessage>
                            : null
                        }
                        <ETAInputOutline
                            value={values.signupCellphone}
                            placeholder='Cellphone'
                            placeholderTextColor='#777'
                            keyboardType='phone-pad'
                            autoCapitalize='none'
                            allowFontScaling={true}
                            autoCorrect={true}
                            autoFocus={true}
                            blurOnSubmit={false}
                            caretHidden={false}
                            clearButtonMode='while-editing'
                            contextMenuHidden={false}
                            editable={true}
                            enablesReturnKeyAutomatically={false}
                            underlineColorAndroid='transparent'
                            keyboardAppearance='dark'
                            maxLength={10}
                            multiline={false}
                            numberOfLines={1} //android
                            returnKeyLabel='next' //android
                            secureTextEntry={false} //password
                            spellCheck={true}
                            textContentType='none'
                            returnKeyType='next'
                            textsize={14}
                            height={40}
                            width={240}
                            onChangeText={handleChange('signupCellphone')}
                            onBlur={handleBlur('signupCellphone')}
                            // selection='1, 4'//? no sé we xd
                            // onBlur={text => this._onBlur(text)}
                            // onChangeText={onchangetext}
                            // onEndEditing={text => this._onEndEditing(text)}
                            // onFocus={text => this._onFocus(text)}
                            // ref={(input) => {this.emailInput = input }}
                            // onKeyPress={}
                            // onScroll={}
                        />
                        {
                            errors.signupCellphone
                            ? <ErrorMessage>{errors.signupCellphone}</ErrorMessage>
                            : null
                        }
                        <ETAInputOutline
                            value={values.signupPassword}
                            placeholder='Password'
                            placeholderTextColor='#777'
                            keyboardType='default'
                            autoCapitalize='none'
                            allowFontScaling={true}
                            autoCorrect={true}
                            autoFocus={false}
                            blurOnSubmit={false}
                            caretHidden={false}
                            clearButtonMode='while-editing'
                            contextMenuHidden={false}
                            editable={true}
                            enablesReturnKeyAutomatically={false}
                            underlineColorAndroid='transparent'
                            keyboardAppearance='dark'
                            maxLength={100}
                            multiline={false}
                            numberOfLines={1} //android
                            returnKeyLabel='next' //android
                            secureTextEntry={mysecureTextEntry} //password
                            spellCheck={true}
                            textContentType='none'
                            returnKeyType='none'
                            textsize={14}
                            height={40}
                            width={240}                        
                            onChangeText={handleChange('signupPassword')}
                            onBlur={handleBlur('signupPassword')}
                            // selection='1, 4'//? no sé we xd
                            // onBlur={text => this._onBlur(text)}
                            // onChangeText={onchangetext}
                            // onEndEditing={text => this._onEndEditing(text)}
                            // onFocus={text => this._onFocus(text)}
                            // ref={(input) => {this.emailInput = input }}
                            // onKeyPress={}
                            // onScroll={}
                            // paddingHorizontal={60}
                        />                                
                        <ETAInputOutline
                            value={values.signupConfirmPassword}
                            placeholder='Confirm password'
                            placeholderTextColor='#777'
                            keyboardType='default'
                            autoCapitalize='none'
                            allowFontScaling={true}
                            autoCorrect={true}
                            autoFocus={false}
                            blurOnSubmit={false}
                            caretHidden={false}
                            clearButtonMode='while-editing'
                            contextMenuHidden={false}
                            editable={true}
                            enablesReturnKeyAutomatically={false}
                            underlineColorAndroid='transparent'
                            keyboardAppearance='dark'
                            maxLength={100}
                            multiline={false}
                            numberOfLines={1} //android
                            returnKeyLabel='next' //android
                            secureTextEntry={mysecureTextEntry} //password
                            spellCheck={true}
                            textContentType='none'
                            returnKeyType='none'
                            textsize={14}
                            height={40}
                            width={240}                        
                            onChangeText={handleChange('signupConfirmPassword')}
                            onBlur={handleBlur('signupConfirmPassword')}
                            // selection='1, 4'//? no sé we xd
                            // onBlur={text => this._onBlur(text)}
                            // onChangeText={onchangetext}
                            // onEndEditing={text => this._onEndEditing(text)}
                            // onFocus={text => this._onFocus(text)}
                            // ref={(input) => {this.emailInput = input }}
                            // onKeyPress={}
                            // onScroll={}
                            // paddingHorizontal={60}
                        />                                
                        {
                            errors.signupConfirmPassword
                            ? <ErrorMessage>{errors.signupConfirmPassword}</ErrorMessage>
                            : null
                        }
                        <ButtonSignupContainer>
                            <ETAButtonFilled title={signup} onPress={handleSubmit} disabled={isSubmitting ? true : false} colorButton={themeContext.SECONDARY_BACKGROUND_COLOR} padding={10} width={isSubmitting ? 40 : 240} borderRadius={isSubmitting ? 20 : 3} />
                        </ButtonSignupContainer>
                    </FormContainer>
                )}
            </Formik>
            {/* <Wrapper>
                <InputWrapper>
                    <Input 
                    placeholder='Fullname'
                    returnKeyType={'next'}
                    autoCapitalize='words'
                    onChangeText={text => setfullName(text)}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => emailInput.focus()}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input 
                    placeholder='Email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={text => setemail(text)}
                    underlineColorAndroid='transparent'
                    ref={(input) => {this.emailInput = input }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input 
                    placeholder='Username'
                    autoCapitalize='none'
                    onChangeText={text => setusername(text)}
                    underlineColorAndroid='transparent'
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={text => setpassword(text)}
                    underlineColorAndroid='transparent'
                    />
                </InputWrapper>
                <ButtonConfirm onPress={() => _onSignupPress()} disabled={() => _checkIfDisabled()}>
                    <ButtonConfirmText>
                        {signup}
                    </ButtonConfirmText>
                </ButtonConfirm>
            </Wrapper> */}
      </Root>  
    );
}

export default SignupForm;
// export default compose(
//         graphql(signupMutation),
//         connect(undefined, { login }),
//             )(SignupForm);