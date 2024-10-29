import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { StyleSheet, Text, Animated, View, FlatList, I18nManager } from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TimeScroller = ({ title, data, onChange, disabledItems, initValue }) => {
  const { options, utils } = useCalendar();
  const [itemSize, setItemSize] = useState < number > 0;
  const style = styles(options);
  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
  const scrollListener = useRef(null);
  const active = useRef(0);
  data = ['', '', ...data, '', ''];
  const initIndex = data.indexOf(initValue);

  useEffect(() => {
    scrollListener.current && clearInterval(scrollListener.current);
    scrollListener.current = scrollAnimatedValue.addListener(
      ({ value }) => (active.current = value),
    );

    return () => {
      clearInterval(scrollListener.current);
    };
  }, [scrollAnimatedValue]);

  const changeItemWidth = useCallback(({ nativeEvent }) => {
    const { width } = nativeEvent.layout;
    !itemSize && setItemSize(width / 5);
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    const makeAnimated = (a, b, c) => {
      return {
        inputRange: [...data.map((_, i) => i * itemSize)],
        outputRange: data.map((_, i) => {
          const center = i + 2;
          return center === index ? a : center + 1 === index || center - 1 === index ? b : c;
        }),
      };
    };

    const isDisabled = disabledItems.has(item);
    return (
      <Animated.View
        style={[
          {
            width: itemSize,
            opacity: scrollAnimatedValue.interpolate(makeAnimated(1, 0.6, 0.3)),
            transform: [
              {
                scale: scrollAnimatedValue.interpolate(makeAnimated(1.2, 0.9, 0.8)),
              },
              {
                scaleX: I18nManager.isRTL ? -1 : 1,
              },
            ],
          },
          style.listItem,
          isDisabled && { opacity: 0.3 },
        ]}
      >
        <Text style={style.listItemText}>
          {utils.toPersianNumber(String(item).length === 1 ? '0' + item : item)}
        </Text>
      </Animated.View>
    );
  }, []);

  return (
    <View style={style.row} onLayout={changeItemWidth}>
      <Text style={style.title}>{title}</Text>
      <AnimatedFlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={itemSize}
        decelerationRate={'fast'}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollAnimatedValue } } }], {
          useNativeDriver: true,
        })}
        data={I18nManager.isRTL ? data.reverse() : data}
        onMomentumScrollEnd={() => {
          const index = Math.round(active.current / itemSize);
          onChange(data[index + 2]);
        }}
        keyExtractor={(_, i) => String(i)}
        getItemLayout={(_, index) => {
          return { index, length: itemSize, offset: itemSize * index };
        }}
        renderItem={renderItem}
        initialScrollIndex={Math.max(0, initIndex - 2)}
        inverted={I18nManager.isRTL}
        contentContainerStyle={I18nManager.isRTL && { transform: [{ scaleX: -1 }] }}
      />
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    listItem: {
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'column',
      alignItems: 'center',
      marginVertical: 5,
    },
    title: {
      fontSize: theme.textHeaderFontSize,
      color: theme.mainColor,
      fontFamily: theme.headerFont,
    },
    listItemText: {
      fontSize: theme.textHeaderFontSize,
      color: theme.textDefaultColor,
      fontFamily: theme.defaultFont,
    },
  });

export default memo(TimeScroller);
export { TimeScroller };
