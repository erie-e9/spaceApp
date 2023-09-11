import themes from '@theme/themes';

export type Language = 'en' | 'es' | 'fr';

type DarkProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]: K extends `${infer Prefix}_dark` ? K : never;
}[keyof T];

type PropsWithoutDark<T> = Omit<T, DarkProps<T>>;

export type AppPreferencesState = {
  theme: 'default' | keyof PropsWithoutDark<typeof themes>;
  darkMode: boolean | null;
  language: Language;
};

export type AppPreferencesPayload = {
  payload: Partial<AppPreferencesState>;
};
