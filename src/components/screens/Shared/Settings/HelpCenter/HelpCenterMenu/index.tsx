import React, { memo } from 'react';
import { useHelpCenterMenu } from './hooks/useHelpCenterMenu';
import { MenuList } from '@components/organisms';
import { CallToAction } from '@components/templates';
import { BodyContainer } from './styles';

export const HelpCenterMenu: React.FC = () => {
  const useHelpCenterMenuHook = useHelpCenterMenu();

  return (
    <CallToAction
      testID="HelpCenterMenuID"
      title={'menu:helpCenter.screenTitle'}
      description={'menu:helpCenter.description'}
      numberOfLinesTitle={3}
      backButton
      body={
        <BodyContainer>
          <MenuList listItems={useHelpCenterMenuHook.listItems} />
        </BodyContainer>
      }
    />
  );
};

export default memo(HelpCenterMenu);
