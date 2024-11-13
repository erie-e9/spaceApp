import { signUpMethod } from '@navigators/Auth';

export interface User {
  username?: string;
  phoneNumber?: string;
  email?: string;
  photo?: {
    fileName?: string;
    base64?: string;
    fileSize?: number;
    type?: string;
    uri?: string;
  } | null;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  genre?: string;
  streetAddressLine1?: string;
  streetAddressLine2?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  loggedOnDevice?: boolean;
  signUpMethod?: signUpMethod;
};
