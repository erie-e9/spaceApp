import React, {useState, useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {
  ETATextInputOutline,
  ETAButtonFilled,
  ETAErrorMessage,
  ETASimpleText,
} from '@etaui';
import {Context} from '@context';

const validationSchema = yup.object().shape({
  cellphone: yup
    .string()
    .matches(/^[0-9]*$/, 'Cellphone should has only numbers')
    .min(10, 'Cellphone should has 10 characters')
    .max(10, 'Cellphone should has 10 characters')
    .typeError('Phone should has only numbers')
    .required('This field is required'),
});

const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.View`
  flex: 0.7;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-horizontal: 10px;
`;
const ButtonSigninContainer = styled.View`
  height: 20px;
`;
const RecoverTextContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const ForgetPasswordScreen = () => {
  const themeContext = useContext(ThemeContext);
  const {recoveryPass} = useContext(Context);
  const [recoverytext, setrecoverytext] = useState(
    'We will send you a SMS with instructions for recover your password.',
  );
  const [buttonrecoverytext, setbuttonrecoverytext] = useState(
    'Recover password',
  );

  return (
    <Root>
      <Formik
        enableReinitialize={true}
        initialValues={{
          cellphone: '',
        }}
        onSubmit={(values, actions) => {
          recoveryPass({cellphone: values.cellphone});
          setTimeout(() => {
            actions.setSubmitting(false);
            setbuttonrecoverytext('Send again');
            setrecoverytext(
              'We have sent you a SMS with instructions for recover your password. If you did not receive it, click to send again.',
            );
            // alert(JSON.stringify(values))
          }, 2000);
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
              placeholder="Cellphone"
              placeholderTextColor={
                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
              }
              keyboardType="phone-pad"
              autoCapitalize="none"
              allowFontScaling={true}
              autoCorrect={true}
              autoFocus={true}
              blurOnSubmit={false}
              caretHidden={false}
              clearButtonMode="while-editing"
              contextMenuHidden={false}
              editable={true}
              enablesReturnKeyAutomatically={false}
              underlineColorAndroid="transparent"
              keyboardAppearance="dark"
              maxLength={10}
              multiline={false}
              numberOfLines={1} //android
              returnKeyLabel="next" //android
              secureTextEntry={false} //password
              spellCheck={true}
              textContentType="none"
              returnKeyType="next"
              textsize={14}
              height={40}
              width={240}
              borderWidth={0.3}
              onChangeText={handleChange('cellphone')}
              onBlur={handleBlur('cellphone')}
              selectionColor={themeContext.PRIMARY_COLOR}
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
            <ButtonSigninContainer>
              <ETAButtonFilled
                title={buttonrecoverytext}
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
      <RecoverTextContainer>
        <ETASimpleText
          size={12}
          weight={Platform.OS === 'ios' ? '500' : '300'}
          color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          align={'center'}>
          {recoverytext}
        </ETASimpleText>
      </RecoverTextContainer>
    </Root>
  );
};

export default ForgetPasswordScreen;
