import React, { useEffect, useMemo, memo } from 'react';
import { View, StyleSheet, Text, Animated, Platform } from 'react-native';
import { Days, Header } from './index';
import { useCalendar } from '../DatePicker';

const Calendar = ({ isDateRange = false }) => {
  const { options, state, utils, onSelectedChange, startDayOfWeek } = useCalendar();
  const [mainState] = state;
  const style = styles(options);
  const [{ shownAnimation }, changeMonthAnimation] = utils.useMonthAnimation(
    mainState.activeDate,
    Platform.OS === 'ios' ? options.daysAnimationDistance : 0,
  );

  const weekdays = useMemo(() => utils.getDaysOfWeek(startDayOfWeek), [startDayOfWeek]);

  useEffect(() => {
    mainState.selectedDate && onSelectedChange(mainState.selectedDate);
  }, [mainState.selectedDate, onSelectedChange]);

  return (
    <View style={style.container}>
      <Header changeMonth={changeMonthAnimation} />
      <View style={[style.daysName, utils.flexDirection]}>
        {/* {utils.config.dayNamesShort.map((item) => ( */}
        {weekdays.map((item) => (
          <Text key={item} style={style.daysNameText}>
            {item}
          </Text>
        ))}
      </View>
      <View style={style.daysContainer}>
        <Animated.View style={[style.days, shownAnimation]}>
          <Days isDateRange={isDateRange} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    daysName: {
      paddingBottom: 10,
      marginBottom: 0,
      alignItems: 'center',
      justifyContent: 'space-around',
      borderBottomColor: theme.borderColor,
      borderBottomWidth: 1,
      marginHorizontal: 15,
      ...theme.viewDaysNameStyle,
    },
    daysNameText: {
      fontFamily: theme.defaultFont,
      color: theme.textSecondaryColor,
      fontSize: theme.textFontSize,
      ...theme.textDayNamesStyle,
    },
    daysContainer: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
      margin: 15,
      marginTop: 5,
      marginBottom: 0,
      ...theme.viewDaysContainerStyle,
    },
    days: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
    },
  });

export { Calendar };
export default memo(Calendar);