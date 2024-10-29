import { memo } from 'react';
import { DatePicker } from './datePicker/DatePicker';
import { utils } from './utils';

export const { getFormattedDate, getToday } = new utils({ isGregorian: true });
export { modeType } from './datePicker/DatePicker';
export default memo(DatePicker);
