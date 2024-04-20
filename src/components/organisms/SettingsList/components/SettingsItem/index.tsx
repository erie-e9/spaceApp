import React, { memo } from 'react';
import { useCopy } from '@services';
import { RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';
import { SVGIcon } from '@components/atoms';
import { SettingsButton } from '@components/molecules';
import {
  SettingItemContainer,
  SettingHeadContainer,
  TitleContainer,
  SettingItemTitle,
} from './styles';

export interface SettingsItemProps {
  testID: string;
  onPress?: (() => void) | undefined;
  title: string;
  leftIcon?: string | undefined;
  rightIcon?: string | undefined;
  description?: string | undefined;
  selectedOption?: string | undefined;
  remoteConfig: keyof RemoteConfigFeatures;
}

interface Props {
  icon: string;
  title: string;
  items: SettingsItemProps[];
}

export const SettingsItem: React.FC<Props> = ({ icon, title, items }) => {
  const { getCopyValue } = useCopy();

  return (
    <SettingItemContainer>
      <SettingHeadContainer>
        {icon && <SVGIcon icon={icon} />}
        {title && title !== '' && <TitleContainer leftIcon={Boolean(icon)}>
            <SettingItemTitle type="Body2">
              {getCopyValue(title)}
            </SettingItemTitle>
          </TitleContainer>}
      </SettingHeadContainer>
      {items.map((element: SettingsItemProps, key: React.Key) => (
        <SettingsButton
          key={key}
          testID={element.testID}
          title={element.title}
          leftIcon={element.leftIcon}
          rightIcon={element.rightIcon}
          description={element.description || undefined}
          onPress={element.onPress}
          selectedOption={element.selectedOption}
          remoteConfig={element.remoteConfig}
        />
      ))}
    </SettingItemContainer>
  );
};

export default memo(SettingsItem);
