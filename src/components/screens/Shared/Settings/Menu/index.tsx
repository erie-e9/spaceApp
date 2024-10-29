import React, { memo } from 'react';
import { useAuthenticationHook } from '@hooks';
import { isEmpty } from '@utils/functions';
import { MenuList, SettingsProfile } from '@components/organisms';
import { CallToAction } from '@components/templates';
import { useMenu } from './hooks/useMenu';
import { BodyContainer } from './styles';

export const Menu: React.FC = () => {
  const useMenuHook = useMenu();
  const { token } = useAuthenticationHook();
  const isAuthenticated = !isEmpty(token);

  return (
    <CallToAction
      testID="MenuID"
      title="Menu"
      numberOfLinesTitle={3}
      backButton
      headerStyle="Secondary"
      body={
        <BodyContainer>
          <SettingsProfile />
          <MenuList listItems={useMenuHook.listItems} />
        </BodyContainer>
      }
      primaryButton={isAuthenticated ? useMenuHook.primaryButton : undefined}
    />
  );
};

export default memo(Menu);
