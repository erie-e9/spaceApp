import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logger, validateTokenStructure } from '@services';
import type { User, TokenState } from '@slices/types';
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
  storeToken: (token: string) => void;
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

  const storeToken = useCallback(
    async (tokenParam: string): Promise<void> => {
      try {
        const {} = await validateTokenStructure(tokenParam);
        // if (validToken) {
        dispatch(storeTokenSlice({ content: tokenParam }));
        // }
      } catch (error) {
        Logger.error('[useAuthenticationHook] storeToken:', { error });
        throw error;
      }
    },
    [dispatch],
  );

  const removeToken = useCallback((): void => {
    try {
      dispatch(removeTokenSlice());
    } catch (error) {
      Logger.error('[useAuthenticationHook] removeToken:', { error });
    }
  }, [dispatch]);

  const storeRefreshToken = useCallback(
    (tokenParam: string): void => {
      try {
        dispatch(storeRefreshTokenSlice({ content: tokenParam }));
      } catch (error) {
        Logger.error('[useAuthenticationHook] storeRefreshToken:', { error });
      }
    },
    [dispatch],
  );

  const removeRefreshToken = useCallback((): void => {
    try {
      dispatch(removeRefreshTokenSlice());
    } catch (error) {
      Logger.error('[useAuthenticationHook] removeRefreshToken:', { error });
    }
  }, [dispatch]);

  const storeUser = useCallback(
    (userParam: User): void => {
      try {
        dispatch(storeUserSlice(userParam));
      } catch (error) {
        Logger.error('[useAuthenticationHook] storeUser:', { error });
        throw error;
      }
    },
    [dispatch],
  );

  const updateUser = useCallback(
    (userParam: Partial<User>): void => {
      try {
        dispatch(updateUserSlice(userParam));
      } catch (error) {
        Logger.error('[useAuthenticationHook] storeUser:', { error });
        throw error;
      }
    },
    [dispatch],
  );

  const removeUser = useCallback((): void => {
    try {
      dispatch(removeUserSlice());
    } catch (error) {
      Logger.error('[useAuthenticationHook] removeUser:', { error });
    }
  }, [dispatch]);

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
