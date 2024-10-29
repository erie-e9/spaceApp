import React, { useState, useEffect, useRef, memo, useMemo, forwardRef } from 'react';
import { TextInput, KeyboardAvoidingView } from 'react-native';
import moment from 'moment';
import { Dropdown } from '@components/molecules';
import { screen_width, compareDates, testProperties } from '@utils/functions';
import {
  DateDropdownContainer,
  DropdownsContainer,
  ButtonContainer,
  StyledDropdownButton,
} from '../styles';

const defaultMonths = moment
  .months()
  .map((month) => ({ value: month.toLowerCase(), label: month }));
const currentYear = moment().year();
const currentMonth = moment().month() + 1;
const currentDay = moment().date();

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getDaysInMonth = (month: string, year: number) => {
  const monthIndex: number = moment().month(month).format('M') - 1;
  if (monthIndex === 1) {
    return isLeapYear(year) ? 29 : 28;
  }
  return moment(`${year}-${monthIndex + 1}`, 'YYYY-MM').daysInMonth();
};

interface DateDropdownProps {
  testID?: string;
  selected?: string;
  monthNames: Array<
    string | number | null | { [key: string]: string | number; value: string | number }
  >;
  onSelect: (date: string) => void;
  outputFormat?: string;
  maxDate?: string;
  onInvalidDate?: () => void;
}

const DateDropdown: React.FC<DateDropdownProps> = forwardRef(
  (
    {
      testID,
      monthNames = defaultMonths,
      outputFormat = 'DD/MM/YYYY',
      onSelect,
      selected,
      maxDate,
      onInvalidDate,
    },
    ref,
  ) => {
    const dropdownHeight = 180;
    const dropdownWidth = screen_width / 3.3;
    const [openDropdown, setOpenDropdown] = useState<object>({
      day: false,
      month: false,
      year: false,
    });

    const maxDateValues = useMemo(() => {
      if (maxDate) {
        const [maxYear, maxMonth, maxDay] = maxDate.split('-').map(Number);
        return { day: maxDay, month: maxMonth, year: maxYear };
      }
      return null;
    }, [maxDate]);

    const selectedDate = useMemo(() => {
      if (selected) {
        const [day, month, year] = selected.split('/').map(Number);
        return {
          day,
          month,
          year,
        };
      }

      if (maxDateValues) {
        return maxDateValues;
      }

      return { day: currentDay, month: currentMonth, year: currentYear };
    }, [selected, maxDateValues]);

    const [selectedDay, setSelectedDay] = useState<number>(selectedDate.day);
    const [isError, setIsError] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(monthNames[selectedDate.month - 1].value);
    const [selectedYear, setSelectedYear] = useState<number>(selectedDate.year);

    const dayInputRef = useRef<TextInput>(null);
    const monthInputRef = useRef<TextInput>(null);
    const yearInputRef = useRef<TextInput>(null);

    const updateDays = (month: string, year: number) => {
      const daysInMonth = getDaysInMonth(month, year);
      if (selectedDay > daysInMonth) {
        setSelectedDay(daysInMonth);
      }
    };

    const adjustDayMonth = (year: number, month: string, day: number) => {
      if (maxDateValues && year === maxDateValues.year) {
        const monthIndex = monthNames.findIndex((m) => m.value === month) + 1;
        if (monthIndex > maxDateValues.month) {
          month = monthNames[maxDateValues.month - 1].value;
        }
        if (monthIndex === maxDateValues.month && day > maxDateValues.day) {
          day = maxDateValues.day;
        }
      }
      return { adjustedDay: day, adjustedMonth: month };
    };

    useEffect(() => {
      updateDays(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const days = useMemo(() => {
      return Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => ({
        value: i + 1,
        label: (i + 1).toString(),
      })).filter((day) => {
        if (
          maxDateValues &&
          selectedYear === maxDateValues.year &&
          selectedMonth ===
            monthNames.find(
              (month) =>
                month.value === String(defaultMonths[maxDateValues.month - 1]).toLowerCase(),
            )?.value
        ) {
          return day.value <= maxDateValues.day;
        }
        return true;
      });
    }, [selectedMonth, selectedYear]);

    const handleSelectDay = (day: number) => {
      setSelectedDay(day);
      setOpenDropdown({ day: false, month: true, year: false });
    };

    const handleSelectMonth = (month: string) => {
      setSelectedMonth(month);
      updateDays(month, selectedYear);
      setOpenDropdown({ day: false, month: false, year: true });
    };

    const handleSelectYear = (year: number) => {
      if (year >= currentYear - 99 && year <= currentYear) {
        setSelectedYear(year);
        updateDays(selectedMonth, year);
      }
      setOpenDropdown({ day: false, month: false, year: false });
    };

    const isFormValid = selectedDay && selectedMonth && selectedYear;

    const defaultYears = useMemo(() => {
      return Array.from({ length: 100 }, (_, i) => {
        const year = currentYear - i;
        return {
          value: year,
          label: year.toString(),
        };
      }).filter((year) => (maxDateValues ? year.value <= maxDateValues.year : true));
    }, [maxDateValues]);

    const handleSubmit = () => {
      if (isFormValid) {
        const monthIndex = monthNames.findIndex((m) => m.value === selectedMonth) + 1;

        const formattedDate = moment(
          `${selectedYear}-${monthIndex}-${selectedDay}`,
          'YYYY-MM-DD',
        ).format(outputFormat);

        const formattedMaxDate = moment(maxDate, 'YYYY-MM-DD').format(outputFormat);
        if (maxDate) {
          const result = compareDates(formattedDate, formattedMaxDate);

          if (result === -1 || result === 0) {
            onSelect(formattedDate);
          } else {
            onInvalidDate && onInvalidDate();
            setIsError(' ');
          }
        }
      }
    };

    return (
      <DateDropdownContainer testID={`${testID}DateDropdown`}>
        <DropdownsContainer>
          <Dropdown
            ref={monthInputRef}
            type="textinput"
            data={days}
            onSelect={(item: number) => handleSelectDay(item)}
            value={selectedDay}
            label={`signup:SignUp.form.fields.dateOfBirth.labels.day`}
            isNumeric
            openDropdown={openDropdown.day}
            setOpenDropdown={(isOpen) =>
              setOpenDropdown({ day: isOpen, month: false, year: false })
            }
            width={dropdownWidth}
            dropdownHeight={dropdownHeight}
            error={isError}
          />
          <Dropdown
            ref={yearInputRef}
            type="button"
            data={monthNames.filter((_, i) => {
              if (maxDateValues && selectedYear === maxDateValues.year) {
                return i < maxDateValues.month;
              }
              return true;
            })}
            onSelect={handleSelectMonth}
            value={selectedMonth}
            label={`signup:SignUp.form.fields.dateOfBirth.labels.month`}
            openDropdown={openDropdown.month}
            setOpenDropdown={(isOpen) =>
              setOpenDropdown({ day: false, month: isOpen, year: false })
            }
            width={dropdownWidth}
            dropdownHeight={dropdownHeight}
            error={isError}
          />
          <Dropdown
            ref={dayInputRef}
            type="textinput"
            data={defaultYears}
            onSelect={handleSelectYear}
            value={selectedYear}
            label={`signup:SignUp.form.fields.dateOfBirth.labels.year`}
            isNumeric
            openDropdown={openDropdown.year}
            setOpenDropdown={(isOpen) =>
              setOpenDropdown({ day: false, month: false, year: isOpen })
            }
            width={dropdownWidth}
            dropdownHeight={dropdownHeight}
            error={isError}
          />
        </DropdownsContainer>
        <KeyboardAvoidingView behavior="padding">
          <ButtonContainer>
            <StyledDropdownButton
              {...testProperties(`${testID}DateDropdownSubmit`)}
              title={`signup:SignUp.form.fields.dateOfBirth.labels.submit`}
              onPress={handleSubmit}
            />
          </ButtonContainer>
        </KeyboardAvoidingView>
      </DateDropdownContainer>
    );
  },
);

export default memo(DateDropdown);
export { DateDropdown };
