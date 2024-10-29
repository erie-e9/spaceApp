import React, { memo } from 'react';
import { useAuthenticationHook } from '@hooks';
import { isEmpty } from '@utils/functions';
import { useOTP } from './hooks/useOTP';
import { CallToAction } from '@components/templates';
import { BodyContainer } from './styles';

export const SettingsMenu: React.FC = () => {
  const settingsMenuHook = useOTP();
  const { token } = useAuthenticationHook();
  const isAuthenticated = !isEmpty(token);

  return (
    <CallToAction
      testID="SettingsMenuID"
      numberOfLinesTitle={3}
      backButton
      headerStyle="Secondary"
      body={<BodyContainer></BodyContainer>}
      primaryButton={isAuthenticated ? settingsMenuHook.primaryButton : undefined}
    />
  );
};

export default memo(SettingsMenu);
