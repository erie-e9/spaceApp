import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';

export const initialState: RemoteConfigFeatures = {
  changeLanguage: { status: 'on' },
  triggerAlert: { status: 'on' },
  warning: { status: 'on' },
  changeTheme: { status: 'on' },
  webviewOpenOnBrowser: { status: 'on' },
  webviewReload: { status: 'on' },
  webviewShare: { status: 'on' },
  infoAndSupport: { status: 'on' },
  hackedDevice: { status: 'on' },
  errorCatcher: { status: 'on' },
  contactUsViaEmail: { status: 'on' },
  contactUsViaFacebook: { status: 'on' },
  contactUsViaInstagram: { status: 'on' },
  contactUsViaCall: { status: 'on' },
  contactUsViaTelegram: { status: 'on' },
  contactUsViaWhatsApp: { status: 'on' },
  aboutUs: { status: 'on' },
  noticeOfPrivacy: { status: 'on' },
  termsAndConditions: { status: 'on' },
  contactUs: { status: 'on' },
  faqs: { status: 'on' },
};

const slice = createSlice({
  name: 'remoteConfigFeatures',
  initialState,
  reducers: {
    updateRemoteConfigFeatures: (
      state,
      { payload }: PayloadAction<RemoteConfigFeatures>,
    ) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { updateRemoteConfigFeatures } = slice.actions;

export default slice.reducer;
