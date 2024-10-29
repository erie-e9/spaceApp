import { useMemo } from 'react';
import * as yup from 'yup';
import {
  phoneNumber,
  username,
  email,
  photo,
  password,
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
  bugDescription,
} from '@utils/forms/validators/fields';

export const stepSchemas = () => {
  const accountDataSchema = useMemo(
    () =>
      yup.object().shape({
        username,
        email,
        // photo,
        password,
        confirmPassword,
      }),
    [],
  );

  const personalDetailsSchema = useMemo(
    () =>
      yup.object().shape({
        firstName,
        lastName,
        dateOfBirth,
        genre,
      }),
    [],
  );

  const locationDetailsSchema = useMemo(
    () =>
      yup.object().shape({
        streetAddressLine1,
        streetAddressLine2,
        zipCode,
        city,
        country,
      }),
    [],
  );

  const socialMediaMissingDataPhoneNumberSchema = useMemo(
    () =>
      yup.object().shape({
        phoneNumber,
        username,
      }),
    [],
  );

  const socialMediaMissingDataSchema = useMemo(
    () =>
      yup.object().shape({
        dateOfBirth,
        genre,
      }),
    [],
  );

  const bugReporterSchema = useMemo(
    () =>
      yup.object().shape({
        bugDescription,
        photo,
      }),
    [],
  );

  return {
    accountDataSchema,
    personalDetailsSchema,
    locationDetailsSchema,
    socialMediaMissingDataPhoneNumberSchema,
    socialMediaMissingDataSchema,
    bugReporterSchema,
  };
};

// Schemas
export const formSchemas = () => {
  const {
    accountDataSchema,
    personalDetailsSchema,
    locationDetailsSchema,
    socialMediaMissingDataPhoneNumberSchema,
    socialMediaMissingDataSchema,
    bugReporterSchema,
  } = stepSchemas();
  const accountSchema = useMemo(
    () => [accountDataSchema, personalDetailsSchema, locationDetailsSchema],
    [],
  );

  const accountWithSocialMediaSchema = useMemo(
    () => [
      socialMediaMissingDataPhoneNumberSchema,
      socialMediaMissingDataSchema,
      locationDetailsSchema,
    ],
    [],
  );

  return {
    accountSchema,
    accountWithSocialMediaSchema,
    bugReporterSchema,
  };
};
