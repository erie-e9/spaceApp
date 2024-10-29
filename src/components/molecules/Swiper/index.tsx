import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface SwiperProps {
  onSwipe: () => void;
  text: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
}

export const Swiper: React.FC<SwiperProps> = ({
  onSwipe,
  text,
  width = 200,
  height = 50,
  backgroundColor = '#007BFF',
  textColor = '#FFFFFF',
}) => {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > width / 2) {
        translateX.value = withSpring(width, {}, () => {
          onSwipe();
          translateX.value = withSpring(0);
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.swipeable, animatedStyle, { width: height, height }]}>
          <Text style={[styles.text, { color: textColor }]}>▶</Text>
        </Animated.View>
      </GestureDetector>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  swipeable: {
    position: 'absolute',
    backgroundColor: '#00000033',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default memo(Swiper);
