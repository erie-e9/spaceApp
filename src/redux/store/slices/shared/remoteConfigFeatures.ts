import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';

export const initialState: RemoteConfigFeatures = {
  // shared
  webviewOpenOnBrowser: { status: 'on' },
  webviewReload: { status: 'on' },
  webviewShare: { status: 'on' },
  contactUsViaEmail: { status: 'on' },
  contactUsViaFacebook: { status: 'on' },
  contactUsViaInstagram: { status: 'on' },
  contactUsViaCall: { status: 'on' },
  contactUsViaTelegram: { status: 'on' },
  contactUsViaWhatsApp: { status: 'on' },
  aboutUs: { status: 'on' },
  termsOfUse: { status: 'on' },
  privacyPolicy: { status: 'on' },
  contactUs: { status: 'on' },
  faqs: { status: 'on' },
  versionApp: { status: 'on' },

  // settings
  settingsMenu: { status: 'on' },
  changeAppearance: { status: 'on' },
  changeTheme: { status: 'on' },
  changeMode: { status: 'on' },
  changeLanguage: { status: 'on' },
  notificationSettings: { status: 'on' },
  fingerprint: { status: 'on' },
  enableBiometrics: { status: 'on' },
  safetyTips: { status: 'on' },
  appPermissions: { status: 'on' },
  appSecurity: { status: 'on' },

  // help center
  helpCenter: { status: 'on' },
  feedback: { status: 'on' },
  bugReporter: { status: 'on' },
  untrustedDevice: { status: 'on' },
  errorCatcher: { status: 'on' },

  // auth
  logIn: { status: 'on' },
  signUp: { status: 'on' },
  accountRecovery: { status: 'on' },
  useBiometrics: { status: 'on' },
  googleAuth: { status: 'on' },
  facebookAuth: { status: 'on' },
  instagramAuth: { status: 'on' },
  xAuth: { status: 'on' },
  appleAuth: { status: 'on' },
  socialNetworksAuth: { status: 'on' },

  // features
  notificationCenter: { status: 'on' },

  // profile
  editUsername: { status: 'on' },
  editPhoneNumber: { status: 'on' },
  editEmail: { status: 'on' },
  editPhoto: { status: 'on' },
  editPassword: { status: 'on' },
  editFullName: { status: 'on' },
  editDateOfBirth: { status: 'on' },
  editGenre: { status: 'on' },
  editAddress: { status: 'on' },
  editZipCode: { status: 'on' },
  editCity: { status: 'on' },
  editCountry: { status: 'on' },
};

const slice = createSlice({
  name: 'remoteConfigFeatures',
  initialState,
  reducers: {
    updateRemoteConfigFeatures: (state, { payload }: PayloadAction<RemoteConfigFeatures>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { updateRemoteConfigFeatures } = slice.actions;

export default slice.reducer;
