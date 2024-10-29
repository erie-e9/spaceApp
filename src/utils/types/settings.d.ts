import { ReactElement } from 'react';
import { type RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';

export type InfoType = 'aboutUs' | 'termsOfUse' | 'privacyPolicy';

export interface SettingsRenderItemProps {
  testID?: string;
  title: string;
  description?: string | undefined;
  leftIcon?: string | undefined;
  rightIcon?: string | undefined;
  disabled?: boolean;
  selectedOption?: string | undefined;
  onPress?: (() => void) | undefined;
  remoteFeatureFlags?: Array<string> | (keyof RemoteConfigFeatures)[];
  rightBody?: JSX.Element | ReactElement;
  hasParent?: boolean;
}

export interface MenuItemProps {
  icon?: string;
  title?: string;
  items: SettingsRenderItemProps[];
}
