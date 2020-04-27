import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import ETAInputOutline from '@etaui/inputs/inputOutline';
import ETAButtonFilled from '@etaui/buttons/buttonFilled';

const validationSchema = yup.object().shape({
    forgetpasswordCellphone: yup
        .string()
        .matches(/^[0-9]*$/, 'Cellphone should has only numbers')
        .min(10, 'Cellphone should has 10 characters')
        .max(10, 'Cellphone should has 10 characters')
        .typeError('Phone should has only numbers')
        .required('This field is required')
});

const Root = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
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
const ButtonSigninContainer = styled.View`
    height: 20px;
    marginVertical: 20px;
`;

const ForgetPasswordScreen = () => {
    const themeContext = useContext(ThemeContext);
    return (
        <Root>
            <Formik
                enableReinitialize={true}
                initialValues={{ 
                    forgetpasswordCellphone: ''
                }}
                onSubmit={(values, actions) => {
                    signIn()
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
                            value={values.forgetpasswordCellphone}
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
                            onChangeText={handleChange('forgetpasswordCellphone')}
                            onBlur={handleBlur('forgetpasswordCellphone')}
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
                            errors.forgetpasswordCellphone
                            ? <ErrorMessage>{errors.forgetpasswordCellphone}</ErrorMessage>
                            : null
                        }
                        <ButtonSigninContainer>
                            <ETAButtonFilled title='Recover password' onPress={handleSubmit} disabled={isSubmitting ? true : false} colorButton={themeContext.SECONDARY_BACKGROUND_COLOR} padding={10} width={isSubmitting ? 40 : 240} borderRadius={isSubmitting ? 20 : 3} />
                        </ButtonSigninContainer>
                    </FormContainer>
                )}
            </Formik>
        </Root>
    );
}

export default ForgetPasswordScreen;