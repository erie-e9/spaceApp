import { useRef, useState } from 'react';
import { Animated, Easing, I18nManager } from 'react-native';
import moment from 'moment-jalaali';

const m = moment();
const jalaaliConfigs = {
  dayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
  dayNamesShort: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
  monthNames: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ],
  selectedFormat: 'jYYYY/jMM/jDD',
  dateFormat: 'jYYYY/jMM/jDD',
  monthYearFormat: 'jYYYY jMM',
  timeFormat: 'HH:mm ',
  hour: 'ساعت',
  minute: 'دقیقه',
  timeSelect: 'انتخاب',
  timeClose: 'بستن',
};

class utils {
  gregorianConfigs = {
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    selectedFormat: 'YYYY/MM/DD',
    dateFormat: 'YYYY/MM/DD',
    monthYearFormat: 'YYYY MM',
    timeFormat: 'HH:mm',
    hour: 'Hour',
    minute: 'Minute',
    timeSelect: 'Select',
    timeClose: 'Close',
  };

  constructor({
    minimumDate,
    maximumDate,
    isGregorian,
    mode,
    reverse,
    configs,
    animationDuration,
  }) {
    this.data = {
      minimumDate,
      maximumDate,
      isGregorian,
      reverse: reverse === 'unset' ? false : reverse,
      animationDuration,
    };

    this.config = isGregorian ? this.gregorianConfigs : jalaaliConfigs;
    this.config = { ...this.config, ...configs };
    if (mode === 'time' || mode === 'datepicker') {
      this.config.selectedFormat = this.config.dateFormat + ' ' + this.config.timeFormat;
    }
  }

  get flexDirection() {
    return {
      flexDirection: this.data.reverse ? (I18nManager.isRTL ? 'row' : 'row-reverse') : 'row',
    };
  }

  getFormatted = (date, formatName = 'selectedFormat') => date.format(this.config[formatName]);

  getFormattedDate = (date = new Date(), format = 'YYYY/MM/DD') => moment(date).format(format);

  getTime = (time) => this.getDate(time).format(this.config.timeFormat);

  getToday = () => this.getFormatted(m, 'dateFormat');

  getMonthName = (month) => this.config.monthNames[month];

  toPersianNumber = (value) => {
    const { isGregorian } = this.data;
    return isGregorian
      ? this.toEnglish(String(value))
      : String(value).replace(/[0-9]/g, (w) =>
          String.fromCharCode(w.charCodeAt(0) + '۰'.charCodeAt(0) - 48),
        );
  };

  toEnglish = (value) => {
    const charCodeZero = '۰'.charCodeAt(0);
    return value.replace(/[۰-۹]/g, (w) => String.fromCharCode(w.charCodeAt(0) - charCodeZero + 48));
  };

  getDate = (time) => moment(time, this.config.selectedFormat);

  getMonthYearText = (time) => {
    const date = this.getDate(time);
    const year = this.toPersianNumber(date.year());
    const month = this.getMonthName(date.month());
    return `${month}#${year}`;
  };

  checkMonthDisabled = (time) => {
    const { minimumDate, maximumDate, isGregorian } = this.data;
    const date = this.getDate(time);
    let disabled = false;
    if (minimumDate) {
      const lastDayInMonth = isGregorian ? date.date(29) : date.jDate(29);
      disabled = lastDayInMonth.isBefore(this.getDate(minimumDate));
    }
    if (maximumDate && !disabled) {
      const firstDayInMonth = isGregorian ? date.date(1) : date.jDate(1);
      disabled = firstDayInMonth.isAfter(this.getDate(maximumDate));
    }
    return disabled;
  };

  checkArrowMonthDisabled = (time, next) => {
    const { isGregorian } = this.data;
    const date = this.getDate(time);
    return this.checkMonthDisabled(
      this.getFormatted(date.add(next ? -1 : 1, isGregorian ? 'month' : 'jMonth')),
    );
  };

  checkYearDisabled = (year, next) => {
    const { minimumDate, maximumDate, isGregorian } = this.data;
    const y = isGregorian
      ? this.getDate(next ? maximumDate : minimumDate).year()
      : this.getDate(next ? maximumDate : minimumDate).jYear();
    return next ? year >= y : year <= y;
  };

  checkSelectMonthDisabled = (time, month) => {
    const { isGregorian } = this.data;
    const date = this.getDate(time);
    const dateWithNewMonth = isGregorian ? date.month(month) : date.jMonth(month);
    return this.checkMonthDisabled(this.getFormatted(dateWithNewMonth));
  };

  checkIsSameDate = (date) => {
    const { maximumDate } = this.data;
    const getMonthNameCurrent = this.getMonthYearText(maximumDate ? maximumDate : this.getToday());
    const getMonthNameCalendar = this.getMonthYearText(
      this.getFormatted(this.getDate(date), 'dateFormat'),
    );
    return getMonthNameCurrent === getMonthNameCalendar;
  };

  validYear = (time, year) => {
    const { minimumDate, maximumDate, isGregorian } = this.data;
    const date = isGregorian ? this.getDate(time).year(year) : this.getDate(time).jYear(year);
    let validDate = this.getFormatted(date);
    if (minimumDate && date.isBefore(this.getDate(minimumDate))) {
      validDate = minimumDate;
    }
    if (maximumDate && date.isAfter(this.getDate(maximumDate))) {
      validDate = maximumDate;
    }
    return validDate;
  };

  getMonthDays = (time, startDayOfWeek) => {
    const { minimumDate, maximumDate, isGregorian } = this.data;
    const today = moment();
    let date = this.getDate(time);
    const currentMonthDays = isGregorian
      ? date.daysInMonth()
      : moment.jDaysInMonth(date.jYear(), date.jMonth());
    const firstDay = isGregorian ? date.date(1) : date.jDate(1);
    const dayOfMonth = (firstDay.day() + 7 - startDayOfWeek) % 7;
    // let dayOfMonth = ((firstDay.day() + Number(!true)) % 7) - 1
    // if (dayOfMonth < 0) dayOfMonth += 7
    return [
      ...new Array(dayOfMonth),
      ...[...new Array(currentMonthDays)].map((i, n) => {
        const thisDay = isGregorian ? date.date(n + 1) : date.jDate(n + 1);
        let disabled = false;
        if (minimumDate) {
          disabled = thisDay < this.getDate(minimumDate);
        }
        if (maximumDate && !disabled) {
          disabled = thisDay > this.getDate(maximumDate);
        }

        date = this.getDate(time);
        return {
          dayString: this.toPersianNumber(n + 1),
          day: n + 1,
          date: this.getFormatted(isGregorian ? date.date(n + 1) : date.jDate(n + 1)),
          disabled,
          isToday: date.date(n + 1).isSame(today, 'day'),
        };
      }),
    ];
  };

  getDaysOfWeek = (startDayOfWeek) => {
    const firstDayIndex = (7 + startDayOfWeek) % 7;
    return [
      ...this.config.dayNamesShort.slice(firstDayIndex),
      ...this.config.dayNamesShort.slice(0, firstDayIndex),
    ];
  };

  useMonthAnimation = (activeDate, distance, onEnd = () => null) => {
    const [lastDate, setLastDate] = useState(activeDate);
    const [changeWay, setChangeWay] = useState(null);
    const monthYearAnimation = useRef(new Animated.Value(0)).current;
    const { animationDuration } = this.data;
    const changeMonthAnimation = (type) => {
      setChangeWay(type);
      setLastDate(activeDate);
      monthYearAnimation.setValue(1);
      Animated.timing(monthYearAnimation, {
        toValue: 0,
        duration: animationDuration || 350,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 0.66, 0.54, 1),
      }).start(onEnd);
    };

    const shownAnimation = {
      opacity: monthYearAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, changeWay === 'NEXT' ? distance : -distance],
          }),
        },
      ],
    };

    const hiddenAnimation = {
      opacity: monthYearAnimation,
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [changeWay === 'NEXT' ? distance : -distance, 0],
          }),
        },
      ],
    };

    return [{ lastDate, shownAnimation, hiddenAnimation }, changeMonthAnimation];
  };

  compareDate = (a, b) => {
    const length = (this.config['dateFormat'] ?? '').length;
    if (length > 0 && typeof a === 'string' && typeof b === 'string') {
      return a.substring(0, length) === b.substring(0, length);
    } else {
      return a === b;
    }
  };
}

export { utils };
