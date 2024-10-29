import { useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
import { Logger } from '@services';
import { AuthResponseProps } from '.';

export const useFacebookAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const getCurrentUser = useCallback(async (): Promise<Profile | null> => {
    try {
      setLoading(true);
      const currentUser = await Profile.getCurrentProfile();
      return currentUser;
    } catch (error: any) {
      Logger.error('useFacebookAuth getCurrentUser:', { error: error.message });
      throw { success: false, error: error };
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithFacebook = useCallback(async (): Promise<AuthResponseProps> => {
    setLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled the Facebook login process.');
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      const userCredential = await auth().signInWithCredential(facebookCredential);
      const current = await getCurrentUser();
      Logger.log('facebook login', {
        current,
        profile: userCredential?.additionalUserInfo?.profile,
        picture: userCredential?.additionalUserInfo?.profile?.picture.data.url,
        user: userCredential?.user,
        data,
        result,
      });

      return {
        success: true,
        data: {
          token: data.accessToken,
          picture: userCredential?.additionalUserInfo?.profile?.picture.data.url,
          firstName: userCredential?.additionalUserInfo?.profile?.first_name,
          lastName: userCredential?.additionalUserInfo?.profile?.last_name,
          email: userCredential?.additionalUserInfo?.profile?.email,
          ...userCredential,
        },
      };
    } catch (error: any) {
      Logger.error('useFacebookAuth signInWithFacebook:', { error: error });
      throw { success: false, error: error };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOutFromFacebook = useCallback(async (): Promise<AuthResponseProps> => {
    try {
      setLoading(true);
      await LoginManager.logOut();
      await auth().signOut();
      return { success: true };
    } catch (error: any) {
      Logger.error('useFacebookAuth signOutFromFacebook:', { error: error.message });
      throw { success: false, error: error.message };
    } finally {
      setLoading(true);
    }
  }, []);

  return {
    signInWithFacebook,
    getCurrentUser,
    signOutFromFacebook,
    loading,
  };
};
