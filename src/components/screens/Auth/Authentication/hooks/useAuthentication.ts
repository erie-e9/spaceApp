import { useState, useCallback, useMemo, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Logger } from '@services';
import { email, password } from '@utils/forms/validators/fields';
import {
  useModal,
  useAuthenticationHook,
  useAppAlerts,
  useResponseHandler,
  useBiometrics,
} from '@hooks';
import { isEmpty, phoneNumberOrEmailRegEx, trimValues } from '@utils/functions';
import { useCheckPendingProcess } from './useCheckPendingProcess';
import { Props } from '..';

type FormType = 'logIn' | 'signUp' | 'accountRecovery';

export const useAuthentication = ({ navigation }: Props) => {
  const { storeToken, removeToken, user, removeUser } = useAuthenticationHook();
  const { simpleBiometric } = useBiometrics();
  const { showSendOTPAlert } = useAppAlerts();
  const { loading, setLoading } = useResponseHandler();
  const { showModal } = useModal();
  const { checkPendingFormAlert } = useCheckPendingProcess();

  const [toggleForm, setToggleForm] = useState<FormType>('logIn');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [enableBiometrics, setEnableBiometrics] = useState<boolean>(false);

  const loggedOnDevice = useMemo(() => user.loggedOnDevice, [user]);

  const titleText = useMemo(() => {
    switch (toggleForm) {
      case 'logIn':
        return loggedOnDevice ? (enableBiometrics ? 'loggedBiometrics' : 'logged') : 'newLogin';
      case 'signUp':
        return 'signUp';
      case 'accountRecovery':
      default:
        return 'accountRecovery';
    }
  }, [toggleForm, loggedOnDevice, enableBiometrics]);

  const descriptionText = useMemo(
    () =>
      toggleForm === 'logIn' && !loggedOnDevice && !enableBiometrics
        ? 'newLogin'
        : toggleForm === 'logIn' && loggedOnDevice && !enableBiometrics
        ? 'logged'
        : toggleForm === 'logIn' && loggedOnDevice && enableBiometrics
        ? 'loggedBiometrics'
        : toggleForm === 'signUp'
        ? 'signUp'
        : 'accountRecovery',
    [toggleForm, loggedOnDevice, enableBiometrics],
  );

  const signInUpWithText = useMemo(
    () => `authentication:Authentication.${toggleForm === 'signUp' ? 'signUpWith' : 'logInWith'}`,
    [toggleForm],
  );

  const validationSchema = yup.object().shape({
    //! penning to reformat
    phoneNumberOrEmail: yup
      .string()
      .trim()
      .when('phoneNumberOrEmailValidation', {
        is: () =>
          (toggleForm === 'logIn' && !loggedOnDevice && !enableBiometrics) ||
          toggleForm === 'signUp' ||
          toggleForm === 'accountRecovery',
        then: () =>
          yup
            .string()
            .required(
              toggleForm === 'signUp'
                ? 'authentication:Authentication.form.fields.phoneNumber.validations.required'
                : 'authentication:Authentication.form.fields.phoneNumberOrEmail.validations.required',
            )
            .min(10, 'authentication:Authentication.form.fields.phoneNumber.validations.min')
            .max(
              toggleForm === 'signUp' ? 12 : 255,
              toggleForm === 'signUp'
                ? 'authentication:Authentication.form.fields.phoneNumber.validations.max'
                : 'authentication:Authentication.form.fields.phoneNumberOrEmail.validations.max',
            )
            .matches(
              toggleForm === 'signUp' ? phoneNumberOrEmailRegEx : phoneNumberOrEmailRegEx,
              toggleForm === 'signUp'
                ? 'authentication:Authentication.form.fields.phoneNumber.validations.matches'
                : 'authentication:Authentication.form.fields.phoneNumberOrEmail.validations.matches',
            ),
        otherwise: () =>
          yup
            .string()
            .notRequired()
            .matches(
              phoneNumberOrEmailRegEx,
              'authentication:Authentication.form.fields.phoneNumberOrEmail.validations.matches',
            ),
      }),
    email: yup
      .string()
      .trim()
      .when('emailValidation', {
        is: () => toggleForm === 'signUp',
        then: () => email,
        otherwise: () =>
          yup
            .string()
            .max(255)
            .matches(
              phoneNumberOrEmailRegEx,
              'authentication:Authentication.form.fields.email.validations.matches',
            ),
      }),
    password: yup.string().when('passwordValidation', {
      is: () => toggleForm === 'logIn',
      then: () => password,
      otherwise: () => yup.string().notRequired(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumberOrEmail: '6182907121',
      email: '',
      password: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const cleanedValues = trimValues(values);

        if (toggleForm !== 'logIn') {
          await sendSignUpCodeHandler(
            cleanedValues.phoneNumberOrEmail || cleanedValues.email,
            toggleForm,
            cleanedValues.email,
          );
        } else {
          if (!loggedOnDevice) {
            await setTimeout(() => {
              storeToken('soy.un.token');
              navigation.navigate('MenuNavigator', {
                screen: 'Menu',
              } as never);
            }, 3500);
          } else {
            // was logged on this device //! awaiting for API
            setTimeout(() => {
              storeToken('soy.un.token');
              navigation.navigate('MenuNavigator', {
                screen: 'Menu',
              } as never);
              // await setLoading(false);
            }, 3500);
          }
        }
      } catch (error) {
        Logger.log('onSubmit catch', { error });
      } finally {
        await setLoading(false);
      }
    },
  });

  const editFieldHandler = useCallback(
    ({ fieldId, fieldName }: { fieldId: string; fieldName: string }) => {
      navigation.navigate('FieldEditor', { fieldId, fieldName });
    },
    [navigation],
  );

  const sendSignUpCodeHandler = useCallback(
    async (
      phoneNumberOrEmail: string,
      type: 'signUp' | 'accountRecovery',
      emailParam?: string,
    ): Promise<void> => {
      if (toggleForm !== 'logIn' && formik.values.phoneNumberOrEmail !== '') {
        await setLoading(false);
        showSendOTPAlert(
          type === 'signUp'
            ? () => checkPendingFormAlert(phoneNumberOrEmail, emailParam)
            : () =>
                editFieldHandler({
                  fieldId: 'password',
                  fieldName: 'signup:SignUp.form.fields.password.name',
                }),
        );
      }
    },
    [
      checkPendingFormAlert,
      editFieldHandler,
      formik.values.phoneNumberOrEmail,
      setLoading,
      showSendOTPAlert,
      toggleForm,
    ],
  );

  const toggleFormHandler = useCallback(
    (formType?: FormType) => {
      setToggleForm(formType || (toggleForm === 'logIn' ? 'signUp' : 'logIn'));
      formik.resetForm();
    },
    [toggleForm, formik],
  );

  const clearInputHandler = useCallback(
    (field: string) => formik.setFieldValue(field, ''),
    [formik],
  );

  const getBiometricsTokenHandler = useCallback(async () => {
    simpleBiometric({
      promptMessage: 'authentication:Authentication.biometrics.logIn.promptMessage',
      callback: () => console.log('getBiometricsTokenHandler'),
    });
  }, [simpleBiometric]);

  const removeAccountHandler = useCallback(async () => {
    removeUser();
    removeToken();
    formik.resetForm();
  }, [formik, removeToken, removeUser]);

  const useAnotherAccountAlert = useCallback(() => {
    showModal({
      type: 'alert',
      title: 'authentication:Authentication.alerts.useAnotherAccount.title',
      description: 'authentication:Authentication.alerts.useAnotherAccount.description',
      options: [
        {
          text: 'authentication:Authentication.alerts.useAnotherAccount.buttons.buttonOne',
          handler: removeAccountHandler,
          isSimpleButton: true,
          color: 'danger_status',
        },
      ],
    });
  }, [removeAccountHandler, showModal]);

  const useBiometricsHandler = useCallback(() => {
    setEnableBiometrics((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (!isEmpty(formik.errors) && loading) {
      setLoading(false);
    }
  }, [formik.errors, loading, setLoading]);

  const primaryButtonHandler = useCallback(() => {
    setLoading(true);

    formik.handleSubmit();
  }, [formik, setLoading]);

  const primaryButton = useMemo(() => {
    const titleMap = {
      logIn: 'logInText',
      signUp: 'sendCodeText',
      accountRecovery: 'forgotPasswordText',
    };
    return {
      testID: 'authenticationPrimaryButton',
      title: `authentication:Authentication.form.submitButtons.${titleMap[toggleForm]}`,
      disabled: loading,
      loading: loading,
      onPress: primaryButtonHandler,
      gradientColors: ['#f3b2ff', '#94b2ff', '#7df5e9'],
    };
  }, [loading, toggleForm, primaryButtonHandler]);

  return {
    ...formik,
    toggleForm,
    toggleFormHandler,
    passwordVisible,
    passwordVisibleHandler: setPasswordVisible,
    enableBiometrics,
    useBiometricsHandler,
    getBiometricsTokenHandler,
    user,
    titleText,
    descriptionText,
    signInUpWithText,
    loggedOnDevice,
    useAnotherAccountAlert,
    clearInputHandler,
    primaryButton,
  };
};
