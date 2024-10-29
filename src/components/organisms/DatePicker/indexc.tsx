import React, { memo, useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useModal } from '@hooks';
import { Logger, useCopy } from '@services';
import { useTheme } from 'styled-components/native';
import { formatDate } from '@utils/formatters';
import { useToast } from '@hooks';
import { CoolDatePicker, getToday, modeCalendarType, FieldInputMask } from '@components/molecules';
import useAutoFocus from '@components/molecules/TextInput/hooks/useAutoFocus';
import { StyledButton, StyledElementContainer, StyledText } from './styles';
import { ModernDateTimePickerOptions } from '../../molecules/CoolDatePicker';

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

    const year18Ago = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;

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

  const onSelectHandler = useCallback((date: string, mode: modeCalendarType) => {
    onSelect(mode === 'calendar' ? formatDate(date, 'DD/MM/YYYY') : date.split('|')[0]);
    // mode !== 'calendar-range' && hideModal();
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
        <CoolDatePicker
          isGregorian={true}
          mode="calendar-range"
          current={formatDate(value || today18Ago, 'YYYY/MM/DD')}
          selected={formatDate(value || today18Ago, 'YYYY/MM/DD')}
          // maximumDate={today18Ago}
          onlyCurrentMonth={!true}
          markedMonths={['2006/01', '2024/02', '2024/03', '2024/04']}
          blockedWeekDays={[0, 6]} // Sunday = 0, Saturday = 6
          blockedMonths={['2024/05', '2024/03', '2024/10', '2022/08']}
          startDayOfWeek={0} // Sunday = 0, Saturday = 6
          showDaysFromToday={true}
          animationDuration={350}
          markedDates={[
            '2006/06/04',
            '2006/06/05',
            '2006/06/09',
            '2024/06/04',
            '2024/06/05',
            '2024/06/09',
          ]}
          blockedDates={[
            '2006/06/26',
            '2006/06/12',
            '2006/05/15',
            '2006/05/11',
            '2024/05/15',
            '2024/05/11',
            '2024/06/06',
            '2024/06/12',
            '2024/06/21',
          ]}
          onDateChange={(date: string) => onSelectHandler(date, 'calendar')}
          onRangeChange={(range) => console.log(`${range.start} | ${range.end}`, 'calendar-range')}
          minRange={3}
          onMinRangeFails={(message: string) => Alert.alert(message)}
          maxRange={4}
          onMaxRangeFails={(message: string) => Alert.alert(message)}
          onBlockedPress={(date: string) => onBlockedPressHandler(date)}
          allowedHourRange={{ startHour: 8, endHour: 14 }}
          allowedMinuteRange={{ startMinute: 0, endMinute: 45 }}
          showOnlyHours={true}
          showOnlyMinutes={true}
          blockedHours={[10]}
          blockedMinutes={[20]}
          format24Hrs={!true}
          options={{
            backgroundColor: theme.tokens.colors.tertiary50,
            textHeaderColor: theme.tokens.colors.secondary950,
            textDefaultColor: theme.tokens.colors.secondary950,
            selectedTextColor: theme.tokens.colors.tertiary50,
            mainColor: theme.tokens.colors.primary500,
            textSecondaryColor: theme.tokens.colors.secondary200,
            borderColor: theme.tokens.colors.primary400,
            headerBorderWidth: 1,
            viewHeaderItemStyle: {
              borderRadius: 10,
            },
            daysAnimationDistance: 10,
            viewDayItemStyle: {
              borderRadius: 0,
              margin: 0,
              marginVertical: 1.5,
            },
            viewDayBlockedItemStyle: {
              backgroundColor: theme.tokens.colors.secondary800,
            },
            textDayDisabledStyle: {
              color: theme.tokens.colors.secondary900,
            },
            viewMarkedDotStyle: {
              backgroundColor: theme.tokens.colors.primary500,
              borderRadius: 0,
            },
            viewMonthItemSelectedStyle: {
              backgroundColor: theme.tokens.colors.primary500,
              borderRadius: 5,
            },
            viewDayItemSelectedStyle: {
              backgroundColor: theme.tokens.colors.primary500,
              borderRadius: 0,
            },
            viewDayTodayItemStyle: {
              borderColor: theme.tokens.colors.tertiary950,
              borderRadius: 6,
              // backgroundColor: theme.tokens.colors.tertiary950,
            },
            textTodayStyle: {
              color: theme.tokens.colors.secondary950,
              fontWeight: 'bold',
            },
            imageArrow: {
              tintColor: theme.tokens.colors.secondary950,
            },
            viewDayInRangeItemStyle: {
              borderRadius: 0,
            },
            viewFirstItemInRangeStyle: {
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              // borderTopRightRadius: 30,
              // borderBottomRightRadius: 30,
            },
            viewLastItemInRangeStyle: {
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              // borderTopLeftRadius: 30,
              // borderBottomLeftRadius: 30,
            },
          }}
          configs={{
            dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            monthNames: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ],
            hour: 'Hora',
            minute: 'Minuto',
            timeSelect: 'Seleccionar',
            timeClose: 'Cerrar',
            textSeparatorMonthYear: '|',
            daysFromToday: 'días a partir de hoy',
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
