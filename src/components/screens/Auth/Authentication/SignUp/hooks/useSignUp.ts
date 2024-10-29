import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Logger } from '@services';
import { type UserState } from '@slices/types';
import { type SignUpProps } from '../../SignUp';
import { useAuthenticationHook, useToast, useAppAlerts } from '@hooks';
import { isEmpty, trimValues } from '@utils/functions';
import { formSchemas } from '@utils/forms/validators/schemas';
import {
  phoneNumber,
  username,
  email,
  confirmPassword,
  password,
  firstName,
  lastName,
  dateOfBirth,
  genre,
  streetAddressLine1,
  streetAddressLine2,
  zipCode,
  city,
  country,
} from '@utils/forms/fields';
import { labels } from '@utils/forms/labels';
import { StepsProps } from '@components/templates/MultiStepper';

export const useSignUp = ({ navigation }: SignUpProps) => {
  const [nextStepButtonDisabled, setNextStepButtonDisabled] = useState<boolean>(true);
  const { storeToken, updateUser, user } = useAuthenticationHook();
  const { showSendOTPAlert } = useAppAlerts();
  const { accountSchema, accountWithSocialMediaSchema } = formSchemas();
  const step1Filled = !!((user.phoneNumber || user.email) && user.username);
  const step2Filled = !!(
    step1Filled &&
    user.firstName &&
    user.lastName &&
    user.dateOfBirth &&
    user.genre
  );
  const [index, setIndex] = useState<number>(step1Filled && !step2Filled ? 1 : step2Filled ? 2 : 0);
  const { genres } = labels();

  const initialValues: UserState = useMemo(
    () =>
      step1Filled
        ? user
        : {
            // phoneNumber: '',
            // username: '',
            // email: '',
            // // photo: null,
            // password: '',
            // confirmPassword: '',
            // firstName: '',
            // lastName: '',
            // dateOfBirth: '',
            // genre: '',
            // streetAddressLine1: '',
            // streetAddressLine2: '',
            // zipCode: '',
            // city: '',
            // country: '',

            username: 'Erie_e9',
            email: 'erictorresandrade.1@gmail.com',
            // photo: null,
            password: 'qwerty.1Lovegun@0o0o',
            confirmPassword: 'qwerty.1Lovegun@0o0o',
            firstName: 'Eric',
            lastName: 'Torres',
            dateOfBirth: '27/04/1992',
            genre: 'man',
            streetAddressLine1: 'Calle Washington, col. Universal 203, Durango, Dgo.',
            streetAddressLine2: 'A una calle de blvd. Dolores del Río.',
            zipCode: '34000',
            city: 'Durango',
            country: 'México',
            loggedOnDevice: false,
          },
    [user],
  );

  const refs = useRef({
    // order is important to handler onSubmitEditingNext
    phoneNumber: null,
    username: null,
    email: null, //? possible error when email is coming from auth
    // photo: null,
    password: null,
    confirmPassword: null,
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    genre: null,
    streetAddressLine1: null,
    streetAddressLine2: null,
    zipCode: null,
    city: null,
    country: null,
  });

  const formik = useFormik<UserState>({
    initialValues,
    validationSchema:
      user.signUpMethod === 'form' ? accountSchema[index] : accountWithSocialMediaSchema[index],
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const cleanedValues = trimValues(values);
      try {
        const response = { success: true, data: { token: 'soy.un.token', ...values } };
        const { success, data } = response;
        if (success && data) {
          await storeToken(data.token);

          if (!isEmpty(data.token)) {
            await updateUser(
              user.signUpMethod === 'form'
                ? {
                    username: cleanedValues.username,
                    phoneNumber: user.phoneNumber,
                    email: cleanedValues.email,
                    // photo: cleanedValues.photo,
                    password: '',
                    confirmPassword: '',
                    firstName: cleanedValues.firstName,
                    lastName: cleanedValues.lastName,
                    dateOfBirth: cleanedValues.dateOfBirth,
                    genre: cleanedValues.genre,
                    streetAddressLine1: cleanedValues.streetAddressLine1,
                    streetAddressLine2: cleanedValues.streetAddressLine2,
                    zipCode: cleanedValues.zipCode,
                    city: cleanedValues.city,
                    country: cleanedValues.country,
                    loggedOnDevice: true,
                    // ...values,
                    // password: '',
                    // confirmPassword: '',
                  }
                : {
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    // photo: user.photo,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: cleanedValues.username,
                    password: '',
                    confirmPassword: '',
                    dateOfBirth: cleanedValues.dateOfBirth,
                    genre: cleanedValues.genre,
                    streetAddressLine1: cleanedValues.streetAddressLine1,
                    streetAddressLine2: cleanedValues.streetAddressLine2,
                    zipCode: cleanedValues.zipCode,
                    city: cleanedValues.city,
                    country: cleanedValues.country,
                    loggedOnDevice: true,
                  },
            );
            useToast.success({
              message: 'signup:SignUp.alerts.signUpSuccess.toastTitle',
              duration: 3000,
            });
            setTimeout(() => {
              navigation.navigate('Private', { screen: 'Profile' } as never);
            }, 500);
          }
        }
      } catch (error) {
        Logger.log('Error on onSubmit', error);
        throw error;
      }
    },
  });

  const clearInputHandler = useCallback(
    (elementName: string) => formik.setFieldValue(elementName, ''),
    [formik],
  );

  const validateStep = useCallback(async (schema: yup.ObjectSchema<any>, values: UserState) => {
    try {
      await schema.validate(values, { abortEarly: false });
      return {};
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        return error.inner.reduce((errorsObject: any, { path, message }: yup.ValidationError) => {
          errorsObject[path as string] = message;
          return errorsObject;
        }, {});
      }
    }
  }, []);

  const prevStepButtonHandler = useCallback(() => {
    if (index > 0) setIndex(index - 1);
    setNextStepButtonDisabled(false);
  }, [index]);

  const nextStepButtonHandler = useCallback(async () => {
    const errors = await validateStep(
      user.signUpMethod === 'form'
        ? accountSchema[index]
        : (accountWithSocialMediaSchema[index] as yup.ObjectSchema<any>),
      formik.values,
    );
    if (isEmpty(errors)) {
      if (index < 1 && user.signUpMethod === 'socialMedia') {
        // phoneNumber is in index 0 and shown for social media
        await showSendOTPAlert(() => {
          updateUser({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            // photo: user.photo,
            phoneNumber: formik.values.phoneNumber,
            username: formik.values.username,
            dateOfBirth: formik.values.dateOfBirth,
            genre: formik.values.genre,
            streetAddressLine1: formik.values.streetAddressLine1,
            streetAddressLine2: formik.values.streetAddressLine2,
            city: formik.values.city,
            zipCode: formik.values.zipCode,
            country: formik.values.country,
          });
          setIndex(index + 1);
        });
      } else {
        await updateUser(formik.values);
        await setIndex(index + 1);
      }

      await formik.setErrors(errors);
    } else {
      formik.setErrors(errors);
    }
  }, [index, formik.errors, formik.values, user.signUpMethod]);

  const fieldValueHandler = useCallback(
    (elementName: string, value: boolean) => {
      formik.setFieldValue(elementName, value);
    },
    [formik],
  );

  const onSubmitEditingNext = useCallback(
    (currentFieldName: string, nextFieldType: 'textinput' | 'button' = 'textinput') => {
      const fieldNames = Object.keys(refs.current);
      const currentIndex = fieldNames.indexOf(currentFieldName);
      const nextFieldName: Partial<UserState> = fieldNames[currentIndex + 1] as Partial<UserState>;

      if (nextFieldName) {
        if (nextFieldType === 'textinput') {
          refs.current[nextFieldName]?.focus();
        } else {
          refs.current[nextFieldName]?.props.onPress?.();
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (isEmpty(formik.errors)) {
      setNextStepButtonDisabled(false);
    } else {
      setNextStepButtonDisabled(true);
    }
  }, [formik.errors]);

  const onNextStepHandler = useCallback(async () => {
    await Keyboard.dismiss();
    await nextStepButtonHandler();
  }, []);

  const onSubmitHandler = useCallback(() => {
    Keyboard.dismiss();
    formik.handleSubmit();
  }, []);

  const steps: Array<StepsProps> = useMemo(
    () =>
      user.signUpMethod === 'form'
        ? [
            // login with form
            {
              title: `signup:SignUp.screenHeaders.step${index + 1}.title`,
              description: `signup:SignUp.screenHeaders.step${index + 1}.description`,
              items: [
                {
                  ...username,
                  ref: (r: any) => (refs.current.username = r),
                  onSubmitEditing: () =>
                    onSubmitEditingNext('username', user.email !== '' ? 'button' : 'textinput'),
                },
                user.email === '' && {
                  ...email,
                  ref: (r: any) => (refs.current.email = r),
                  onSubmitEditing: () => onSubmitEditingNext('email', 'textinput'),
                }, //? change it to 'button' if photo is available
                // { ...photo, ref: (r: any) => refs.current.photo = r, },
                {
                  ...password,
                  ref: (r: any) => (refs.current.password = r),
                  onSubmitEditing: () => onSubmitEditingNext('password', 'textinput'),
                },
                {
                  ...confirmPassword,
                  ref: (r: any) => (refs.current.confirmPassword = r),
                  onSubmitEditing: () => onNextStepHandler(),
                },
              ],
            },
            {
              title: `signup:SignUp.screenHeaders.step${index + 1}.title`,
              description: `signup:SignUp.screenHeaders.step${index + 1}.description`,
              items: [
                {
                  ...firstName,
                  ref: (r: any) => (refs.current.firstName = r),
                  onSubmitEditing: () => onSubmitEditingNext('firstName'),
                },
                {
                  ...lastName,
                  ref: (r: any) => (refs.current.lastName = r),
                  onSubmitEditing: () => onSubmitEditingNext('lastName', 'button'),
                },
                { ...dateOfBirth, ref: (r: any) => (refs.current.dateOfBirth = r) },
                { ...genre, ref: (r: any) => (refs.current.genre = r), items: genres },
              ],
            },
            {
              title: `signup:SignUp.screenHeaders.step${index + 1}.title`,
              description: `signup:SignUp.screenHeaders.step${index + 1}.description`,
              items: [
                {
                  ...streetAddressLine1,
                  ref: (r: any) => (refs.current.streetAddressLine1 = r),
                  onSubmitEditing: () => onSubmitEditingNext('streetAddressLine1'),
                },
                {
                  ...streetAddressLine2,
                  ref: (r: any) => (refs.current.streetAddressLine2 = r),
                  onSubmitEditing: () => onSubmitEditingNext('streetAddressLine2'),
                },
                {
                  ...zipCode,
                  ref: (r: any) => (refs.current.zipCode = r),
                  onSubmitEditing: () => onSubmitEditingNext('zipCode'),
                },
                {
                  ...city,
                  ref: (r: any) => (refs.current.city = r),
                  onSubmitEditing: () => onSubmitEditingNext('city'),
                },
                {
                  ...country,
                  ref: (r: any) => (refs.current.country = r),
                  onSubmitEditing: () => onSubmitHandler(),
                },
              ],
            },
          ]
        : [
            // social media
            {
              title: `signup:SignUp.screenHeaders.step${index + 1}.title`,
              description: `signup:SignUp.screenHeaders.step${index + 1}.description`,
              items: [
                {
                  ...phoneNumber,
                  ref: (r: any) => (refs.current.phoneNumber = r),
                  onSubmitEditing: () => onSubmitEditingNext('phoneNumber'),
                },
                {
                  ...username,
                  ref: (r: any) => (refs.current.username = r),
                  onSubmitEditing: () => onSubmitEditingNext('username', 'textinput'),
                },
              ],
            },
            {
              title: `signup:SignUp.screenHeaders.step${index + 1}.title`,
              description: `signup:SignUp.screenHeaders.step${index + 1}.description`,
              items: [
                { ...dateOfBirth, ref: (r: any) => (refs.current.dateOfBirth = r) },
                { ...genre, ref: (r: any) => (refs.current.genre = r), items: genres },
              ],
            },
            {
              title: `signup:SignUp.screenHeaders.step${index + 1}.title`,
              description: `signup:SignUp.screenHeaders.step${index + 1}.description`,
              items: [
                {
                  ...streetAddressLine1,
                  ref: (r: any) => (refs.current.streetAddressLine1 = r),
                  onSubmitEditing: () => onSubmitEditingNext('streetAddressLine1'),
                },
                {
                  ...streetAddressLine2,
                  ref: (r: any) => (refs.current.streetAddressLine2 = r),
                  onSubmitEditing: () => onSubmitEditingNext('streetAddressLine2'),
                },
                {
                  ...zipCode,
                  ref: (r: any) => (refs.current.zipCode = r),
                  onSubmitEditing: () => onSubmitEditingNext('zipCode'),
                },
                {
                  ...city,
                  ref: (r: any) => (refs.current.city = r),
                  onSubmitEditing: () => onSubmitEditingNext('city'),
                },
                {
                  ...country,
                  ref: (r: any) => (refs.current.country = r),
                  onSubmitEditing: () => onSubmitHandler(),
                },
              ],
            },
          ],
    [index, genres, user.signUpMethod],
  );

  return {
    ...formik,
    index,
    steps,
    nextStepButtonDisabled,
    fieldValueHandler,
    prevStepButtonHandler,
    nextStepButtonHandler,
    clearInputHandler,
  };
};
