export type FeatureStatus = 'on' | 'off' | 'hide';

export interface FeatureValue {
  status?: FeatureStatus;
}

export interface RemoteConfigFeatures {
  changeLanguage: FeatureValue;
  triggerAlert: FeatureValue;
  warning: FeatureValue;
  changeTheme: FeatureValue;
  webviewOpenOnBrowser: FeatureValue;
  webviewReload: FeatureValue;
  webviewShare: FeatureValue;
  infoAndSupport: FeatureValue;
  hackedDevice: FeatureValue;
  errorCatcher: FeatureValue;
  contactUsViaEmail: FeatureValue;
  contactUsViaFacebook: FeatureValue;
  contactUsViaInstagram: FeatureValue;
  contactUsViaCall: FeatureValue;
  contactUsViaTelegram: FeatureValue;
  contactUsViaWhatsApp: FeatureValue;
  aboutUs: FeatureValue;
  noticeOfPrivacy: FeatureValue;
  termsAndConditions: FeatureValue;
  contactUs: FeatureValue;
  faqs: FeatureValue;
  accountRecovery: FeatureValue;
  useBiometrics: FeatureValue;
  googleLogIn: FeatureValue;
  facebookLogin: FeatureValue;
  instagramLogin: FeatureValue;
  logIn: FeatureValue;
  signUp: FeatureValue;
  socialNetworksLogIn: FeatureValue;
}
