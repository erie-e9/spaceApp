import React, {
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  clamp,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ModalPayload } from '@slices/types/modal';
import { screen_height } from '@utils/functions';
import { useLanguage, useNativeActions } from '@hooks';
import { hideModal } from '@slices/shared/modal';
import { CloseButton } from '@components/molecules';
import ModalHeader from '@components/organisms/Modal/ModalHeader';
import ModalItem from '@components/organisms/Modal/ModalItem';
import AnimatedBackground from '@components/organisms/Modal/AnimatedBackground';
import {
  AnimatedBottomSheet,
  CloseBottomSheetButton,
  BodyContainer,
  StyledList,
  CloseIconContainer,
  PanGestureHandlerView,
} from './styles';

const MAX_TRANSLATE_Y = -screen_height + 80;

export interface BottomSheetRefProps {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, ModalPayload>(
  (
    {
      testID = 'BottomSheetID',
      title,
      description,
      isVisible,
      showCancelIcon = false,
      body,
      list,
      expandible,
      loading,
      drawerOptions,
    },
    ref,
  ) => {
    const dispatch = useDispatch();
    const { switchLanguage } = useLanguage();
    const { useNativeBackButton } = useNativeActions();
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const items = useMemo(() => list?.data, [list?.data]);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, {
        stiffness: 200,
        damping: 25,
      });
    }, []);

    const isActive = useCallback(() => active.value, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const handleClose = useCallback(() => {
      scrollTo(100);
      setTimeout(() => {
        dispatch(hideModal());
      }, 500);
    }, [translateY.value]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate(event => {
        if (list || expandible) {
          translateY.value = event.translationY + context.value.y;
          translateY.value = clamp(translateY.value, MAX_TRANSLATE_Y, 0);
        }
      })
      .onEnd(() => {
        if (translateY.value > -screen_height / 5) {
          runOnJS(handleClose)();
        } else if (translateY.value < -screen_height / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const bottomSheetStyle = useAnimatedStyle(() => ({
      borderRadius: interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
      ),
      transform: [{ translateY: translateY.value }],
    }));

    useNativeBackButton({ callback: handleClose });

    const bottomSheetSizeHandler = useCallback(() => {
      if (!active.value) {
        scrollTo(
          drawerOptions?.height ? -drawerOptions?.height : -screen_height / 3,
        );
      }
      if (active.value && translateY.value < -screen_height / 3) {
        scrollTo(-screen_height / 3);
      }
      if (list && active.value && translateY.value >= -screen_height / 3) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    }, [active.value, drawerOptions?.height, list, scrollTo, translateY.value]);

    useEffect(() => {
      if (isVisible) {
        bottomSheetSizeHandler();
      }
    }, [isVisible]);

    const onPressHandler = useCallback(
      ({ item }: any) => {
        if (list?.onPressItem) list.onPressItem();
        if (list?.predefinedList === 'languages') switchLanguage(item);
        handleClose();
      },
      [handleClose, list, switchLanguage],
    );

    return (
      <>
        <AnimatedBackground onTouch={handleClose} isActive={!active.value} />
        <GestureDetector gesture={gesture}>
          <AnimatedBottomSheet testID={testID} style={[bottomSheetStyle]}>
            <CloseBottomSheetButton onPress={bottomSheetSizeHandler}>
              <PanGestureHandlerView />
            </CloseBottomSheetButton>
            {!showCancelIcon && (
              <CloseIconContainer>
                <CloseButton onPress={handleClose} />
              </CloseIconContainer>
            )}
            <ModalHeader title={title} description={description || ''} />
            {body && (
              <BodyContainer drawerOptions={drawerOptions}>
                {body}
              </BodyContainer>
            )}
            {loading ? (
              <ActivityIndicator size={25} />
            ) : (
              list && (
                <StyledList
                  data={items || []}
                  numColumns={drawerOptions ? drawerOptions.numColumns : 1}
                  renderItem={({ item }) => (
                    <ModalItem
                      item={item}
                      predefinedList={list.predefinedList}
                      onPress={() => onPressHandler({ item })}
                    />
                  )}
                />
              )
            )}
          </AnimatedBottomSheet>
        </GestureDetector>
      </>
    );
  },
);

export default memo(BottomSheet);
