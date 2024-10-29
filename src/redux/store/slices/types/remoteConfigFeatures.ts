export type FeatureStatus = 'on' | 'off' | 'hide';

export interface FeatureValue {
  status?: FeatureStatus;
}

export interface RemoteConfigFeatures {
  // shared
  webviewOpenOnBrowser: FeatureValue;
  webviewReload: FeatureValue;
  webviewShare: FeatureValue;
  contactUsViaEmail: FeatureValue;
  contactUsViaFacebook: FeatureValue;
  contactUsViaInstagram: FeatureValue;
  contactUsViaCall: FeatureValue;
  contactUsViaTelegram: FeatureValue;
  contactUsViaWhatsApp: FeatureValue;
  aboutUs: FeatureValue;
  termsOfUse: FeatureValue;
  privacyPolicy: FeatureValue;
  contactUs: FeatureValue;
  faqs: FeatureValue;
  versionApp: FeatureValue;

  // settings
  settingsMenu: FeatureValue;
  changeAppearance: FeatureValue;
  changeTheme: FeatureValue;
  changeMode: FeatureValue;
  changeLanguage: FeatureValue;
  notificationSettings: FeatureValue;
  fingerprint: FeatureValue;
  enableBiometrics: FeatureValue;
  safetyTips: FeatureValue;
  appPermissions: FeatureValue;
  appSecurity: FeatureValue;

  // help center
  helpCenter: FeatureValue;
  feedbackAndSharing: FeatureValue;
  bugReporter: FeatureValue;
  untrustedDevice: FeatureValue;
  errorCatcher: FeatureValue;

  // auth
  logIn: FeatureValue;
  signUp: FeatureValue;
  accountRecovery: FeatureValue;
  useBiometrics: FeatureValue;
  googleAuth: FeatureValue;
  facebookAuth: FeatureValue;
  instagramAuth: FeatureValue;
  xAuth: FeatureValue;
  appleAuth: FeatureValue;
  socialNetworksAuth: FeatureValue;

  // features
  notificationCenter: FeatureValue;

  // profile
  editUsername: FeatureValue;
  editPhoneNumber: FeatureValue;
  editEmail: FeatureValue;
  editPhoto: FeatureValue;
  editPassword: FeatureValue;
  editFullName: FeatureValue;
  editDateOfBirth: FeatureValue;
  editGenre: FeatureValue;
  editAddress: FeatureValue;
  editZipCode: FeatureValue;
  editCity: FeatureValue;
  editCountry: FeatureValue;
}
