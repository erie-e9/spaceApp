import themes from '@theme/themes';

export type Language = 'de' | 'en' | 'es' | 'fr' | 'pt' | null;
// export type Mode = boolean | 'sunflower' | null;
export type Mode = 'dark' | 'light' | 'sunflower' | null;
export type Themes = 'theme0' | 'theme1' | 'theme2' | 'theme3'; // | 'theme4'
export type Theme = 'default' | (keyof PropsWithoutDark<typeof themes> & Themes);
type DarkProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]: K extends `${infer Prefix}_dark` ? K : never;
}[keyof T];

type PropsWithoutDark<T> = Omit<T, DarkProps<T>>;

export type AppPreferencesState = {
  theme: Theme;
  mode: Mode;
  language: Language;
  biometrics: boolean;
};

export type AppPreferencesPayload = {
  payload: Partial<AppPreferencesState>;
};
