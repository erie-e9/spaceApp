import React, { memo } from 'react';
import { useTheme } from 'styled-components/native';
import { Calendar as Calendars, LocaleConfig } from 'react-native-calendars';
import { AnyObject } from 'yup';
import { getPropertyValues } from '@utils/functions';
import { useAppPreferences } from '@hooks';
import { formatDate } from '@utils/formatters';
import { CalendarContainer } from '../styles';

interface CalendarProps {
  testID?: string;
  value?: string;
  minimunDate?: string;
  error?: string;
  touched?: boolean;
  editable?: boolean;
  onSelect: (date: string) => void;
  current: string;
  selected: string;
  markedDates?: AnyObject;
  firstDay?: number;
  today?: string;
  monthNames: Array<
    string | number | null | { [key: string]: string | number; value: string | number }
  >;
  monthNamesShort?: Array<
    string | number | null | { [key: string]: string | number; value: string | number }
  >;
  dayNames?: Array<
    string | number | null | { [key: string]: string | number; value: string | number }
  >;
  dayNamesShort?: Array<
    string | number | null | { [key: string]: string | number; value: string | number }
  >;
  maxDate?: string;
  onInvalidDate?: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  testID,
  value,
  current,
  selected,
  onSelect,
  markedDates,
  firstDay,
  today,
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
  maxDate,
  onInvalidDate,
}) => {
  const theme = useTheme();
  const { language } = useAppPreferences();

  LocaleConfig.locales[language || 'en'] = {
    monthNames: getPropertyValues(monthNames as object[], 'label' as never),
    monthNamesShort: getPropertyValues(monthNamesShort as object[], 'label' as never),
    dayNames: getPropertyValues(dayNames as object[], 'label' as never),
    dayNamesShort: getPropertyValues(dayNamesShort as object[], 'label' as never),
    today,
  };

  LocaleConfig.defaultLocale = language || 'en';

  return (
    <CalendarContainer>
      <Calendars
        testID={`${testID}Calendar`}
        current={formatDate(value || current, 'YYYY-MM-DD')}
        selected={formatDate(value || selected, 'YYYY-MM-DD')}
        maxDate={maxDate}
        onDayPress={(date: any) => onSelect(date)}
        markedDates={markedDates}
        firstDay={firstDay}
        enableSwipeMonths
        // showWeekNumbers
        hideExtraDays
        disabledDaysIndexes={[0, 6]}
        theme={{
          backgroundColor: theme.tokens.colors.tertiary50, // no works
          calendarBackground: theme.tokens.colors.tertiary50,
          textSectionTitleColor: theme.tokens.colors.tertiary700, // color's day of week
          textSectionTitleDisabledColor: theme.tokens.colors.tertiary400, // blocked color's day of week
          selectedDayBackgroundColor: theme.tokens.colors.primary500, // no works
          selectedDayTextColor: 'red', // no works
          todayTextColor: 'blue', // no works
          dayTextColor: theme.tokens.colors.primary600,
          textDisabledColor: theme.tokens.colors.tertiary400,
          monthTextColor: theme.tokens.colors.secondary950, // header color
          indicatorColor: 'green', // no works
          arrowColor: theme.tokens.colors.primary600,
          stylesheet: {
            calendar: {
              header: {
                marginTop: 30,
                marginHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'red',
              },
            },
          },
        }}
        headerStyle={{
          backgroundColor: theme.tokens.colors.tertiary100,
          paddingHorizontal: 0,
          borderRadius: 10,
        }}
        bo
      />
    </CalendarContainer>
  );
};

export default memo(Calendar);
