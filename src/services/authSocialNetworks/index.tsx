import { useEffect, useCallback } from 'react';
import { useCopy } from '@services';
import { useResponseHandler, useToast } from '@hooks';
import { firstCapitalized } from '@utils/functions';
import { useGoogleAuth } from './useGoogleAuth';
import { useAppleAuth } from './useAppleAuth';
import { useFacebookAuth } from './useFacebookAuth';
// import { useInstagramAuth } from './useInstagramAuth';
// import { useXAuth } from './useXAuth';

export type ProviderType = 'google' | 'apple' | 'facebook' | 'instagram' | 'x';
export type ActionType = 'signIn' | 'signOut' | 'refreshAuth';

export interface AuthSocialNetworkProps {
  provider: ProviderType;
  type: ActionType;
}

export interface AuthResponseProps {
  success?: boolean;
  data?: any;
  error?: string;
}

export const authSocialNetworks = () => {
  const { loading, setLoading } = useResponseHandler();
  const { getCopyValue } = useCopy();

  const googleAuth = useGoogleAuth();
  const appleAuth = useAppleAuth();
  const facebookAuth = useFacebookAuth();
  // const instagramAuth = useInstagramAuth();
  // const XAuth = useXAuth();

  useEffect(() => {
    setLoading(
      googleAuth.loading || appleAuth.loading || facebookAuth.loading,
      // instagramAuth.loading
    );
  }, [
    googleAuth.loading,
    appleAuth.loading,
    facebookAuth.loading,
    // instagramAuth.loading,
  ]);

  const authHandler = useCallback(
    async ({ provider, type }: AuthSocialNetworkProps): Promise<AuthResponseProps> => {
      try {
        let response: AuthResponseProps = {};

        switch (provider) {
          case 'google':
            if (type === 'signIn') {
              response = await googleAuth.signInWithGoogle();
            } else if (type === 'signOut') {
              response = await googleAuth.signOutFromGoogle();
            } else if (type === 'refreshAuth') {
              response = await googleAuth.refreshToken();
            }
            break;
          case 'apple':
            if (type === 'signIn') {
              response = await appleAuth.signInWithApple();
            } else if (type === 'signOut') {
              response = await appleAuth.signOutFromApple();
            } else if (type === 'refreshAuth') {
              response = await appleAuth.refreshToken();
            }
            break;
          case 'facebook':
            if (type === 'signIn') {
              response = await facebookAuth.signInWithFacebook();
            } else if (type === 'signOut') {
              response = await facebookAuth.signOutFromFacebook();
            } else if (type === 'refreshAuth') {
              response = await facebookAuth.refreshToken();
            }
            break;
          // case 'instagram':
          //   if (type === 'signIn') {
          //     response = await instagramAuth.signInWithInstagram();
          //   } else if (type === 'signOut') {
          //     response = await instagramAuth.signOutFromInstagram();
          //   } else if (type === 'refreshAuth') {
          //     response = await instagramAuth.refreshToken();
          //   }
          //   break;
          // case 'x':
          //   // Uncomment and implement when XAuth is ready
          //   if (type === 'signIn') {
          //     response = await XAuth.signInWithX();
          //   } else if (type === 'signOut') {
          //     response = await XAuth.signOutFromX();
          //   } else if (type === 'refreshAuth') {
          //     response = await XAuth.refreshToken();
          //   }
          //   break;
          default:
            response = { success: false, error: 'Invalid provider' };
            break;
        }
        useToast.success({
          message: getCopyValue(
            'authentication:Authentication.alerts.authSocialMedia.signInSuccess',
            { provider: firstCapitalized(provider) },
          ),
          duration: 3000,
        });

        return response;
      } catch (error: any) {
        if (
          !(String(error?.error).includes('cancelled') || String(error?.error).includes('canceled'))
        ) {
          useToast.error({
            message: getCopyValue(
              'authentication:Authentication.alerts.authSocialMedia.signInFail',
              { provider: firstCapitalized(provider) },
            ),
            duration: 3000,
          });
        }

        return { success: false, error: error?.message || 'An error occurred' };
      }
    },
    [googleAuth, appleAuth, facebookAuth],
  );

  return {
    authHandler,
    loading,
  };
};
