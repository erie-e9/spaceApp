import React, { memo } from 'react';
import { useSettingsMenu } from './hooks/useSettingsMenu';
import { MenuList } from '@components/organisms';
import { CallToAction } from '@components/templates';
import { BodyContainer } from './styles';

export const SettingsMenu: React.FC = () => {
  const useSettingsMenuHook = useSettingsMenu();

  return (
    <CallToAction
      testID="SettingsMenuID"
      title={'menu:Menu.screenTitle'}
      description={'menu:Menu.description'}
      numberOfLinesTitle={3}
      backButton
      body={
        <BodyContainer>
          <MenuList listItems={useSettingsMenuHook.listItems} />
        </BodyContainer>
      }
    />
  );
};

export default memo(SettingsMenu);
