import React, { memo, useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useModal } from '@hooks';
import { Logger, useCopy } from '@services';
import { useTheme } from 'styled-components/native';
import { formatDate } from '@utils/formatters';
import { FieldInputMask } from '@components/molecules';
import { useToast } from '@hooks';
import { CoolDatePicker, getToday, modeCalendarType } from '@components/molecules';
import useAutoFocus from '@components/molecules/TextInput/hooks/useAutoFocus';
import { StyledButton, StyledElementContainer, StyledText } from './styles';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

interface DatePickerProps {
  testID?: string;
  label: string;
  items: Array<string>;
  value?: string;
  minimunDate?: string;
  error: string;
  touched?: boolean;
  editable?: boolean;
  onSelect: (item: string) => void;
  placeholder?: string;
  width?: number;
  height?: number;
  textColor?: string;
  dropdownHeight?: number;
  maintainFocus?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  testID,
  label,
  value,
  error,
  touched,
  editable = true,
  minimunDate,
  onSelect,
  placeholder = 'Select a date',
  maintainFocus,
}) => {
  const theme = useTheme();
  const { focused, onFocus } = useAutoFocus(
    () => null,
    () => null,
  );
  const { showModal, hideModal } = useModal();
  const { getCopyValue } = useCopy();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const today18Ago = useMemo(() => {
    const [year, month, day] = getToday().split('/').map(Number);

    const year18Ago = `${year - 18}-${String(month).padStart(2, '0')}-${String(day).padStart(
      2,
      '0',
    )}`;

    return year18Ago;
  }, []);

  const weekDays = useMemo(() => {
    return [
      getCopyValue('common:calendar.values.weekDays.su'),
      getCopyValue('common:calendar.values.weekDays.mo'),
      getCopyValue('common:calendar.values.weekDays.tu'),
      getCopyValue('common:calendar.values.weekDays.we'),
      getCopyValue('common:calendar.values.weekDays.th'),
      getCopyValue('common:calendar.values.weekDays.fr'),
      getCopyValue('common:calendar.values.weekDays.sa'),
    ];
  }, []);

  const months = useMemo(() => {
    return [
      getCopyValue('common:calendar.values.months.january'),
      getCopyValue('common:calendar.values.months.february'),
      getCopyValue('common:calendar.values.months.march'),
      getCopyValue('common:calendar.values.months.april'),
      getCopyValue('common:calendar.values.months.may'),
      getCopyValue('common:calendar.values.months.june'),
      getCopyValue('common:calendar.values.months.july'),
      getCopyValue('common:calendar.values.months.august'),
      getCopyValue('common:calendar.values.months.september'),
      getCopyValue('common:calendar.values.months.october'),
      getCopyValue('common:calendar.values.months.november'),
      getCopyValue('common:calendar.values.months.december'),
    ];
  }, []);

  const onSelectHandler = useCallback((date: any, mode: modeCalendarType) => {
    onSelect(
      mode === 'calendar'
        ? formatDate(date.dateString, 'DD/MM/YYYY')
        : date.dateString.split('|')[0],
    );
    mode !== 'calendar-range' && hideModal();
  }, []);

  const onBlockedPressHandler = useCallback((date: string) => {
    useToast.info({
      message: getCopyValue(`signup:SignUp.form.fields.dateOfBirth.messages.blockedDate`, {
        blockedDate: 'It',
        blockedReason: "it's a non-work day",
      }),
      duration: 3000,
    });
  }, []);

  const toggleDatePicker = useCallback(() => {
    setIsOpen((prev) => !prev);
    showModal({
      type: 'alert',
      title: 'signup:SignUp.form.fields.dateOfBirth.placeholder',
      body: (
        <Calendar
          style={{
            borderWidth: 0,
            height: 350,
            padding: 20,
          }}
          current={formatDate(value || today18Ago, 'YYYY-MM-DD')}
          selected={formatDate(value || today18Ago, 'YYYY-MM-DD')}
          // current={'2012-003-01'}
          // selected={'2012-3-01'}
          // maxDate={today18Ago}
          onDayPress={(date: any) => {
            onSelectHandler(date, 'calendar');
          }}
          markedDates={{
            '2006-07-06': {
              selected: true,
              marked: false,
              selectedColor: '#00ffea',
            },
            '2006-07-02': { marked: true },
            '2006-07-03': {
              selected: true,
              marked: true,
              selectedColor: '#00ff9d',
            },
          }}
          firstDay={0}
          // showWeekNumbers
          hideExtraDays
          theme={{
            backgroundColor: theme.tokens.colors.tertiary50,
            calendarBackground: theme.tokens.colors.tertiary50,
            textSectionTitleColor: theme.tokens.colors.secondary200,
            selectedDayBackgroundColor: theme.tokens.colors.primary500,
            selectedDayTextColor: theme.tokens.colors.secondary950,
            todayTextColor: theme.tokens.colors.secondary950,
            dayTextColor: theme.tokens.colors.secondary950,
            textDisabledColor: theme.tokens.colors.secondary100,
          }}
          headerStyle={{
            backgroundColor: theme.tokens.colors.secondary800,
          }}
        />
      ),
    });
  }, [isOpen, value]);

  return (
    <FieldInputMask
      {...testProperties(testID)}
      value={value}
      label={label}
      maintainFocus={maintainFocus || !!value}
      error={error}
      touched={touched}
      editable={editable}
      focused={focused || !!value}
    >
      <StyledButton onPress={toggleDatePicker}>
        <StyledElementContainer error={!!error} hasValue={!!value}>
          <StyledText type="Caption" hasValue={!!value}>
            {getCopyValue(value || placeholder)}
          </StyledText>
        </StyledElementContainer>
      </StyledButton>
    </FieldInputMask>
  );
};

export default memo(DatePicker);
