import { Logger } from '@services';
import { getAppCheckToken as getToken } from '@services';

export interface AppCheckToken {
  token: string;
  expireAt: Date;
}

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
