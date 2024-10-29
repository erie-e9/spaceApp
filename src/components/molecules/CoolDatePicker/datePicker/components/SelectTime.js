import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { View, StyleSheet, Text, Animated, Easing, TouchableOpacity } from 'react-native';
import { useCalendar } from '../DatePicker';
import { TimeScroller } from './index';

const SelectTime = () => {
  const {
    options,
    state,
    utils,
    minuteInterval,
    mode,
    onTimeChange,
    animationDuration,
    allowedHourRange,
    allowedMinuteRange,
    showOnlyHours,
    showOnlyMinutes,
    blockedHours,
    blockedMinutes,
    format24Hrs,
  } = useCalendar();
  const [mainState, setMainState] = state;
  const [show, setShow] = useState(false);
  const startHour = (allowedHourRange && allowedHourRange.startHour) || 0;
  const endHour = (allowedHourRange && allowedHourRange.endHour) || 0;
  const startMinute = (allowedMinuteRange && allowedMinuteRange.startMinute) || 0;
  const endMinute = (allowedMinuteRange && allowedMinuteRange.endMinute) || 0;
  const [time, setTime] = useState({
    minute: startMinute,
    hour: startHour,
  });
  const [selectedPeriod, setSelectedPeriod] = useState(
    startHour < 12 || endHour < 12 ? 'AM' : 'PM',
  );
  const style = styles(options);
  const openAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show) {
      // const dateTime = utils.getDate(mainState.selectedDate)
      // setTime({ minute: +dateTime.get('minute'), hour: +dateTime.get('hour') })
      setTime({
        minute: startMinute,
        hour: startHour,
      });
    }
  }, [show, startMinute, startHour]);

  useEffect(() => {
    mainState.timeOpen && setShow(true);
    Animated.timing(openAnimation, {
      toValue: mainState.timeOpen ? 1 : 0,
      duration: animationDuration || 350,
      useNativeDriver: true,
      easing: Easing.bezier(0.17, 0.67, 0.46, 1),
    }).start(() => {
      !mainState.timeOpen && setShow(false);
    });
  }, [mainState.timeOpen, openAnimation]);

  const onlyHours = useMemo(
    () => showOnlyHours || (!showOnlyHours && !showOnlyMinutes),
    [showOnlyMinutes, showOnlyHours],
  );

  const isTimeWithinRange = useCallback(
    (hour, minute) => {
      let adjustedHour = hour;
      if (!format24Hrs) {
        if (selectedPeriod === 'PM' && hour !== 12) {
          adjustedHour += 12;
        } else if (selectedPeriod === 'AM' && hour === 12) {
          adjustedHour = 0;
        }
      }

      if (adjustedHour < startHour || adjustedHour > endHour) return false;
      if (adjustedHour === startHour && minute < startMinute) return false;
      if (adjustedHour === endHour && minute > endMinute) return false;
      return true;
    },
    [startHour, endHour, startMinute, endMinute, format24Hrs, selectedPeriod],
  );

  const selectTime = useCallback(() => {
    const newTime = utils.getDate(mainState.activeDate);
    let adjustedHour = time.hour;

    if (!format24Hrs) {
      adjustedHour = selectedPeriod === 'PM' ? time.hour + 12 : time.hour;
    }
    newTime.hour(adjustedHour).minute(time.minute);
    setMainState({
      type: 'set',
      activeDate: utils.getFormatted(newTime),
      selectedDate: mainState.selectedDate
        ? utils.getFormatted(
            utils.getDate(mainState.selectedDate).hour(adjustedHour).minute(time.minute),
          )
        : '',
    });
    onTimeChange(utils.getFormatted(newTime, 'timeFormat'));
    if (mode !== 'time') {
      setMainState({ type: 'toggleTime' });
    }
  }, [mainState.activeDate, mainState.selectedDate, selectedPeriod]);

  const generateData = (start, end, step = 1) => {
    const data = [];
    for (let i = start; i <= end; i += step) {
      data.push(i);
    }
    return data;
  };

  const generateMinuteData = (
    start,
    end,
    step = 1,
    allowedRange = { startMinute: 0, endMinute: 59 },
  ) => {
    const data = [];
    for (let i = start; i <= end; i += step) {
      if (i >= allowedRange.startMinute && i <= allowedRange.endMinute) {
        data.push(i);
      }
    }
    return data;
  };

  const generateDisabledItems = () => {
    const disabledHours = new Set(blockedHours);

    for (let i = startHour; i <= endHour; i++) {
      if (blockedHours && blockedHours.includes(i)) {
        disabledHours.add(i);
      }
    }

    const disabledMinutes = new Set();
    for (let i = 0; i < 60; i++) {
      if (
        (time.hour === startHour && i < startMinute) ||
        (time.hour === endHour && i > endMinute) ||
        (blockedMinutes && blockedMinutes.includes(i))
      ) {
        disabledMinutes.add(i);
      }
    }

    return { disabledHours, disabledMinutes };
  };

  const { disabledHours, disabledMinutes } = generateDisabledItems();

  const isSelectButtonDisabled = useMemo(
    () =>
      showOnlyMinutes
        ? !isTimeWithinRange(time.hour, time.minute) || disabledHours.has(time.hour)
        : !(time.hour >= startHour && time.hour <= endHour),
    [isTimeWithinRange, allowedHourRange, disabledHours, selectedPeriod, startHour, endHour],
  );

  const isHourInRange = (hour) => {
    let adjustedHour = hour;
    if (!format24Hrs) {
      if (selectedPeriod === 'PM' && hour !== 12) {
        adjustedHour += 12;
      } else if (selectedPeriod === 'AM' && hour === 12) {
        adjustedHour = 0;
      }
    }
    return adjustedHour >= startHour && adjustedHour <= endHour;
  };

  const isMinuteInRange = (hour, minute) => {
    let adjustedHour = hour;
    if (!format24Hrs) {
      if (selectedPeriod === 'PM' && hour !== 12) {
        adjustedHour += 12;
      } else if (selectedPeriod === 'AM' && hour === 12) {
        adjustedHour = 0;
      }
    }
    return (
      (adjustedHour > startHour && adjustedHour < endHour) ||
      (adjustedHour === startHour && minute >= startMinute) ||
      (adjustedHour === endHour && minute <= endMinute)
    );
  };

  const isSelectDisabled = useMemo(
    () => !isHourInRange(time.hour) || !isMinuteInRange(time.hour, time.minute),
    [isHourInRange, isMinuteInRange, selectedPeriod],
  );

  const generate12HourData = () => {
    const data = [];
    for (let i = 1; i <= 12; i++) {
      let adjustedHour = i;
      if (i === 12 && selectedPeriod === 'AM') adjustedHour = 0;
      if (i !== 12 && selectedPeriod === 'PM') adjustedHour += 12;
      if (adjustedHour >= startHour && adjustedHour <= endHour) {
        data.push(i);
      }
    }
    return data;
  };

  const hourData = format24Hrs ? generateData(startHour, endHour) : generate12HourData();

  const minuteData = useMemo(
    () =>
      !showOnlyHours
        ? generateMinuteData(0, 59, minuteInterval, { startMinute, endMinute })
        : generateData(0, 59, minuteInterval).filter((minute) =>
            disabledMinutes.has(minute) ? false : true,
          ),
    [startMinute, endMinute, minuteInterval],
  );

  const containerStyle = [
    style.container,
    {
      opacity: openAnimation,
      transform: [
        {
          scale: openAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    },
  ];

  return show ? (
    <Animated.View style={containerStyle}>
      {onlyHours && (
        <TimeScroller
          title={utils.config.hour}
          data={hourData}
          onChange={(hour) => setTime({ ...time, hour })}
          disabledItems={disabledHours}
          initValue={time.hour}
        />
      )}
      {!format24Hrs && onlyHours && (
        <View style={style.rowButtonsContainer}>
          {(startHour < 12 || endHour < 12) && (
            <TouchableOpacity
              style={[style.rowButtons, selectedPeriod === 'PM' && style.disabled]}
              onPress={() => setSelectedPeriod('AM')}
              disabled={selectedPeriod === 'AM'}
            >
              <Text style={style.rowButtonText}>AM</Text>
            </TouchableOpacity>
          )}
          {(startHour > 11 || endHour > 11) && (
            <TouchableOpacity
              style={[style.rowButtons, selectedPeriod === 'AM' && style.disabled]}
              onPress={() => setSelectedPeriod('PM')}
              disabled={selectedPeriod === 'PM'}
            >
              <Text style={style.rowButtonText}>PM</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {showOnlyMinutes && (
        <TimeScroller
          title={utils.config.minute}
          data={minuteData}
          onChange={(minute) => setTime({ ...time, minute })}
          disabledItems={disabledMinutes}
          initValue={time.minute}
        />
      )}
      <View style={style.footer}>
        <TouchableOpacity
          style={[style.button, (isSelectButtonDisabled || isSelectDisabled) && style.disabled]}
          activeOpacity={0.8}
          onPress={selectTime}
          disabled={isSelectButtonDisabled || isSelectDisabled}
        >
          <Text style={style.btnText}>{utils.config.timeSelect}</Text>
        </TouchableOpacity>
        {mode !== 'time' && (
          <TouchableOpacity
            style={[style.button, style.cancelButton]}
            onPress={() =>
              setMainState({
                type: 'toggleTime',
              })
            }
            activeOpacity={0.8}
          >
            <Text style={style.btnText}>{utils.config.timeClose}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  ) : null;
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      backgroundColor: theme.backgroundColor,
      borderRadius: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 999,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
      ...theme.viewButtonsActionTimeStyle,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 8,
      backgroundColor: theme.mainColor,
      margin: 8,
      ...theme.viewButtonActionSelectTimeStyle,
    },
    btnText: {
      fontSize: theme.textFontSize,
      color: theme.selectedTextColor,
      fontFamily: theme.defaultFont,
      ...theme.textActionTimeStyle,
    },
    cancelButton: {
      backgroundColor: theme.textSecondaryColor,
      ...theme.viewButtonActionCancelTimeStyle,
    },
    rowButtonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    },
    rowButtons: {
      paddingVertical: 7,
      paddingHorizontal: 15,
      borderRadius: 8,
      backgroundColor: theme.mainColor,
      margin: 8,
    },
    rowButtonText: {
      fontSize: theme.textFontSize * 0.65,
      color: theme.selectedTextColor,
      fontFamily: theme.defaultFont,
    },
    disabled: {
      opacity: 0.6,
    },
  });

export default memo(SelectTime);
export { SelectTime };
