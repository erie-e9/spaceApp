import Logger from '@services/Logger';
import { getAppCheckToken as getToken } from '@services';
import { useDispatch } from 'react-redux';

export interface AppCheckToken {
  token: string;
  expireAt: Date;
}

const EXPIRATION_TIME = 1;

export const useAppCheck = (): {
  getAppCheckToken(): Promise<string>;
} => {
  const getAppCheckToken = async (): Promise<string> => {
    try {
      const newToken = await getToken();
      return newToken;
    } catch (err: unknown) {
      Logger.error(err);
      throw err;
    }
  };

  return { getAppCheckToken };
};

export default useAppCheck;
