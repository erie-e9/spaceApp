import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es-mx';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(customFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es-mx');
dayjs.tz.setDefault('America/Mexico_City');
// dayjs.tz.setDefault("America/Toronto");

export default dayjs;
export { dayjs };