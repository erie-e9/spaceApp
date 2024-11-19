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
  title,
  descriptionNoMandatory,
  status,
  dateNoMandatory
} from '@utils/forms/validators/fields'; // improve, pragmatic values instead of specific

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

  const taskSchema = useMemo(
    () =>
      yup.object().shape({
        title,
        descriptionNoMandatory,
        status,
        dateNoMandatory,
        // attached_files: photo,
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
    taskSchema,
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
    taskSchema,
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
    taskSchema,
  };
};
