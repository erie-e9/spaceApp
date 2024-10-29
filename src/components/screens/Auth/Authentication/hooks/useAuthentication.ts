import { useState, useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Logger } from '@services';
import { type ApplicationScreenProps } from '@types';
import { email, password } from '@utils/forms/validators/fields';
import {
  useModal,
  useAuthenticationHook,
  useAppAlerts,
  useResponseHandler,
  useTheme,
  useBiometrics,
} from '@hooks';
import { phoneNumberOrEmailRegEx, trimValues } from '@utils/functions';
import { useCheckPendingProcess } from './useCheckPendingProcess';

type NavigationType = ApplicationScreenProps;

export interface Props {
  navigation: NavigationType;
}

type FormType = 'logIn' | 'signUp' | 'accountRecovery';

export const useAuthentication = ({ navigation }: Props) => {
  const { storeToken, removeToken, user, removeUser } = useAuthenticationHook();
  const { simpleBiometric } = useBiometrics();
  const { showSendOTPAlert } = useAppAlerts();
  const { loading, setLoading } = useResponseHandler();
  const { showModal } = useModal();
  const { darkMode } = useTheme();
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
      phoneNumberOrEmail: '6182908181',
      email: '',
      password: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const cleanedValues = trimValues(values);

        if (toggleForm !== 'logIn') {
          await sendSignUpCodeHandler(
            cleanedValues.phoneNumberOrEmail || cleanedValues.email,
            toggleForm,
            cleanedValues.email,
          );
        } else {
          if (!loggedOnDevice) {
            await storeToken(
              'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQyZDQ0NGNmOGM1ZTNhZTgzODZkNjZhMTNhMzE2OTc2YWEzNjk5OTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMjQ5NDQwMTQyOTItcTV0aWpmZTVkM2hjNDdtMXFhNmxmdjFxZDAxaXF1MXIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMjQ5NDQwMTQyOTItdm1rdDhyY2ZvOW5tMTAxanAwNm01bmNzZG8wNDQ0azguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDEzNjUwNTM4NTEwNjUxMDUwNTYiLCJlbWFpbCI6ImVyaWN0b3JyZXNhbmRyYWRlLjFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ6MnVoUUVoYVNRdlczVmphSkxrS29nIiwibm9uY2UiOiIzaHU5d2xuUVZrVWlNUUdpeDNjWjhXelUxa0lJUTFMMEpOWDZ3emltekZZIiwibmFtZSI6IkVyaWMgVG9ycmVzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0x1d2RDY190eHh6TFh1bUttbGNyZ1ZGVnpVSXZKTDQwWnA0ZG1YZ2FwZ2dkUHlhOWZNPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkVyaWMiLCJmYW1pbHlfbmFtZSI6IlRvcnJlcyIsImlhdCI6MTcyNDAwNjgwNCwiZXhwIjoxNzI0MDEwNDA0fQ.l5wnLgKevjUjSVmtIrI_i6hHl0m239-UBt9DHz0L5i2EYNi6RH8cLNeKTc80LHHX07QgT98A7ExYZ7fjaI1H50LyiXHouKfiJjGilEabWcFCcejkIvcGukRkdVueIQEu5k5GLvM83eruYw2e8bQMplBk3kPYN22BAPOn4VjwkJ4fcrfNukNA5A3024w83f-X3-PwoCaLt5XYiAUlXuvIX6sRnwjWI9vSZ5qhT939txZ6yIMME5nA3Ll4WfLPGLfOafESWkHCqLPHnmxEOiKXXyrZYBryNpzG7rdaW5PcZyzXcKzrw4MftHaMpENvsbwUZwX7L64GlnQuJOZ_Z3gAKQ',
            );
            await setTimeout(async () => {
              await navigation.navigate('Settings', {
                screen: 'Menu',
              } as never);
            }, 5000);
          } else {
            // was logged on this device //! awaiting for API
            setTimeout(async () => {
              await storeToken(
                'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQyZDQ0NGNmOGM1ZTNhZTgzODZkNjZhMTNhMzE2OTc2YWEzNjk5OTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMjQ5NDQwMTQyOTItcTV0aWpmZTVkM2hjNDdtMXFhNmxmdjFxZDAxaXF1MXIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMjQ5NDQwMTQyOTItdm1rdDhyY2ZvOW5tMTAxanAwNm01bmNzZG8wNDQ0azguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDEzNjUwNTM4NTEwNjUxMDUwNTYiLCJlbWFpbCI6ImVyaWN0b3JyZXNhbmRyYWRlLjFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ6MnVoUUVoYVNRdlczVmphSkxrS29nIiwibm9uY2UiOiIzaHU5d2xuUVZrVWlNUUdpeDNjWjhXelUxa0lJUTFMMEpOWDZ3emltekZZIiwibmFtZSI6IkVyaWMgVG9ycmVzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0x1d2RDY190eHh6TFh1bUttbGNyZ1ZGVnpVSXZKTDQwWnA0ZG1YZ2FwZ2dkUHlhOWZNPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkVyaWMiLCJmYW1pbHlfbmFtZSI6IlRvcnJlcyIsImlhdCI6MTcyNDAwNjgwNCwiZXhwIjoxNzI0MDEwNDA0fQ.l5wnLgKevjUjSVmtIrI_i6hHl0m239-UBt9DHz0L5i2EYNi6RH8cLNeKTc80LHHX07QgT98A7ExYZ7fjaI1H50LyiXHouKfiJjGilEabWcFCcejkIvcGukRkdVueIQEu5k5GLvM83eruYw2e8bQMplBk3kPYN22BAPOn4VjwkJ4fcrfNukNA5A3024w83f-X3-PwoCaLt5XYiAUlXuvIX6sRnwjWI9vSZ5qhT939txZ6yIMME5nA3Ll4WfLPGLfOafESWkHCqLPHnmxEOiKXXyrZYBryNpzG7rdaW5PcZyzXcKzrw4MftHaMpENvsbwUZwX7L64GlnQuJOZ_Z3gAKQ',
              );
              await navigation.navigate('Settings', {
                screen: 'Menu',
              } as never);
              // await setLoading(false);
            }, 5000);
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
      navigation.navigate('FieldEditor', { fieldId, fieldName } as never);
    },
    [],
  );

  const sendSignUpCodeHandler = useCallback(
    async (
      phoneNumberOrEmail: string,
      type: 'signUp' | 'accountRecovery',
      email?: string,
    ): Promise<void> => {
      if (toggleForm !== 'logIn' && formik.values.phoneNumberOrEmail !== '') {
        await setLoading(false);
        await showSendOTPAlert(
          type === 'signUp'
            ? () => checkPendingFormAlert(phoneNumberOrEmail, email)
            : () =>
              editFieldHandler({
                fieldId: 'password',
                fieldName: 'signup:SignUp.form.fields.password.name',
              }),
        );
      }
    },
    [formik.values.phoneNumberOrEmail, toggleForm, user],
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
  }, []);

  const removeAccountHandler = useCallback(async () => {
    removeUser();
    removeToken();
    formik.resetForm();
  }, []);

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
  }, []);

  const useBiometricsHandler = useCallback(() => {
    setEnableBiometrics((prevState) => !prevState);
  }, []);

  const primaryButtonHandler = useCallback(() => {
    // if (isEmpty(formik.errors)) {
    setLoading(false);
    formik.handleSubmit();
    // }
  }, [formik.errors]);

  const primaryButton = useMemo(() => {
    const titleMap = {
      logIn: 'logInText',
      signUp: 'sendCodeText',
      accountRecovery: 'forgotPasswordText',
    };
    return {
      testID: 'authenticationPrimaryButton',
      title: `authentication:Authentication.form.submitButtons.${titleMap[toggleForm]}`,
      textColor: darkMode ? 'tertiary50' : 'secondary950',
      disabled: loading,
      loading: loading,
      onPress: primaryButtonHandler,
    };
  }, [loading, toggleForm, primaryButtonHandler, darkMode]);

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
