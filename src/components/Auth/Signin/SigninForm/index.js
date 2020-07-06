import React, {useState, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Entypo} from '@icons';
import {ETATextInputOutline, ETAButtonFilled, ETAErrorMessage} from '@etaui';
import {Context} from '@context';

const FormContainer = styled.View`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-horizontal: 10px;
`;
const TextInputIcon = styled.TouchableOpacity``;
const ButtonSigninContainer = styled.View`
  height: 20px;
`;

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
    .matches(/^[A-Za-z0-9]*$/, 'Please do not insert special characters')
    .required('This field is required')
    .uppercase(),
});

const SigninForm = () => {
  const themeContext = useContext(ThemeContext);
  const {signIn} = useContext(Context);
  const [toogleEye, settoogleEye] = useState(true);
  const [mysecureTextEntry, mysetSecureTextEntry] = useState(true);

  const _onPassPress = () => {
    mysetSecureTextEntry(!mysecureTextEntry);
    settoogleEye(!toogleEye);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          cellphone: '1234567890',
          password: '1234567890',
        }}
        onSubmit={(values, actions) => {
          signIn({cellphone: values.cellphone, password: values.password});
          setTimeout(() => {
            actions.setSubmitting(false);
            AsyncStorage.getItem('@userToken', (err, result) => {
              console.log('@userToken: ', result);
            });
          }, 3000);
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
              placeholderTextColor={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
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
              border-width={0.3}
              onChangeText={handleChange('cellphone')}
              onBlur={handleBlur('cellphone')}
              selectionColor={themeContext.PRIMARY_COLOR}
              padding-horizontal={15}
              // selection='1, 4'//? no sé we xd
              // onBlur={text => this._onBlur(text)}
              // onChangeText={onchangetext}
              // onEndEditing={text => this._onEndEditing(text)}
              // onFocus={text => this._onFocus(text)}
              // ref={(input) => {this.emailInput = input }}
              // onKeyPress={}
              // onScroll={}
            />
            {errors.cellphone ? (
              <ETAErrorMessage size={12}>{errors.cellphone}</ETAErrorMessage>
            ) : null}
            <ETATextInputOutline
              value={values.password}
              placeholder='Password'
              placeholderTextColor={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
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
              border-width={0.3}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              rightIcon={
                <TextInputIcon onPress={() => _onPassPress()}>
                  <Entypo
                    style={{ color: '#777', marginRight: 65 }}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    name={toogleEye ? 'eye' : 'eye-with-line'}
                    size={18}
                  />
                </TextInputIcon>
              }
              selectionColor={themeContext.PRIMARY_COLOR}
              // selection='1, 4'//? no sé we xd
              // onBlur={text => this._onBlur(text)}
              // onChangeText={onchangetext}
              // onEndEditing={text => this._onEndEditing(text)}
              // onFocus={text => this._onFocus(text)}
              // ref={(input) => {this.emailInput = input }}
              // onKeyPress={}
              // onScroll={}
              padding-horizontal={60}
            />
            {errors.password ? (
              <ETAErrorMessage size={12}>{errors.password}</ETAErrorMessage>
            ) : null}
            <ButtonSigninContainer>
              <ETAButtonFilled
                title='Sign in'
                onPress={handleSubmit}
                disabled={isSubmitting ? true : false}
                colorButton={themeContext.SECONDARY_BACKGROUND_COLOR}
                padding={10}
                width={isSubmitting ? 40 : 240}
                border-radius={isSubmitting ? 20 : 3}
              />
            </ButtonSigninContainer>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};

export default SigninForm;
