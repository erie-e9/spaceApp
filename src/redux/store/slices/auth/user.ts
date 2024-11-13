import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type User } from '@slices/types';

const initialState: User = {
  username: '',
  phoneNumber: '',
  email: '',
  photo: {
    fileName: '',
    base64: '',
    fileSize: 0,
    type: '',
    uri: '',
  },
  password: '',
  confirmPassword: '',
  newPassword: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  genre: '',
  streetAddressLine1: '',
  streetAddressLine2: '',
  zipCode: '',
  city: '',
  country: '',
  loggedOnDevice: false,
  signUpMethod: 'form',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
    removeUser: () => initialState,
  },
});

export const { storeUser, updateUser, removeUser } = slice.actions;

export default slice.reducer;
