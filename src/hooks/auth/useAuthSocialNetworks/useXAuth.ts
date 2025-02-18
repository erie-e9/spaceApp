import { useState, useCallback, useEffect } from 'react';
import Axios from 'axios';
import OAuth from 'oauth-1.0a';
import auth from '@react-native-firebase/auth';
import crypto from 'react-native-quick-crypto';
import { Logger } from '@services';
import { AuthResponseProps } from '.';
import { Linking } from 'react-native';
const CONSUMER_KEY = process.env.X_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.X_CONSUMER_SECRET;
const TWITTER_API = 'https://api.twitter.com';
const OAUTH_CALLBACK_URL = 'oauth-app://oauth';

export const useXAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithX = useCallback(async () => {
    setLoading(true);
    const oauth = new OAuth({
      consumer: {
        key: CONSUMER_KEY || '',
        secret: CONSUMER_SECRET || '',
      },
      signature_method: 'HMAC-SHA1',
      hash_function: (baseString, key) =>
        crypto.createHmac('sha1', key).update(baseString).digest('base64'),
    });

    const request_data = {
      url: `${TWITTER_API}/oauth/request_token`,
      method: 'POST',
      data: { oauth_callback: OAUTH_CALLBACK_URL },
    };

    const headers = {
      ...oauth.toHeader(
        oauth.authorize({
          url: request_data.url,
          method: request_data.method,
          data: { oauth_callback: OAUTH_CALLBACK_URL },
        }),
      ),
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    };

    try {
      // Remove the empty {} body from the post request
      const res = await Axios.post(request_data.url, null, { headers });
      const responseData = res.data;
      const requestToken = responseData.match(/oauth_token=([^&]+)/)[1];

      // Redirect to Twitter login
      const twitterLoginURL = `${TWITTER_API}/oauth/authenticate?oauth_token=${requestToken}`;
      Linking.openURL(twitterLoginURL);

      //
      // const userCredential = await auth().signInWithCredential(XCredential);
      // // const current = await getCurrentUser();
      // console.log('X login', {
      //   // current,
      //   profile: userCredential?.additionalUserInfo?.profile,
      //   picture: userCredential?.additionalUserInfo?.profile?.picture.data.url,
      //   user: userCredential?.user,
      //   authToken,
      //   authTokenSecret,
      // });

      // return {
      //   success: true,
      //   data: {
      //     token: authToken,
      //     picture:
      //       userCredential?.additionalUserInfo?.profile?.picture.data.url,
      //     firstName: userCredential?.additionalUserInfo?.profile?.first_name,
      //     lastName: userCredential?.additionalUserInfo?.profile?.last_name,
      //     email: userCredential?.additionalUserInfo?.profile?.email,
      //     ...userCredential,
      //   },
      // };
    } catch (error: any) {
      Logger.error('useXAuth signInWithX:', { error: error.message });
      throw { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const subscribe = Linking.addEventListener('url', async (event: { url: string }) => {
      const url = event.url;
      const params = url.split('?')[1];
      const tokenParts = params.split('&');
      const requestToken = tokenParts[0].split('=')[1];
      const oauthVerifier = tokenParts[1].split('=')[1];

      const oauth = new OAuth({
        consumer: {
          key: CONSUMER_KEY || '',
          secret: CONSUMER_SECRET || '',
        },
        signature_method: 'HMAC-SHA1',
        hash_function: (baseString, key) =>
          crypto.createHmac('sha1', key).update(baseString).digest('base64'),
      });

      const request_data = {
        url: `${TWITTER_API}/oauth/access_token`,
        method: 'POST',
        data: {
          oauth_token: requestToken,
          oauth_verifier: oauthVerifier,
        },
      };

      try {
        const res = await Axios.post(request_data.url, null, {
          headers: { ...oauth.toHeader(oauth.authorize(request_data)) },
        });
        const responseData = res.data;
        const authToken = responseData.match(/oauth_token=([^&]+)/)[1];
        const authTokenSecret = responseData.match(/oauth_token_secret=([^&]+)/)[1];

        console.log(
          'Success',
          `authToken: ${authToken.slice(0, 7) + '...'}\nauthTokenSecret: ${
            authTokenSecret.slice(1, 7) + '...'
          }`,
        );
      } catch (error: any) {
        console.log('Error: access token', error.response?.data || error.message);
      }
    });

    return () => subscribe.remove();
  }, []);

  const signOutFromX = useCallback(async (): Promise<AuthResponseProps> => {
    try {
      setLoading(true);
      // await RNTwitterSignIn.logOut();
      await auth().signOut();
      return { success: true };
    } catch (error: any) {
      Logger.error('useXAuth signOutFromX:', { error: error.message });
      throw { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    signInWithX,
    // getCurrentUser,
    signOutFromX,
    loading,
  };
};
