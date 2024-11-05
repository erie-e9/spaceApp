import { useState, useCallback, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin, User, isCancelledResponse, isSuccessResponse, statusCodes,
} from '@react-native-google-signin/google-signin';
import { Logger } from '@services';
import { AuthResponseProps } from '.';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      webClientId: '124944014292-vmkt8rcfo9nm101jp06m5ncsdo0444k8.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<any> => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const response = await GoogleSignin.signIn();
      if (!isSuccessResponse(response) || isCancelledResponse(response)) {
        throw 'cancelled'
      } else {
        const googleCredential = auth.GoogleAuthProvider.credential(response.data.idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        Logger.log('credencial', userCredential.user)
        return {
          success: true,
          data: {
            token: response.data.idToken,
            picture: userCredential?.user?.photoURL,
            firstName: userCredential?.additionalUserInfo?.profile?.given_name,
            lastName: userCredential?.additionalUserInfo?.profile?.family_name,
            email: userCredential?.additionalUserInfo?.profile?.email,
            ...userCredential,
          },
        };
      }

    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Logger.log('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Logger.error('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Logger.error('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        Logger.error('useGoogleAuth signInWithGoogle:', { error: error.message });
      }
      throw { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    setLoading(true);
    try {
      const user = auth().currentUser;
      if (user) {
        const refreshedToken = await user.getIdToken(true);
        return {
          success: true,
          data: {
            token: refreshedToken,
          },
        };
      }
    } catch (error: any) {
      Logger.error('useGoogleAuth refreshToken:', { error: error.message });
      throw { success: false, error: error?.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = useCallback(async (): Promise<User | null> => {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  }, []);

  const signOutFromGoogle = useCallback(async (): Promise<AuthResponseProps> => {
    setLoading(true);
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      return { success: true };
    } catch (error: any) {
      Logger.error('useGoogleAuth signOutFromGoogle:', { error: error.message });
      throw { success: false, error: error?.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    signInWithGoogle,
    refreshToken,
    getCurrentUser,
    signOutFromGoogle,
    loading,
  };
};
