import { api } from '@hooks/api';

export type User = {
  id: number;
  name: string;
};

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchUser: build.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useLazyFetchUserQuery } = userApi;
