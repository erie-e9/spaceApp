import React, { useState, memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Animated,
  I18nManager,
} from 'react-native';
import { useCalendar } from '../DatePicker';

const Header = ({ changeMonth }) => {
  const {
    options,
    disableDateChange,
    state,
    utils,
    minimumDate,
    maximumDate,
    isGregorian,
    mode,
    showDaysFromToday,
    markedMonths,
    blockedMonths,
    onlyCurrentMonth,
    configs,
  } = useCalendar();

  const [mainState, setMainState] = state;
  const style = styles(options);
  const [disableChange, setDisableChange] = useState(false);
  const [{ lastDate, shownAnimation, hiddenAnimation }, changeMonthAnimation] =
    utils.useMonthAnimation(mainState.activeDate, options.headerAnimationDistance, () =>
      setDisableChange(false),
    );
  const today = useMemo(() => utils.getToday(), []);
  const getTodayDate = useMemo(() => {
    const [year, month, day] = today.split('/').map(Number);
    return {
      year,
      month: String(month).padStart(2, '0'),
      day: utils.toPersianNumber(Number(String(day).padStart(2, '0'))),
    };
  }, [today, utils]);

  const calculateDaysFromToday = useCallback(() => {
    const todayDate = new Date();
    const maxDate = new Date(mainState.activeDate.replace(/\//g, '-'));
    const timeDiff = todayDate.getTime() - maxDate.getTime();
    return Math.abs(Math.floor(timeDiff / (1000 * 3600 * 24)));
  }, [mainState.activeDate]);

  const daysFromToday = useMemo(() => {
    const daysCount = calculateDaysFromToday();
    return `${String(daysCount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${
      configs?.daysFromToday || `day${daysCount === 1 ? '' : 's'} from today`
    }`;
  }, [calculateDaysFromToday]);

  const isMonthBlocked = useCallback(
    (date) => {
      const month = utils.getDate(date).month() + 1;
      const year = utils.getDate(date).year();
      const datevalue = `${year}/${String(month).padStart(2, '0')}`;
      return blockedMonths && blockedMonths.includes(datevalue);
    },
    [blockedMonths, utils],
  );

  const prevDisable =
    disableDateChange ||
    (minimumDate && utils.checkArrowMonthDisabled(mainState.activeDate, true)) ||
    onlyCurrentMonth;

  const nextDisable =
    disableDateChange ||
    (maximumDate && utils.checkArrowMonthDisabled(mainState.activeDate, false)) ||
    onlyCurrentMonth;

  const goToTodayOrMaxDateDisabled =
    disableDateChange ||
    utils.checkIsSameDate(mainState.activeDate) ||
    (maximumDate && utils.checkArrowMonthDisabled(mainState.activeDate, false)) ||
    isMonthBlocked(utils.getFormatted(utils.getDate(mainState.activeDate)));

  const onChangeMonth = (type) => {
    if (disableChange) return;
    setDisableChange(true);

    let modificationNumber = type === 'NEXT' ? 1 : -1;
    let newDate = utils
      .getDate(mainState.activeDate)
      .add(modificationNumber, isGregorian ? 'month' : 'jMonth');

    while (
      isMonthBlocked(utils.getFormatted(newDate)) &&
      !utils.checkArrowMonthDisabled(utils.getFormatted(newDate), type === 'NEXT')
    ) {
      newDate = newDate.add(modificationNumber, isGregorian ? 'month' : 'jMonth');
    }

    setMainState({ type: 'set', activeDate: utils.getFormatted(newDate) });
    changeMonthAnimation(type);
    changeMonth(type);
  };

  const goToTodayOrMaxDate = () => {
    changeMonthAnimation('NEXT');
    let targetDate = today;
    if (maximumDate && maximumDate < today) {
      targetDate = maximumDate;
    }
    targetDate = utils.getDate(targetDate).add(0, isGregorian ? 'month' : 'jMonth');
    setMainState({ type: 'set', activeDate: utils.getFormatted(targetDate) });
    changeMonth('NEXT');
  };

  const isMarkedMonth = useCallback(() => {
    const [year, month] = mainState.activeDate.split('/').map(Number);
    const datevalue = `${utils.toEnglish(String(year))}/${String(month).padStart(2, '0')}`;
    return markedMonths && markedMonths.includes(datevalue);
  }, [mainState.activeDate, markedMonths, utils]);

  return (
    <View style={[style.container, I18nManager.isRTL && style.reverseContainer]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !prevDisable && onChangeMonth('NEXT')}
        style={style.arrowWrapper}
        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
      >
        <Image
          source={require('../../assets/arrow.png')}
          style={[style.arrow, nextDisable && style.disableArrow]}
        />
      </TouchableOpacity>
      <View style={style.monthYearContainer}>
        {showDaysFromToday && (
          <View style={style.daysFromTodayContainer}>
            <Text style={style.daysFromTodayText}>{daysFromToday}</Text>
          </View>
        )}
        <Animated.View
          style={[
            style.monthYear,
            shownAnimation,
            style.activeMonthYear,
            I18nManager.isRTL && style.reverseMonthYear,
          ]}
        >
          {mode === 'datepicker' && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                options.headerBorderWidth ? style.centerWrapper : style.centerWrapperWithoutBorder,
                {
                  marginRight: I18nManager.isRTL ? 0 : 5,
                  marginLeft: I18nManager.isRTL ? 5 : 0,
                },
              ]}
              onPress={() =>
                setMainState({
                  type: 'toggleTime',
                })
              }
            >
              <Text style={style.headerText}>
                {utils.toPersianNumber(utils.getTime(mainState.selectedDate))}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              options.headerBorderWidth ? style.centerWrapper : style.centerWrapperWithoutBorder,
              style.monthYearWrapper,
              utils.flexDirection,
            ]}
            onPress={() =>
              !disableDateChange &&
              setMainState({
                type: 'toggleMonth',
              })
            }
            disabled={onlyCurrentMonth}
          >
            {isMarkedMonth() && <View style={[style.markedDot]} />}
            <Text style={[style.headerText, style.monthText]}>
              {utils.getMonthYearText(mainState.activeDate).split('#')[0]}
            </Text>
            <Text style={[style.headerText, style.monthText]}>
              {configs.textSeparatorMonthYear ?? ' '}
            </Text>
            <Text style={[style.headerText, style.monthText]}>
              {utils.getMonthYearText(mainState.activeDate).split('#')[1]}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            style.monthYear,
            hiddenAnimation,
            utils.flexDirection,
            I18nManager.isRTL && style.reverseMonthYear,
          ]}
        >
          <Text style={style.headerText}>{utils.getMonthYearText(lastDate).split('#')[0]}</Text>
          <Text style={style.headerText}>{configs.textSeparatorMonthYear ?? ' '}</Text>
          <Text style={style.headerText}>{utils.getMonthYearText(lastDate).split('#')[1]}</Text>
          {mode === 'datepicker' && (
            <Text style={style.headerText}>
              {utils.toPersianNumber(utils.getTime(mainState.selectedDate))}
            </Text>
          )}
        </Animated.View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !prevDisable && onChangeMonth('PREVIOUS')}
        style={style.arrowWrapper}
        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
      >
        <Image
          source={require('../../assets/arrow.png')}
          style={[style.arrow, style.leftArrow, prevDisable && style.disableArrow]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 5,
      alignItems: 'center',
      flexDirection: 'row-reverse',
    },
    arrowContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    reverseContainer: {
      flexDirection: 'row',
    },
    arrowWrapper: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: 40,
      marginBottom: 15,
      borderRadius: 0,
    },
    arrow: {
      width: 18,
      height: 18,
      opacity: 0.9,
      tintColor: theme.mainColor,
      margin: 2,
      ...theme.imageArrow,
    },
    leftArrow: {
      transform: [
        {
          rotate: '180deg',
        },
      ],
    },
    disableArrow: {
      opacity: 0,
    },
    monthYearContainer: {
      flex: 1,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.viewHeaderContainerStyle,
    },
    monthYear: {
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row-reverse',
    },
    reverseMonthYear: {
      flexDirection: 'row',
    },
    activeMonthYear: {
      zIndex: 999,
    },
    monthYearWrapper: {
      alignItems: 'center',
    },
    headerText: {
      fontSize: theme.textHeaderFontSize,
      padding: 2,
      color: theme.textHeaderColor,
      fontFamily: theme.defaultFont,
      textAlignVertical: 'center',
      ...theme.textHeaderStyle,
    },
    monthText: {
      fontFamily: theme.headerFont,
    },
    centerWrapper: {
      borderColor: theme.borderColor,
      paddingVertical: 1,
      paddingHorizontal: 8,
      marginHorizontal: 3,
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: theme.headerBorderWidth,
      marginBottom: 15,
      ...theme.viewHeaderItemStyle,
    },
    centerWrapperWithoutBorder: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      alignItems: 'center',
      ...theme.viewHeaderItemStyle,
    },
    time: {
      marginRight: 5,
    },
    goTodayContainer: {
      borderWidth: 1,
      borderColor: theme.textDefaultColor,
      height: 22,
      maxWidth: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
      marginBottom: 15,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },
    goTodayText: {
      fontSize: 12,
      textAlign: 'center',
      color: theme.textHeaderColor,
      fontFamily: theme.defaultFont,
    },
    daysFromTodayContainer: {
      flex: 1,
      top: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    daysFromTodayText: {
      fontFamily: theme.defaultFont,
      color: theme.textSecondaryColor,
      fontSize: theme.textFontSize - 4,
    },
    markedDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.mainColor,
      left: -2,
      ...theme.viewMarkedDotStyle,
      //   position: 'absolute',
      //   top: 13,
    },
  });

Header.propTypes = {
  changeMonth: PropTypes.func,
};
export { Header };
export default memo(Header);
