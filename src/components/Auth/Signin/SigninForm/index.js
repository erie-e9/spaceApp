import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Entypo } from '@commons/Icons';
import ETAInputOutline from '@etaui/inputs/inputOutline';
import ETAButtonFilled from '@etaui/buttons/buttonFilled';
import { Context } from '@context';

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
const TextInputIcon = styled.TouchableOpacity``;
const ButtonSigninContainer = styled.View`
    height: 20px;
    marginVertical: 20px;
`;

const validationSchema = yup.object().shape({
    signinCellphone: yup
        .string()
        .matches(/^[0-9]*$/, 'Cellphone should has only numbers')
        .min(10, 'Cellphone should has 10 characters')
        .max(10, 'Cellphone should has 10 characters')
        .typeError('Phone should has only numbers')
        .required('This field is required'),
    signinPassword: yup
        .string()
        .matches(/^[A-Za-z0-9]*$/, 'Please do not insert special characters')
        .required('This field is required')
        .uppercase(),
});


const SigninForm = () => {
    const themeContext = useContext(ThemeContext);
    const { signIn, state } = useContext(Context);
    const [ toogleEye, settoogleEye ] = useState(true);
    const [ mysecureTextEntry, mysetSecureTextEntry ] = useState(true);
    
    const _onPassPress = () => {
        mysetSecureTextEntry(!mysecureTextEntry);
        settoogleEye(!toogleEye)
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{ 
                    signinCellphone: '',
                    signinPassword: ''
                }}
                onSubmit={(values, actions) => {
                    signIn()
                    setTimeout(() => {
                        actions.setSubmitting(false)
                        alert(JSON.stringify(values))
                        AsyncStorage.getItem('@userToken', (err, result) => {
                            console.log('@userToken: ',result);
                          });
                    }, 2000);
                    
                }}
                validationSchema={validationSchema}
                >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors }) => (
                    <FormContainer>
                        <ETAInputOutline
                            value={values.signinCellphone}
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
                            onChangeText={handleChange('signinCellphone')}
                            onBlur={handleBlur('signinCellphone')}
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
                            errors.signinCellphone
                            ? <ErrorMessage>{errors.signinCellphone}</ErrorMessage>
                            : null
                        }
                        <ETAInputOutline
                            value={values.signinPassword}
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
                            onChangeText={handleChange('signinPassword')}
                            onBlur={handleBlur('signinPassword')}
                            rightIcon={(
                                <TextInputIcon onPress={() => _onPassPress()}>
                                    <Entypo style={{ color: '#777', marginRight: 65 }} name={ toogleEye ? 'eye' : 'eye-with-line'} size={20} />
                                </TextInputIcon>
                            )}
                            // selection='1, 4'//? no sé we xd
                            // onBlur={text => this._onBlur(text)}
                            // onChangeText={onchangetext}
                            // onEndEditing={text => this._onEndEditing(text)}
                            // onFocus={text => this._onFocus(text)}
                            // ref={(input) => {this.emailInput = input }}
                            // onKeyPress={}
                            // onScroll={}
                            paddingHorizontal={60}
                        />                                
                        {
                            errors.signinPassword
                            ? <ErrorMessage>{errors.signinPassword}</ErrorMessage>
                            : null
                        }
                        <ButtonSigninContainer>
                            <ETAButtonFilled title='Sign in' onPress={handleSubmit} disabled={isSubmitting ? true : false} colorButton={themeContext.SECONDARY_BACKGROUND_COLOR} padding={10} width={isSubmitting ? 40 : 240} borderRadius={isSubmitting ? 20 : 3} />
                        </ButtonSigninContainer>
                    </FormContainer>
                )}
            </Formik>
        </>
    );
}

export default SigninForm;