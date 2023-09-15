import { api } from '@hooks/api';

export type Language = {
  id: number;
  WarningScreen: any;
};

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchLanguage: build.query<Language, string>({
      query: id => `/languages/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useLazyFetchLanguageQuery } = userApi;
