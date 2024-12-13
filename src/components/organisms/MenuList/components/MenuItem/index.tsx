import React, { memo, useCallback } from 'react';
import { type MenuItemProps, type SettingsRenderItemProps } from '@types';
import { SVGIcon } from '@components/atoms';
import { MenuButton } from '@components/molecules';
import {
  SettingItemContainer,
  SettingHeadContainer,
  TitleContainer,
  SettingItemTitle,
  StyledList,
} from './styles';

export const MenuItem: React.FC<MenuItemProps> = ({ icon, title, items }) => {
  const renderItem = useCallback(({ item }: { item: SettingsRenderItemProps }) => {
    return (
      <MenuButton
        hasParent={!!title}
        title={item.title}
        description={item.description || undefined}
        leftIcon={item.leftIcon}
        rightIcon={item.rightIcon}
        onPress={item.onPress}
        selectedOption={item.selectedOption}
        remoteFeatureFlags={item.remoteFeatureFlags}
        disabled={item.disabled}
        rightBody={item.rightBody}
      />
    );
  }, []);

  return (
    <SettingItemContainer>
      <SettingHeadContainer>
        {icon && <SVGIcon icon={icon} />}
        {title && title !== '' && (
          <TitleContainer leftIcon={Boolean(icon)}>
            <SettingItemTitle type="Subtitle1" color="typography950">
              {title}
            </SettingItemTitle>
          </TitleContainer>
        )}
      </SettingHeadContainer>
      <StyledList
        data={items}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </SettingItemContainer>
  );
};

export default memo(MenuItem);
