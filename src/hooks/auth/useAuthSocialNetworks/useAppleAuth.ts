import { useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import appleAuth from '@invertase/react-native-apple-authentication';
import { Logger } from '@services';
import { AuthResponseProps } from '.';

export const useAppleAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithApple = useCallback(async (): Promise<AuthResponseProps> => {
    setLoading(true);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }

      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      const userCredential = await auth().signInWithCredential(appleCredential);
      return { success: true, data: userCredential };
    } catch (error: any) {
      Logger.error('useAppleAuth signInWithApple:', { error: error.message });
      throw { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOutFromApple = useCallback(async (): Promise<AuthResponseProps> => {
    try {
      setLoading(true);
      await auth().signOut();
      return { success: true };
    } catch (error: any) {
      Logger.error('useAppleAuth signOutFromApple:', { error: error.message });
      throw { success: false, error: error.message };
    } finally {
      setLoading(true);
    }
  }, []);

  return { signInWithApple, signOutFromApple, loading };
};
