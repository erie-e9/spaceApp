/*
    This file manage pre-structured fields that could be reused in any form, provide some props necessary for any form.
    Encourages to mantain and don't DRY (Don't Repeat Yourself).
*/

export const username = {
  name: 'username',
  label: 'signup:SignUp.form.fields.username.name',
  type: 'textinput',
  maxLength: 30,
  removeBlankSpaces: true,
  returnKeyType: 'next',
  required: true,
};

export const phoneNumber = {
  name: 'phoneNumber',
  label: 'signup:SignUp.form.fields.phoneNumber.name',
  type: 'textinput',
  maxLength: 12,
  keyboardType: 'phone-pad',
  removeBlankSpaces: true,
  returnKeyType: 'next',
  textContentType: 'telephoneNumber',
  required: true,
};

export const email = {
  name: 'email',
  label: 'signup:SignUp.form.fields.email.name',
  type: 'textinput',
  maxLength: 320,
  keyboardType: 'email-address',
  removeBlankSpaces: true,
  returnKeyType: 'next',
  textContentType: 'emailAddress',
};

export const photo = {
  name: 'photo',
  label: 'signup:SignUp.form.fields.photo.name',
  type: 'camera-image',
  origin: 'library',
  mediaType: 'photo',
  selectLimit: 1,
  required: true,
};

export const password = {
  name: 'password',
  label: 'signup:SignUp.form.fields.password.name',
  type: 'textinput',
  maxLength: 127,
  secureTextEntry: true,
  showPasswordStrength: true,
  returnKeyType: 'next',
  textContentType: 'password',
  keyboardType: 'default',
  required: true,
};

export const newPassword = {
  name: 'newPassword',
  label: 'signup:SignUp.form.fields.newPassword.name',
  type: 'textinput',
  maxLength: 127,
  secureTextEntry: true,
  showPasswordStrength: true,
  returnKeyType: 'next',
  textContentType: 'newPassword',
  keyboardType: 'default',
  required: true,
};

export const confirmPassword = {
  name: 'confirmPassword',
  label: 'signup:SignUp.form.fields.confirmPassword.name',
  type: 'textinput',
  maxLength: 127,
  secureTextEntry: true,
  returnKeyType: 'send',
  textContentType: 'password',
  keyboardType: 'default',
  required: true,
};

export const firstName = {
  name: 'firstName',
  label: 'signup:SignUp.form.fields.firstName.name',
  type: 'textinput',
  maxLength: 50,
  autoCapitalize: 'words',
  returnKeyType: 'next',
  textContentType: 'name',
  required: true,
};

export const lastName = {
  name: 'lastName',
  label: 'signup:SignUp.form.fields.lastName.name',
  type: 'textinput',
  maxLength: 50,
  autoCapitalize: 'words',
  returnKeyType: 'next',
  textContentType: 'familyName',
  required: true,
};

export const dateOfBirth = {
  name: 'dateOfBirth',
  label: 'signup:SignUp.form.fields.dateOfBirth.name',
  type: 'date-picker',
  required: true,
};

export const genre = {
  name: 'genre',
  label: 'signup:SignUp.form.fields.genre.name',
  type: 'dropdown',
  bottomSheet: true,
  showButton: false,
  required: true,
  dropdownHeight: 250,
};

export const streetAddressLine1 = {
  name: 'streetAddressLine1',
  label: 'signup:SignUp.form.fields.streetAddressLine1.name',
  type: 'textinput',
  maxLength: 100,
  returnKeyType: 'next',
  textContentType: 'streetAddressLine1',
  required: true,
  multiline: true,
};

export const streetAddressLine2 = {
  name: 'streetAddressLine2',
  label: 'signup:SignUp.form.fields.streetAddressLine2.name',
  type: 'textinput',
  maxLength: 100,
  returnKeyType: 'next',
  textContentType: 'streetAddressLine2',
  required: false,
};

export const zipCode = {
  name: 'zipCode',
  label: 'signup:SignUp.form.fields.zipCode.name',
  type: 'textinput',
  keyboardType: 'number-pad',
  maxLength: 5,
  returnKeyType: 'next',
  removeBlankSpaces: true,
  textContentType: 'postalCode',
  required: true,
};

export const city = {
  name: 'city',
  label: 'signup:SignUp.form.fields.city.name',
  type: 'textinput',
  maxLength: 50,
  returnKeyType: 'next',
  textContentType: 'addressCity',
  required: true,
};

export const country = {
  name: 'country',
  label: 'signup:SignUp.form.fields.country.name',
  type: 'textinput',
  maxLength: 50,
  returnKeyType: 'send',
  textContentType: 'countryName',
  required: true,
};
