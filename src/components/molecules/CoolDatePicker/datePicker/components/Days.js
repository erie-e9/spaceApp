import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { useCalendar } from '../DatePicker';

const MAX_RANGE_MESSAGE = (maxRange) => `Maximum range is ${maxRange} days.`;
const MIN_RANGE_MESSAGE = (minRange) => `Minimum range is ${minRange} days.`;
const normalizeDate = (date) => date.split(' ')[0];

const calculateEffectiveRange = (startDate, endDate, weekDaysBlocked, isDateBlocked) => {
  let diffDays = 0;
  let currentDate = new Date(String(startDate));
  while (currentDate.getTime() <= endDate.getTime()) {
    const dateValue = normalizeDate(currentDate.toISOString().split('T')[0]);
    if (!weekDaysBlocked(dateValue) && !isDateBlocked(dateValue.replace(/-/g, '/'))) {
      diffDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return diffDays;
};

const isValidRange = (
  startDate,
  endDate,
  minRange,
  maxRange,
  onMinRangeFails,
  onMaxRangeFails,
  weekDaysBlocked,
  isDateBlocked,
) => {
  const effectiveRange = calculateEffectiveRange(
    startDate,
    endDate,
    weekDaysBlocked,
    isDateBlocked,
  );
  if (maxRange && effectiveRange > maxRange) {
    onMaxRangeFails && onMaxRangeFails(MAX_RANGE_MESSAGE(maxRange));
    return false;
  }
  if (minRange && effectiveRange < minRange) {
    onMinRangeFails && onMinRangeFails(MIN_RANGE_MESSAGE(minRange));
    return false;
  }
  return true;
};

const Days = ({ isDateRange = false }) => {
  const {
    options,
    state,
    utils,
    onDateChange,
    blockedDates,
    blockedMonths,
    blockedWeekDays,
    markedDates,
    maxRange,
    minRange,
    onMinRangeFails,
    onMaxRangeFails,
    startDayOfWeek,
    onRangeChange,
    onBlockedPress,
    onlyCurrentMonth,
  } = useCalendar();

  const [mainState, setMainState] = state;
  const [itemSize, setItemSize] = useState < number > 0;
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const style = styles(options);
  const today = useMemo(() => normalizeDate(utils.getToday()), []);
  const days = useMemo(() => {
    LayoutAnimation.easeInEaseOut();
    return utils.getMonthDays(mainState.activeDate, startDayOfWeek);
  }, [mainState.activeDate, startDayOfWeek, utils]);

  const weekDaysBlocked = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      const dayOfWeek = (new Date(normalizedDate.replace(/\//g, '-')).getDay() + 1) % 7;
      return blockedWeekDays?.includes(dayOfWeek) || false;
    },
    [blockedWeekDays],
  );

  const isDateBlocked = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      const dateMonth = utils.getDate(normalizedDate).month();
      if (blockedDates && blockedMonths && !onlyCurrentMonth) {
        const month = utils.getDate(normalizedDate).month() + 1;
        const year = utils.getDate(normalizedDate).year();
        const datevalue = `${year}/${String(month).padStart(2, '0')}`;
        return (
          blockedDates.includes(normalizedDate) ||
          (blockedMonths && blockedMonths.includes(datevalue))
        );
      } else if (onlyCurrentMonth) {
        const currentMonth = utils.getDate(today).month();
        const isDifferentMonth = currentMonth !== dateMonth;
        return blockedDates.includes(normalizedDate) || isDifferentMonth;
      }
      return false;
    },
    [blockedDates, blockedMonths, today, utils, onlyCurrentMonth],
  );

  const isMarkedDate = useCallback(
    (date) => markedDates && markedDates.includes(normalizeDate(date)),
    [markedDates],
  );

  const isInRange = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      if (!selectedRange.start || !selectedRange.end) return false;
      const currentDate = new Date(String(normalizedDate).replace(/\//g, '-'));
      return (
        currentDate.getTime() >=
          new Date(String(selectedRange.start).replace(/\//g, '-')).getTime() &&
        currentDate.getTime() <= new Date(String(selectedRange.end).replace(/\//g, '-')).getTime()
      );
    },
    [selectedRange],
  );

  const isSelected = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      return normalizedDate === selectedRange.start || normalizedDate === selectedRange.end;
    },
    [selectedRange],
  );

  const onSelectDay = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      const parsedDate = new Date(String(normalizedDate).replace(/\//g, '-'));
      const activeDate = new Date(String(mainState.activeDate));
      const currentMonth = activeDate.getMonth();
      const currentYear = activeDate.getFullYear();
      const selectedMonth = parsedDate.getMonth();
      const selectedYear = parsedDate.getFullYear();

      if (selectedMonth !== currentMonth || selectedYear !== currentYear) {
        setMainState({
          type: 'set',
          activeDate: parsedDate.toISOString().split('T')[0],
        });
      }

      if (isDateRange) {
        if (!selectedRange.start || selectedRange.end) {
          setSelectedRange({ start: normalizedDate, end: null });
          onRangeChange({ start: normalizedDate, end: null });
        } else {
          const startDate = new Date(String(selectedRange.start).replace(/\//g, '-'));
          const endDate = parsedDate < startDate ? startDate : parsedDate;
          const newStartDate = parsedDate < startDate ? parsedDate : startDate;

          if (
            isValidRange(
              newStartDate,
              endDate,
              minRange,
              maxRange,
              onMinRangeFails,
              onMaxRangeFails,
              weekDaysBlocked,
              isDateBlocked,
            )
          ) {
            setSelectedRange({
              start: parsedDate < startDate ? normalizedDate : selectedRange.start,
              end: parsedDate < startDate ? selectedRange.start : normalizedDate,
            });
            onRangeChange({
              start: parsedDate < startDate ? normalizedDate : selectedRange.start,
              end: parsedDate < startDate ? selectedRange.start : normalizedDate,
            });
          }
        }
      } else {
        setMainState({ type: 'set', selectedDate: normalizedDate });
        onDateChange(normalizedDate);
      }
    },
    [
      selectedRange,
      onRangeChange,
      maxRange,
      minRange,
      weekDaysBlocked,
      isDateBlocked,
      onDateChange,
      mainState,
      setMainState,
      isDateRange,
    ],
  );

  const changeItemHeight = ({ nativeEvent }) => {
    const { width } = nativeEvent.layout;
    if (!itemSize) {
      setItemSize((width / 7).toFixed(2) * 1 - 0.5);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return (
    <View style={[style.container, utils.flexDirection]} onLayout={changeItemHeight}>
      {days.map((day, index) => (
        <View key={index} style={{ width: itemSize, height: itemSize }}>
          {day && (
            <TouchableOpacity
              style={[
                style.dayItem,
                // { borderRadius: itemSize / 2 },
                normalizeDate(day.date) === today &&
                  !isSelected(day.date) &&
                  // isDateBlocked(day.date) &&
                  style.dayTodayItem,
                isSelected(day.date) && isDateRange && style.daySelectedItem,
                !isDateRange &&
                  mainState.selectedDate === normalizeDate(day.date) &&
                  style.daySelectedItem,
                isInRange(day.date) &&
                  !isSelected(day.date) &&
                  !weekDaysBlocked(day.date) &&
                  !isDateBlocked(day.date) && {
                    ...style.dayInRangeItem,
                    ...style.disabled,
                  },
                (weekDaysBlocked(day.date) || isDateBlocked(day.date)) && {
                  ...style.disabled,
                  ...style.dayBlockedItem,
                },
                selectedRange.start === normalizeDate(day.date) && style.firstItemInRange,
                selectedRange.end === normalizeDate(day.date) && style.lastItemInRange,
              ]}
              onPress={() => {
                if (!day.disabled && !weekDaysBlocked(day.date) && !isDateBlocked(day.date)) {
                  onSelectDay(day.date);
                } else if (
                  (weekDaysBlocked(day.date) || isDateBlocked(day.date)) &&
                  onBlockedPress
                ) {
                  onBlockedPress(day.date);
                }
              }}
              activeOpacity={0.8}
              disabled={!onBlockedPress && (weekDaysBlocked(day.date) || isDateBlocked(day.date))}
            >
              <Text
                style={[
                  style.dayText,
                  isSelected(day.date) && style.daySelectedText,
                  !isDateRange &&
                    mainState.selectedDate === normalizeDate(day.date) &&
                    style.daySelectedText,

                  normalizeDate(day.date) === today &&
                    !isInRange(day.date) &&
                    !isSelected(day.date) &&
                    style.dayTodayText,

                  isInRange(day.date) && !isSelected(day.date) && style.dayInRangeText,
                  day.disabled && {
                    ...style.dayDisabledText,
                    ...style.disabled,
                  },
                  (weekDaysBlocked(day.date) || isDateBlocked(day.date)) && {
                    ...style.dayDisabledText,
                    ...style.disabled,
                  },
                ]}
              >
                {day.dayString}
              </Text>
              {isMarkedDate(day.date) && (
                <View
                  style={[
                    style.markedDot,
                    isSelected(day.date) && isDateRange && style.markedDotSecondary,
                    !isDateRange &&
                      mainState.selectedDate === normalizeDate(day.date) &&
                      style.markedDotSecondary,
                    normalizeDate(day.date) === today && style.markedDotSecondary,
                    isInRange(day.date) &&
                      !isSelected(day.date) &&
                      !weekDaysBlocked(day.date) &&
                      !isDateBlocked(day.date) &&
                      style.markedDotSecondary,
                    weekDaysBlocked(day.date) && !!isSelected && style.markedDot && style.disabled,
                    isDateBlocked(day.date) && !!isSelected && style.markedDot,
                  ]}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flexWrap: 'wrap',
    },
    dayItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 1.5,
      ...theme.viewDayItemStyle,
    },
    daySelectedItem: {
      backgroundColor: theme.mainColor,
      ...theme.viewDayItemSelectedStyle,
    },
    dayText: {
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.textDefaultColor,
      textAlign: 'center',
      width: '100%',
      ...theme.textDayStyle,
    },
    daySelectedText: {
      color: theme.selectedTextColor,
      fontFamily: theme.headerFont,
      ...theme.textDaySelectedStyle,
    },
    dayDisabledText: {
      color: theme.textDefaultColor,
      ...theme.textDayDisabledStyle,
    },
    disabled: {
      opacity: 0.7,
    },
    markedDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.viewMarkedDotStyle,
      position: 'absolute',
      bottom: 4,
      ...theme.viewMarkedDotStyle,
    },
    markedDotSecondary: {
      backgroundColor: theme.backgroundColor,
    },
    dayInRangeItem: {
      backgroundColor: theme.mainColor,
      ...theme.viewDayInRangeItemStyle,
    },
    dayInRangeText: {
      color: theme.selectedTextColor,
    },
    dayBlockedItem: {
      backgroundColor: theme.mainColor,
      opacity: 0.55,
      ...theme.viewDayBlockedItemStyle,
    },
    dayTodayItem: {
      borderColor: theme.mainColor,
      borderWidth: 1.5,
      opacity: 1,
      ...theme.viewDayTodayItemStyle,
    },
    dayTodayText: {
      color: theme.textDefaultColor,
      ...theme.textTodayStyle,
    },
    firstItemInRange: {
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      ...theme.viewFirstItemInRangeStyle,
    },
    lastItemInRange: {
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      ...theme.viewLastItemInRangeStyle,
    },
  });

export { Days };
export default memo(Days);
