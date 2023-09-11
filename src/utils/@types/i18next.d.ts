import * as resources from '@services/translations/resources';
import { defaultNS } from '@services/translations';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
