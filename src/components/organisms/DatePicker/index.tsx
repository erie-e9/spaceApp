import React, { forwardRef, Fragment, memo, useCallback, useMemo, useState } from 'react';
import { useToast, useModal } from '@hooks';
import { testProperties } from '@utils/functions';
import { dayjs, formatDate } from '@utils/formatters';
import { labels } from '@utils/forms/labels';
import { FieldInputMask } from '@components/molecules';
import useAutoFocus from '@components/molecules/TextInput/hooks/useAutoFocus';
import Calendar from './components/Calendar';
import DateDropdown from './components/DateDropdown';
import { StyledButton, StyledElementContainer, StyledText } from './styles';

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
      maintainFocus,
      onSelect,
      rightIconHandler,
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

    const onSelectHandler = useCallback(
      (dateParam: any) => {
        const Datevalue = formatDate(
          mode === 'calendar' ? dateParam.dateString : dateParam,
          'DD/MM/YYYY',
        );
        onSelect(Datevalue);
        setDate(Datevalue);
        hideModal();
      },
      [hideModal, mode, onSelect],
    );

    const invalidDateHandler = useCallback(() => {
      useToast.error({
        message: 'signup:SignUp.form.fields.dateOfBirth.validations.matches',
        duration: 3000,
      });
    }, []);

    const minDateValue = useMemo(() => {
      return dayjs(new Date()).format('YYYY-MM-DD');
    }, []);

    const toggleDatePicker = useCallback(() => {
      showModal({
        type: mode === 'calendar' ? 'alert' : 'bottomsheet',
        title,
        description,
        scrollBodyEnabled: false,
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
        expandable: false,
        dropdownOptions: {
          height: mode === 'calendar' ? 350 : 450,
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
        rightIcon="close"
        rightIconHandler={value ? rightIconHandler : undefined}
      >
        <StyledButton onPress={toggleDatePicker}>
          <StyledElementContainer error={value !== '' && !!error} hasValue={!!value}>
            <StyledText type="Caption" error={value !== '' && !!error} hasValue={!!value}>
              {value || placeholder}
              {required && !value ? '*' : ''}
            </StyledText>
          </StyledElementContainer>
        </StyledButton>
      </FieldInputMask>
    );
  },
);

DatePicker.displayName = 'DatePicker';
export default memo(DatePicker);
