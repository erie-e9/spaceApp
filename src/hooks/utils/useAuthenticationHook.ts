import { useDispatch, useSelector } from 'react-redux';
import { Logger, validateTokenStructure } from '@services';
import { type User, type TokenState } from '@slices/types';
import {
  storeToken as storeTokenSlice,
  removeToken as removeTokenSlice,
  storeRefreshToken as storeRefreshTokenSlice,
  removeRefreshToken as removeRefreshTokenSlice,
  storeUser as storeUserSlice,
  updateUser as updateUserSlice,
  removeUser as removeUserSlice,
} from '@slices/auth';

export const useAuthenticationHook = (): {
  token: string;
  storeToken: (token: string) => Promise<void>;
  removeToken: () => void;
  storeRefreshToken: (token: string) => void;
  removeRefreshToken: () => void;
  user: User;
  storeUser: (user: User) => void;
  updateUser: (user: User) => void;
  removeUser: () => void;
} => {
  const dispatch = useDispatch();
  const token = useSelector((state: { token: TokenState }) => state.token.content);

  const user = useSelector((state: { user: User }) => state.user);

  const storeToken = async (token: string): Promise<void> => {
    try {
      // const { validToken } = await validateTokenStructure(token);
      // if (validToken) {
      dispatch(storeTokenSlice({ content: token }));
      // }
    } catch (error) {
      Logger.error('[useAuthenticationHook] storeToken:', { error });
      throw error;
    }
  };

  const removeToken = (): void => {
    try {
      dispatch(removeTokenSlice());
    } catch (error) {
      Logger.error('[useAuthenticationHook] removeToken:', { error });
    }
  };

  const storeRefreshToken = (token: string): void => {
    try {
      dispatch(storeRefreshTokenSlice({ content: token }));
    } catch (error) {
      Logger.error('[useAuthenticationHook] storeRefreshToken:', { error });
    }
  };

  const removeRefreshToken = (): void => {
    try {
      dispatch(removeRefreshTokenSlice());
    } catch (error) {
      Logger.error('[useAuthenticationHook] removeRefreshToken:', { error });
    }
  };

  const storeUser = (user: User): void => {
    try {
      dispatch(storeUserSlice(user));
    } catch (error) {
      Logger.error('[useAuthenticationHook] storeUser:', { error });
      throw error;
    }
  };

  const updateUser = (user: Partial<User>): void => {
    try {
      dispatch(updateUserSlice(user));
    } catch (error) {
      Logger.error('[useAuthenticationHook] storeUser:', { error });
      throw error;
    }
  };

  const removeUser = (): void => {
    try {
      dispatch(removeUserSlice());
    } catch (error) {
      Logger.error('[useAuthenticationHook] removeUser:', { error });
    }
  };
  return {
    token,
    storeToken,
    removeToken,
    storeRefreshToken,
    removeRefreshToken,
    user,
    storeUser,
    updateUser,
    removeUser,
  };
};
