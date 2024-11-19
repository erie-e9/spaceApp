import React, { forwardRef, Fragment, memo, useCallback, useMemo, useState } from 'react';
import { getDate } from '@utils/functions';
import { useToast, useModal } from '@hooks';
import { testProperties } from '@utils/functions';
import { dayjs, formatDate } from '@utils/formatters';
import { labels } from '@utils/forms/labels';
import { CloseButton, FieldInputMask } from '@components/molecules';
import useAutoFocus from '@components/molecules/TextInput/hooks/useAutoFocus';
import Calendar from './components/Calendar';
import DateDropdown from './components/DateDropdown';
import { StyledButton, StyledElementContainer, StyledText, Container } from './styles';

interface DatePickerProps {
  testID?: string;
  label: string;
  title: string;
  description: string;
  mode: 'calendar' | 'dropdown';
  value?: string;
  maxDate?: string;
  minDate?: string;
  required?: boolean;
  placeholder?: string;
  minimunDate?: string;
  error?: string;
  touched?: boolean;
  editable?: boolean;
  maintainFocus?: boolean;
  onSelect: (date: string) => void;
  rightIconHandler?: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = forwardRef(
  (
    {
      testID,
      label,
      value,
      maxDate,
      minDate,
      title,
      description,
      mode,
      required,
      placeholder = 'Select a date',
      error,
      touched,
      editable = true,
      minimunDate,
      maintainFocus,
      onSelect,
      rightIconHandler
    },
    ref,
  ) => {
      const [date, setDate] = useState<string | null>(null);
    const { showModal, hideModal } = useModal();
    const { focused } = useAutoFocus(
      () => null,
      () => null,
    );
    const { monthNames, today, monthNamesShort, dayNames, dayNamesShort } = labels();

    const today18Ago = useMemo(() => {
      const [year, month, day] = getDate(null, 'YYYY/MM/DD').split('/').map(Number);
      const year18Ago = `${year - 18}-${String(month).padStart(2, '0')}-${String(day).padStart(
        2,
        '0',
      )}`;
      return year18Ago;
    }, [focused]);

    const onSelectHandler = useCallback((date: any) => {
      const value = formatDate(mode === 'calendar' ? date.dateString : date, 'DD/MM/YYYY');
      onSelect(value);
      setDate(value);
      hideModal();
    }, []);

    const invalidDateHandler = useCallback(() => {
      useToast.error({
        message: `signup:SignUp.form.fields.dateOfBirth.validations.matches`,
        duration: 3000,
      });
    }, []);

    const maxDateValue = useMemo(() => {
      return '2024-11-30'
    }, []);

    const minDateValue = useMemo(() => {
      return dayjs(new Date).format('YYYY-MM-DD')
    }, []);


    const toggleDatePicker = useCallback(() => {
      showModal({
        type: mode === 'calendar' ? 'alert' : 'bottomsheet',
        title,
        description,
        body: (
          <Fragment>
            {mode === 'calendar' ? (
              <Calendar
                current={minDate || minDateValue}
                selected={minDate || minDateValue}
                maxDate={maxDate}
                minDate={minDate || minDateValue}
                onSelect={onSelectHandler}
                today={today}
                monthNames={monthNames}
                monthNamesShort={monthNamesShort}
                dayNames={dayNames}
                dayNamesShort={dayNamesShort}
                onInvalidDate={invalidDateHandler}
              />
            ) : (
              <DateDropdown
                selected={value}
                monthNames={monthNames}
                maxDate={'2026-11-30'}
                onSelect={onSelectHandler}
                onInvalidDate={invalidDateHandler}
              />
            )}
          </Fragment>
        ),
        expandable: !true,
        dropdownOptions: {
          height: mode === 'calendar' ? 350 : 450,
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
    }, [value]);

    return (
      <FieldInputMask
        {...testProperties(testID || 'DatePickerID')}
        value={date || value}
        required={required}
        label={label}
        maintainFocus={maintainFocus || !!value}
        error={error}
        touched={touched}
        editable={editable}
        focused={focused || !!value}
      >
        <Container>
          <StyledElementContainer error={value !== '' && !!error} hasValue={!!value}>
            <StyledButton ref={ref} onPress={toggleDatePicker}>
                <StyledText type="Caption" error={value !== '' && !!error} hasValue={!!value}>
                  {value || placeholder}
                  {required && !value ? '*' : ''}
                </StyledText>
            </StyledButton>
          </StyledElementContainer>
          {rightIconHandler && value &&  (
              <CloseButton onPress={rightIconHandler} />
            )
          }
        </Container>
      </FieldInputMask>
    );
  },
);

export default memo(DatePicker);
