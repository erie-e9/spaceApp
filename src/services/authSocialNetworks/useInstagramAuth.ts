import { useRef, useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import InstagramLogin, { InstagramLoginView } from 'react-native-instagram-login';
import { Logger } from '@services';
import { AuthResponseProps } from '.';

export const useInstagramAuth = () => {
  const instagramLoginRef = useRef<typeof InstagramLoginView>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const clientId = 'YOUR_INSTAGRAM_CLIENT_ID';
  const redirectUri = 'https://localhost';

  const handleInstagramLoginSuccess = useCallback(
    async (token: string): Promise<AuthResponseProps> => {
      try {
        setLoading(true);
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;

        const instagramCredential = auth.OAuthProvider.credential(token, '');
        const userCredential = await auth().signInWithCredential(instagramCredential);
        setLoading(false);
        return { success: true, data: userCredential };
      } catch (error: any) {
        Logger.error('useInstagramAuth handleInstagramLoginSuccess:', { error: error.message });
        throw { success: false, error: error.message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signInWithInstagram = () => {
    instagramLoginRef.current?.show();
  };

  const signOutFromInstagram = useCallback(async (): Promise<AuthResponseProps> => {
    try {
      setLoading(true);
      await auth().signOut();
      return { success: true };
    } catch (error: any) {
      Logger.error('useInstagramAuth signOutFromInstagram:', { error: error.message });
      throw { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    signInWithInstagram,
    handleInstagramLoginSuccess,
    signOutFromInstagram,
    instagramLoginRef,
    loading,
  };
};
