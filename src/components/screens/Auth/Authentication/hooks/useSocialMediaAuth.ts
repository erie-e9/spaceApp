import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authSocialNetworks, Logger, ProviderType } from '@services';
import { type TouchableProps } from '@types';
import { isEmpty } from '@utils/functions';
import { useAuthenticationHook, useIsAppInstalled, useResponseHandler } from '@hooks';
import { useCheckPendingProcess } from './useCheckPendingProcess';

export const useSocialMediaAuth = () => {
  const [socialNetworkButtons, setSocialNetworkButtons] = useState<Array<TouchableProps>>([]);
  const navigation = useNavigation();
  const { loading, setLoading } = useResponseHandler();
  const { isAppInstalledByName } = useIsAppInstalled();
  const { checkPendingFormAlert } = useCheckPendingProcess();
  const { authHandler, loading: authSocialNetworkLoading } = authSocialNetworks();
  const { user, removeToken, storeUser, removeUser } = useAuthenticationHook();

  const signInSocialNetworksHandler = useCallback(
    async (provider: ProviderType) => {
      try {
        setLoading(!authSocialNetworkLoading);
        const { success, data } = await authHandler({
          provider,
          type: 'signIn',
        });

        if (success && data && !authSocialNetworkLoading && !isEmpty(data.token)) {
          await storeUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            photo: {
              uri: data.picture,
            },
            signUpMethod: 'socialMedia',
          });
          const signInCompleted = false; //! temp until API is finished
          if (signInCompleted) navigation?.replace('Private', { screen: 'Profile' } as never);
          if (user.email === data.email && user.phoneNumber && !signInCompleted) {
            await checkPendingFormAlert(user.phoneNumber, data.email);
          } else {
            await navigation?.replace('Auth', { screen: 'SignUp' } as never);
          }
        }
      } catch (error) {
        Logger.log('signInSocialNetworksHandler', { error });
        throw error;
      } finally {
        setLoading(authSocialNetworkLoading);
      }
    },
    [authSocialNetworkLoading],
  );

  const clearStore = useCallback(async () => {
    await removeToken();
    await removeUser();
  }, [user]);

  const fetchSocialNetworkButtons = useCallback(async () => {
    const buttons: Array<TouchableProps> = [];

    if (Platform.OS === 'ios') {
      buttons.push({
        testID: 'authenticationSocialNetworksAuthApple',
        icon: 'apple',
        iconType: 'svg',
        disabled: loading,
        widthIcon: 40,
        heightIcon: 40,
        onPress: () => signInSocialNetworksHandler('apple'),
        remoteFeatureFlags: ['appleAuth'],
      });
    }

    buttons.push({
      testID: 'authenticationSocialNetworksAuthGoogle',
      icon: 'google',
      iconType: 'svg',
      disabled: loading,
      widthIcon: 40,
      heightIcon: 40,
      onPress: () => signInSocialNetworksHandler('google'),
      remoteFeatureFlags: ['googleAuth'],
    });

    if (
      await isAppInstalledByName({
        packageName: 'com.facebook.katana',
        appSchemeIOS: 'fb',
      })
    ) {
      buttons.push({
        testID: 'authenticationSocialNetworksAuthFacebook',
        icon: 'facebook',
        iconType: 'svg',
        disabled: loading,
        widthIcon: 40,
        heightIcon: 40,
        onPress: () => signInSocialNetworksHandler('facebook'),
        remoteFeatureFlags: ['facebookAuth'],
      });
    }

    // if (await isAppInstalledByName({
    //   packageName: 'com.instagram.android',
    //   appSchemeIOS: 'instagram',
    // })) {
    //   buttons.push({
    //     testID: 'authenticationSocialNetworksAuthInstagram',
    //     icon: 'instagram',
    //     iconType: 'svg',
    //     disabled: loading,
    //     widthIcon: 40,
    //     heightIcon: 40,
    //     onPress: () => signInSocialNetworksHandler('instagram'),
    //     remoteFeatureFlags: ['instagramAuth'],
    //   });
    // }

    if (
      await isAppInstalledByName({
        packageName: 'com.twitter.android',
        appSchemeIOS: 'twitter',
      })
    ) {
      buttons.push({
        testID: 'authenticationSocialNetworksAuthX',
        icon: 'x',
        iconType: 'svg',
        disabled: loading,
        widthIcon: 40,
        heightIcon: 40,
        onPress: () => signInSocialNetworksHandler('x'),
        remoteFeatureFlags: ['xAuth'],
      });
    }

    setSocialNetworkButtons(buttons);
  }, []);

  useEffect(() => {
    fetchSocialNetworkButtons();
  }, [loading, isAppInstalledByName, signInSocialNetworksHandler, clearStore]);

  return {
    socialNetworksAuth: socialNetworkButtons,
  };
};
