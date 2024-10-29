// Type definitions for react-native-modern-datepicker 1.0
// Project: https://github.com/HosseinShabani/react-native-modern-datepicker#readme
// Definitions by: Ankan002 <https://github.com/Ankan002>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { FunctionComponent } from 'react';
import { ImageStyle, StyleProp, TextInput, TextStyle, ViewStyle } from 'react-native';

export type modeType = 'datepicker' | 'calendar' | 'monthYear' | 'time' | 'calendar-range';

export interface ModernDateTimePickerConfig {
  dayNames?: Array<string>;
  dayNamesShort?: Array<string>;
  monthNames?: Array<string>;
  selectedFormat?: string;
  dateFormat?: string;
  monthYearFormat?: string;
  timeFormat?: string;
  hour?: string;
  minute?: string;
  timeSelect?: string;
  timeClose?: string;
  textSeparatorMonthYear?: string;
  daysFromToday?: string;
}

export interface ModernDateTimePickerOptions {
  backgroundColor?: string;
  textHeaderColor?: string;
  textDefaultColor?: string;
  selectedTextColor?: string;
  mainColor?: string;
  textSecondaryColor?: string;
  borderColor?: string;
  headerBorderWidth?: number;
  defaultFont?: string;
  headerFont?: string;
  textFontSize?: number;
  textHeaderFontSize?: number;
  headerAnimationDistance?: number;
  daysAnimationDistance?: number;
  textHeaderStyle?: StyleProp<TextStyle>;
  textDayNamesStyle?: StyleProp<TextStyle>;
  textDaySelectedStyle?: StyleProp<TextStyle>;
  textTodayStyle?: StyleProp<TextStyle>;
  textMonthStyle?: StyleProp<TextStyle>;
  textActionTimeStyle?: StyleProp<TextStyle>;
  viewDaysNameStyle?: StyleProp<ViewStyle>;
  viewDaysContainerStyle?: StyleProp<ViewStyle>;
  viewDayItemStyle?: StyleProp<ViewStyle>;
  viewDayItemSelectedStyle?: StyleProp<ViewStyle>;
  viewHeaderItemStyle?: StyleProp<ViewStyle>;
  viewHeaderContainerStyle?: StyleProp<ViewStyle>;
  viewButtonActionSelectTimeStyle?: StyleProp<ViewStyle>;
  viewButtonActionCancelTimeStyle?: StyleProp<ViewStyle>;
  viewButtonsActionTimeStyle?: StyleProp<ViewStyle>;
  viewMonthItemSelectedStyle?: StyleProp<ViewStyle>;
  viewMonthItemStyle?: StyleProp<ViewStyle>;
  imageArrow?: StyleProp<ImageStyle>;
  inputYearStyle?: StyleProp<TextInput>;
  viewDayTodayItemStyle?: StyleProp<ViewStyle>;
  viewDayBlockedItemStyle?: StyleProp<ViewStyle>;
  textDayDisabledStyle?: StyleProp<TextStyle>;
  viewMarkedDotStyle?: StyleProp<ViewStyle>;
  viewDayInRangeItemStyle?: StyleProp<ViewStyle>;
  viewFirstItemInRangeStyle?: StyleProp<ViewStyle>;
  viewLastItemInRangeStyle?: StyleProp<ViewStyle>;
}

export interface ModernDateTimePickerProps {
  isGregorian?: boolean;
  minimumDate?: string;
  maximumDate?: string;
  selectorStartingYear?: number;
  selectorEndingYear?: number;
  disableDateChange?: boolean;
  mode?: modeType;
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | 60;
  style?: StyleProp<ViewStyle>;
  current?: string;
  selected?: string;
  locale?: string;
  configs?: ModernDateTimePickerConfig;
  options?: ModernDateTimePickerOptions;
  markedDates?: Array<string>;
  maxRange?: number;
  minRange?: number;
  blockedDates?: Array<string>;
  blockedWeekDays?: number[];
  startDayOfWeek?: number;
  showDaysFromToday?: boolean;
  animationDuration?: number;
  blockedMonths?: Array<string>;
  markedMonths?: Array<string>;
  onlyCurrentMonth?: boolean;
  allowedHourRange?: { startHour: number; endHour: number };
  allowedMinuteRange?: { startMinute: number; endMinute: number };
  showOnlyHours?: boolean;
  showOnlyMinutes?: boolean;
  blockedHours?: number[];
  blockedMinutes?: number[];
  format24Hrs?: boolean;
  onSelectedChange?: (date: string) => void;
  onRangeChange?: (range: { start: string | null; end: string | null }) => void;
  onMonthYearChange?: (date: string) => void;
  onTimeChange?: (date: string) => void;
  onDateChange?: (date: string) => void;
  onMinRangeFails?: (message: string) => void;
  onMaxRangeFails?: (message: string) => void;
  onBlockedPress?: (date: string) => void;
}

declare const CoolDatePicker: FunctionComponent;
export default function (props: ModernDateTimePickerProps): JSX.Element;
export declare function getFormattedDate(date?: Date, format?: string): string;
export declare function getToday(): string;
