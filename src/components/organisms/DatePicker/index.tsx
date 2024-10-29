import React, { forwardRef, Fragment, memo, useCallback, useMemo } from 'react';
import { getDate } from '@utils/functions';
import { useToast, useModal } from '@hooks';
import { testProperties } from '@utils/functions';
import { formatDate } from '@utils/formatters';
import { labels } from '@utils/forms/labels';
import { FieldInputMask } from '@components/molecules';
import useAutoFocus from '@components/molecules/TextInput/hooks/useAutoFocus';
import Calendar from './components/Calendar';
import DateDropdown from './components/DateDropdown';
import { StyledButton, StyledElementContainer, StyledText } from './styles';

interface DatePickerProps {
  testID?: string;
  label: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  minimunDate?: string;
  error: string;
  touched?: boolean;
  editable?: boolean;
  onSelect: (item: string) => void;
  maintainFocus?: boolean;
  mode?: 'calendar' | 'dropdown';
}

export const DatePicker: React.FC<DatePickerProps> = forwardRef(
  (
    {
      testID,
      label,
      value,
      required,
      placeholder = 'Select a date',
      error,
      touched,
      editable = true,
      minimunDate,
      onSelect,
      maintainFocus,
      mode,
    },
    ref,
  ) => {
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
      onSelect(formatDate(mode === 'calendar' ? date.dateString : date, 'DD/MM/YYYY'));
      hideModal();
    }, []);

    const invalidDateHandler = useCallback(() => {
      useToast.error({
        message: `signup:SignUp.form.fields.dateOfBirth.validations.matches`,
        duration: 3000,
      });
    }, []);

    const toggleDatePicker = useCallback(() => {
      showModal({
        type: mode === 'calendar' ? 'alert' : 'bottomsheet',
        title: 'signup:SignUp.form.fields.dateOfBirth.name',
        description: 'signup:SignUp.form.fields.dateOfBirth.placeholder',
        body: (
          <Fragment>
            {mode === 'calendar' ? (
              <Calendar
                current={today18Ago}
                selected={today18Ago}
                maxDate={today18Ago}
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
                maxDate={today18Ago}
                onSelect={onSelectHandler}
                onInvalidDate={invalidDateHandler}
              />
            )}
          </Fragment>
        ),
        expandible: !true,
        dropdownOptions: {
          height: mode === 'calendar' ? 350 : 450,
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
    }, [value]);

    return (
      <FieldInputMask
        {...testProperties(testID)}
        value={value}
        required={required}
        label={label}
        maintainFocus={maintainFocus || !!value}
        error={error}
        touched={touched}
        editable={editable}
        focused={focused || !!value}
      >
        <StyledButton ref={ref} onPress={toggleDatePicker}>
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

export default memo(DatePicker);
