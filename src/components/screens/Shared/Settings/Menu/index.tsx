import React, { memo } from 'react';
import { useAuthenticationHook, useTheme } from '@hooks';
import { isEmpty } from '@utils/functions';
import { MenuList, SettingsProfile } from '@components/organisms';
import { CallToAction } from '@components/templates';
import { useMenu } from './hooks/useMenu';
import { BodyContainer } from './styles';

export const Menu: React.FC = () => {
  const useMenuHook = useMenu();
  const { token } = useAuthenticationHook();
  const isAuthenticated = !isEmpty(token);
  const { Images } = useTheme();

  return (
    <CallToAction
      testID="MenuID"
      title="Menu"
      numberOfLinesTitle={3}
      backButton
      headerStyle="Secondary"
      // initialColor={initialColor}
      // finalColor={finalColor}
      // colors={['#51506b', '#181725', '#181725', '#06060a']}
      // colors={['#66768a', '#253e3f', '#172325', '#060a0a']}
      // backgroundSource={Images.wallpapers.background1}
      // backgroundSource={
      //   'https://firebasestorage.googleapis.com/v0/b/start-react-native.appspot.com/o/BigBuckBunny.mp4?alt=media&token=42bb3922-af22-4491-93a6-5100fc6a5f27'
      // }
      type="blur"
      layerOpacity={0.5} // blur
      backgroundType="image"
      backgroundSource={Images.wallpapers.background3}
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
