import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as RNLocalize from 'react-native-localize';
import { Logger } from '@services';
import { Language } from '@slices/types';

const localesMap: Record<string, () => void> = {
    de: () => require('dayjs/locale/de'),
    en: () => require('dayjs/locale/en'),
    es: () => require('dayjs/locale/es'),
    fr: () => require('dayjs/locale/fr'),
    pt: () => require('dayjs/locale/pt'),
};

export function loadLocale(language?: Language): void {
    try {

        const { languageCode } = RNLocalize.getLocales()[0];
        const locale = language || languageCode;
        if (localesMap[locale]) {
            localesMap[locale]();
            dayjs.locale(locale);
            Logger.log(`Locale "${locale}" loaded successfully.`);
        } else {
            Logger.warn(`Locale "${locale}" not supported. Falling back to default locale.`);
            dayjs.locale('en');
        }
    } catch (error) {
        Logger.error('Error loading locale:', error);
        dayjs.locale('en');
    }
}

loadLocale();

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(customFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isLeapYear);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault('America/Mexico_City');

export default dayjs;
export { dayjs };