import { useMemo, useRef, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useFormik } from 'formik';
import { useIsFocused } from '@react-navigation/native';
import * as yup from 'yup';
import { useCopy } from '@services';
import { useAuthenticationHook, useToast } from '@hooks';
import { isEmpty, trimValues } from '@utils/functions';
import { type UserState } from '@store/slices/types';
import { type FieldEditorProps } from '..';
import { formSchemas } from '@utils/forms/validators/schemas';
import {
  username,
  phoneNumber,
  email,
  confirmPassword,
  newPassword,
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
import {
  username as usernameValidator,
  phoneNumber as phoneNumberValidator,
  email as emailValidator,
  password as passwordValidator,
  firstName as firstNameValidator,
  lastName as lastNameValidator,
  dateOfBirth as dateOfBirthValidator,
  genre as genreValidator,
  streetAddressLine1 as streetAddressLine1Validator,
  streetAddressLine2 as streetAddressLine2Validator,
  zipCode as zipCodeValidator,
  city as cityValidator,
  country as countryValidator,
} from '@utils/forms/validators/fields';
import { labels } from '@utils/forms/labels';

export const useFieldEditor = ({ navigation, route }: FieldEditorProps) => {
  const { fieldId, fieldName } = route.params;

  const { getCopyValue } = useCopy();
  const { updateUser, user } = useAuthenticationHook();
  const isFocused = useIsFocused();
  const { accountSchema } = formSchemas();
  const { genres } = labels();

  const submitButtonTitle: string = useMemo(
    () =>
      fieldId === 'password'
        ? 'editProfile:editProfile.buttons.changePassword'
        : 'editProfile:editProfile.buttons.update',
    [fieldId],
  );

  const initialValues: UserState = useMemo(() => user, [user]);

  const refs = useRef({
    //! re-usable
    username: null,
    phoneNumber: null,
    email: null,
    photo: null,
    password: null,
    newPassword: null,
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
    loggedOnDevice: null,
  });

  const fieldValidator: yup.ObjectShape = useMemo((): yup.ObjectShape => {
    switch (fieldId) {
      case 'username':
        return { username: usernameValidator };
      case 'phoneNumber':
        return { phoneNumber: phoneNumberValidator };
      case 'email':
        return { email: emailValidator };
      case 'password':
        return { password: passwordValidator };
      case 'fullname':
        return { firstName: firstNameValidator, lastName: lastNameValidator };
      case 'dateOfBirth':
        return { dateOfBirth: dateOfBirthValidator };
      case 'genre':
        return { genre: genreValidator };
      case 'address':
        return {
          streetAddressLine1: streetAddressLine1Validator,
          streetAddressLine2: streetAddressLine2Validator,
        };
      case 'zipCode':
        return { zipCode: zipCodeValidator };
      case 'city':
        return { city: cityValidator };
      case 'country':
        return { country: countryValidator };
      default:
        return {};
    }
  }, [fieldId, isFocused]);

  const formik = useFormik<UserState>({
    initialValues,
    validationSchema: yup.object().shape(fieldValidator),
    onSubmit: async (values) => {
      const cleanedValues = trimValues(values);
      try {
        const response = { success: true, data: { token: 'soy.un.token', ...cleanedValues } };
        if (response.success && response.data) {
          useToast.success({
            message: getCopyValue('editProfile:editProfile.alerts.update', {
              field: getCopyValue(fieldName),
            }),
            duration: 3000,
          });

          updateUser(cleanedValues);
          if (fieldId === 'password') {
            navigation.goBack();
          } else {
            navigation.navigate('Private', { screen: 'Profile' } as never);
          }
        }
      } catch (error) {
        console.error('Error on onSubmit', error);
      }
    },
  });

  const clearInputHandler = useCallback(
    //! re-usable
    (elementName: keyof UserState) => formik.setFieldValue(elementName, ''),
    [formik],
  );

  const validateStep = useCallback(
    //! re-usable
    async (schema: yup.ObjectSchema<object>, values: UserState) => {
      try {
        await schema.validate(values, { abortEarly: false });
        return {};
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return error.inner.reduce((errorsObject, { path, message }) => {
            errorsObject[path as string] = message;
            return errorsObject;
          }, {});
        }
      }
    },
    [],
  );

  const nextStepButtonHandler = useCallback(async () => {
    const errors = await validateStep(accountSchema[0], formik.values);
    if (!isEmpty(errors)) {
      formik.setErrors(errors);
    }
  }, [validateStep, formik.values]);

  const onSubmitEditingNext = useCallback(
    (currentFieldName: keyof UserState, nextFieldType: 'textinput' | 'button' = 'textinput') => {
      const fieldNames = Object.keys(refs.current) as Array<keyof UserState>;
      const currentIndex = fieldNames.indexOf(currentFieldName);
      const nextFieldName = fieldNames[currentIndex + 1];

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

  const onSubmitHandler = useCallback(() => {
    Keyboard.dismiss();
    formik.handleSubmit();
  }, [formik]);

  const steps = useMemo(() => {
    const elements: any[] = [];

    const addField = (field: any, refName: keyof UserState) => {
      elements.push({
        ...field,
        ref: (r: any) => (refs.current[refName] = r),
        onSubmitEditing:
          field.returnKeyType === 'send'
            ? () => onSubmitHandler()
            : () => onSubmitEditingNext(refName),
      });
    };

    switch (fieldId) {
      case 'username':
        addField({ ...username, returnKeyType: 'send' }, 'username');
        break;
      case 'phoneNumber':
        addField({ ...phoneNumber, returnKeyType: 'send' }, 'phoneNumber');
        break;
      case 'email':
        addField({ ...email, returnKeyType: 'send' }, 'email');
        break;
      case 'password':
        // addField(
        //   {
        //     ...password,
        //     label: 'signup:SignUp.form.fields.currentPassword.name',
        //     showPasswordStrength: false,
        //   },
        //   'password',
        // );
        addField({ ...newPassword }, 'password');
        addField({ ...confirmPassword, returnKeyType: 'send' }, 'confirmPassword');
        break;
      case 'fullname':
        addField({ ...firstName }, 'firstName');
        addField({ ...lastName, returnKeyType: 'send' }, 'lastName');
        break;
      case 'dateOfBirth':
        addField(dateOfBirth, 'dateOfBirth');
        break;
      case 'genre':
        elements.push({ ...genre, ref: (r: any) => (refs.current.genre = r), items: genres });
        break;
      case 'address':
        addField(streetAddressLine1, 'streetAddressLine1');
        addField({ ...streetAddressLine2, returnKeyType: 'send' }, 'streetAddressLine2');
        break;
      case 'zipCode':
        addField({ ...zipCode, returnKeyType: 'send' }, 'zipCode');
        break;
      case 'city':
        addField({ ...city, returnKeyType: 'send' }, 'city');
        break;
      case 'country':
        addField({ ...country, returnKeyType: 'send' }, 'country');
        break;
      default:
        break;
    }

    return [
      {
        title: `${fieldName}`,
        description: 'editProfile:editProfile.description',
        items: elements,
      },
    ];
  }, [route.params, genres, fieldValidator, isFocused]);

  return {
    ...formik,
    steps,
    fieldValueHandler: formik.setFieldValue,
    submitButtonTitle,
    prevStepButtonHandler: () => {},
    nextStepButtonHandler,
    clearInputHandler,
    onSubmitHandler,
  };
};
