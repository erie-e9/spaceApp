import * as yup from 'yup';
import {
  onlyLettersSpecialRegex,
  onlyNumbersRegex,
  validDateRegex,
  userNameRegex,
  isPhoneNumberRegEx,
  alphaNumericRegex,
} from '@utils/functions';

export const username = yup
  .string()
  .matches(userNameRegex, 'signup:SignUp.form.fields.username.validations.matches')
  .min(3, 'signup:SignUp.form.fields.username.validations.min')
  .max(30, 'signup:SignUp.form.fields.username.validations.max')
  .required('signup:SignUp.form.fields.username.validations.required');

export const phoneNumber = yup
  .string()
  .min(10, 'authentication:Authentication.form.fields.phoneNumber.validations.min')
  .max(255, 'authentication:Authentication.form.fields.phoneNumber.validations.max')
  .matches(
    isPhoneNumberRegEx,
    'authentication:Authentication.form.fields.phoneNumber.validations.matches',
  )
  .required('authentication:Authentication.form.fields.phoneNumber.validations.required');

export const email = yup.string().trim().max(255).notRequired();
// .min(
//     1,
//     'authentication:Authentication.form.fields.email.validations.min',
// )
// .matches(
//     emailValidatorRegEx,
//     'authentication:Authentication.form.fields.email.validations.matches',
// )

export const photo = yup.mixed().required('signup:SignUp.form.fields.photo.validations.required');

export const password = yup
  .string()
  .min(8, 'signup:SignUp.form.fields.password.validations.min')
  .max(127, 'signup:SignUp.form.fields.password.validations.max')
  .required('signup:SignUp.form.fields.password.validations.required');

export const confirmPassword = yup
  .string()
  .oneOf(
    [yup.ref('password'), null],
    'signup:SignUp.form.fields.confirmPassword.validations.matches',
  )
  .required('signup:SignUp.form.fields.confirmPassword.validations.required');

export const newPassword = yup
  .string()
  .min(8, 'signup:SignUp.form.fields.newPassword.validations.min')
  .max(127, 'signup:SignUp.form.fields.newPassword.validations.max')
  .required('signup:SignUp.form.fields.newPassword.validations.required');

export const firstName = yup
  .string()
  .matches(onlyLettersSpecialRegex, 'signup:SignUp.form.fields.firstName.validations.matches')
  .min(2, 'signup:SignUp.form.fields.firstName.validations.min')
  .max(50, 'signup:SignUp.form.fields.firstName.validations.max')
  .uppercase()
  .required('signup:SignUp.form.fields.firstName.validations.required');

export const lastName = yup
  .string()
  .matches(onlyLettersSpecialRegex, 'signup:SignUp.form.fields.lastName.validations.matches')
  .min(3, 'signup:SignUp.form.fields.lastName.validations.min')
  .max(50, 'signup:SignUp.form.fields.lastName.validations.max')
  .uppercase()
  .required('signup:SignUp.form.fields.lastName.validations.required');

export const dateOfBirth = yup
  .string()
  .matches(validDateRegex, 'signup:SignUp.form.fields.dateOfBirth.validations.matches')
  .required('signup:SignUp.form.fields.dateOfBirth.validations.required');

export const genre = yup.string().required('signup:SignUp.form.fields.genre.validations.required');

export const streetAddressLine1 = yup
  .string()
  .min(10, 'signup:SignUp.form.fields.streetAddressLine1.validations.min')
  .max(100, 'signup:SignUp.form.fields.streetAddressLine1.validations.max')
  .required('signup:SignUp.form.fields.streetAddressLine1.validations.required');

export const streetAddressLine2 = yup.string().notRequired().max(100);

export const zipCode = yup
  .string()
  .matches(onlyNumbersRegex, 'signup:SignUp.form.fields.zipCode.validations.matches')
  .min(5, 'signup:SignUp.form.fields.zipCode.validations.min')
  .max(5, 'signup:SignUp.form.fields.zipCode.validations.max')
  .required('signup:SignUp.form.fields.zipCode.validations.required');

export const city = yup
  .string()
  .matches(onlyLettersSpecialRegex, 'signup:SignUp.form.fields.city.validations.matches')
  .min(3, 'signup:SignUp.form.fields.city.validations.min')
  .max(50, 'signup:SignUp.form.fields.city.validations.max')
  .required('signup:SignUp.form.fields.city.validations.required');

export const country = yup
  .string()
  .matches(onlyLettersSpecialRegex, 'signup:SignUp.form.fields.country.validations.matches')
  .min(3, 'signup:SignUp.form.fields.country.validations.min')
  .max(50, 'signup:SignUp.form.fields.country.validations.max')
  .required('signup:SignUp.form.fields.country.validations.required');

export const bugDescription = yup
  .string()
  .matches(
    alphaNumericRegex,
    'common:forms.fields.inputs.description.validations.matches',
  )
  .min(3, 'common:forms.fields.inputs.description.validations.min')
  .max(255, 'common:forms.fields.inputs.description.validations.max')
  .required('common:forms.fields.inputs.description.validations.required');

export const title = yup
  .string()
  .matches(
    alphaNumericRegex,
    'common:forms.fields.inputs.title.validations.matches',
  )
  .min(3, 'common:forms.fields.inputs.title.validations.min')
  .max(100, 'common:forms.fields.inputs.title.validations.max')
  .required('common:forms.fields.inputs.title.validations.required');

export const descriptionNoMandatory = yup
  .string()
  .matches(
    alphaNumericRegex,
    'common:forms.fields.inputs.description.validations.matches',
  )
  .min(3, 'common:forms.fields.inputs.description.validations.min')
  .max(255, 'common:forms.fields.inputs.description.validations.max')

export const status = yup
  .number()
  .max(3)

export const dateNoMandatory = yup
  .string()
  .matches(validDateRegex, 'common:forms.fields.inputs.date.validations.matches')