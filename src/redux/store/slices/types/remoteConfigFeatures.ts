export type FeatureStatus = 'on' | 'off' | 'hide';

export interface FeatureValue {
  status?: FeatureStatus;
}

export interface RemoteConfigFeatures {
  changeLanguage: FeatureValue;
  triggerAlert: FeatureValue;
  warning: FeatureValue;
  changeTheme: FeatureValue;
}
