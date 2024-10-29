import React, { memo, useCallback, useMemo, useRef } from 'react';
import { Keyboard } from 'react-native';
import { removeBlankSpaces, testProperties } from '@utils/functions';
import { TextInput } from '@components/molecules';
import { FormContainer } from './styles';

interface Props {
  hookHandler: any;
}

export const Form: React.FC<Props> = ({ hookHandler }) => {
  const password = useRef(null);
  const showPhoneOrEmailButton = useMemo(() => {
    return (
      (hookHandler.toggleForm === 'logIn' &&
        !hookHandler.loggedOnDevice &&
        !hookHandler.useBiometrics) ||
      hookHandler.toggleForm === 'signUp' ||
      hookHandler.toggleForm === 'accountRecovery'
    );
  }, [hookHandler.toggleForm, hookHandler.loggedOnDevice, hookHandler.useBiometrics]);

  const focusOnPassword = useCallback(() => {
    if (password && password.current) {
      password.current?.focus();
    }
  }, []);

  const submitHandler = useCallback(() => {
    Keyboard.dismiss();
    hookHandler.handleSubmit();
  }, []);

  return (
    <FormContainer>
      {showPhoneOrEmailButton && (
        <TextInput
          {...testProperties('authenticationPhoneNumberOrEmail')}
          label={`authentication:Authentication.form.fields.${
            hookHandler.toggleForm === 'signUp' ? 'phoneNumber' : 'phoneNumberOrEmail'
          }.name`}
          name={hookHandler.toggleForm === 'signUp' ? 'phoneNumber' : 'phoneNumberOrEmail'}
          required={true}
          value={hookHandler?.values?.phoneNumberOrEmail}
          error={hookHandler?.errors?.phoneNumberOrEmail}
          touched={hookHandler?.touched?.phoneNumberOrEmail}
          onBlur={hookHandler.handleBlur('phoneNumberOrEmail')}
          maxLength={hookHandler.toggleForm === 'signUp' ? 12 : 255}
          maintainFocus={!!hookHandler?.values?.phoneNumberOrEmail}
          onChangeText={(text) =>
            hookHandler.handleChange('phoneNumberOrEmail')(removeBlankSpaces(text))
          }
          editable={!hookHandler?.dataUser?.phonenumber_email}
          keyboardType={hookHandler.toggleForm === 'signUp' ? 'phone-pad' : 'email-address'}
          importantForAutofill="yes"
          textContentType={hookHandler.toggleForm === 'signUp' ? 'telephoneNumber' : 'emailAddress'}
          rightIcon="clear"
          rightIconHandler={() => hookHandler.clearInputHandler('phoneNumberOrEmail')}
          autoCorrect={false}
          onSubmitEditing={hookHandler.toggleForm === 'logIn' ? focusOnPassword : submitHandler}
          returnKeyType={hookHandler.toggleForm === 'logIn' ? 'next' : 'send'}
          returnKeyLabel={hookHandler.toggleForm === 'logIn' ? 'next' : 'send'}
          enablesReturnKeyAutomatically={true}
        />
      )}
      {hookHandler.toggleForm === 'signUp' && (
        <TextInput
          {...testProperties('authenticationEmail')}
          label="authentication:Authentication.form.fields.email.name"
          name="email"
          value={hookHandler?.values?.email}
          error={hookHandler?.errors?.email}
          touched={hookHandler?.touched?.email}
          onBlur={hookHandler.handleBlur('email')}
          maxLength={255}
          maintainFocus={!!hookHandler?.values?.email}
          onChangeText={(text) => hookHandler.handleChange('email')(removeBlankSpaces(text))}
          editable={!hookHandler?.dataUser?.phonenumber_email}
          keyboardType="email-address"
          importantForAutofill="yes"
          textContentType="emailAddress"
          autoCorrect={false}
          onSubmitEditing={submitHandler}
          rightIcon="clear"
          rightIconHandler={() => hookHandler.clearInputHandler('email')}
          returnKeyType="send"
          returnKeyLabel="send"
        />
      )}
      {hookHandler.toggleForm === 'logIn' && !hookHandler.useBiometrics && (
        <TextInput
          {...testProperties('authenticationPassword')}
          ref={password}
          label="authentication:Authentication.form.fields.password.name"
          name="password"
          required={true}
          value={hookHandler?.values?.password}
          error={hookHandler?.errors?.password}
          touched={hookHandler?.touched?.password}
          onBlur={hookHandler.handleBlur('password')}
          secureTextEntry={!hookHandler.passwordVisible}
          maxLength={127}
          maintainFocus={!!hookHandler?.dataUser?.password}
          onChangeText={(text) => hookHandler.handleChange('password')(removeBlankSpaces(text))}
          keyboardType="default"
          importantForAutofill="yes"
          textContentType="password"
          rightIcon="passwordToggle"
          rightIconHandler={() => {
            hookHandler.passwordVisibleHandler(!hookHandler.passwordVisible);
          }}
          onSubmitEditing={submitHandler}
          returnKeyType="send"
          returnKeyLabel="send"
        />
      )}
    </FormContainer>
  );
};

export default memo(Form);
