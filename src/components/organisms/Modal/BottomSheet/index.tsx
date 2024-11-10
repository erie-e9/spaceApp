import React, { Fragment, memo, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  clamp,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { type ModalProps } from '@slices/types';
import { type Language } from '@slices/types/appPreferences';
import { screen_height, testProperties } from '@utils/functions';
import { changeLanguage as changeLanguageApp } from '@services';
import { getDeviceLanguage, useAppPreferences, useNativeActions, useModal } from '@hooks';
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

const BottomSheet = React.forwardRef<BottomSheetRefProps, ModalProps>(
  (
    {
      testID = 'BottomSheetID',
      title,
      titleColor,
      alignHeader,
      description,
      isVisible,
      showCancelIcon = false,
      body,
      list,
      expandible,
      loading,
      lockBackdrop,
      dropdownOptions,
    },
    ref,
  ) => {
    const { hideModal } = useModal();
    const { switchLanguage } = useAppPreferences();
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

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

    const handleClose = useCallback(() => {
      scrollTo(100);
      setTimeout(() => {
        hideModal();
      }, 500);
    }, [translateY.value]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
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
      borderRadius: interpolate(translateY.value, [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y], [25, 5]),
      transform: [{ translateY: translateY.value }],
    }));

    useNativeBackButton({ callback: handleClose });

    const bottomSheetSizeHandler = useCallback(() => {
      if (!active.value) {
        scrollTo(dropdownOptions?.height ? -dropdownOptions?.height : -screen_height / 3);
      }
      if (active.value && translateY.value < -screen_height / 3) {
        scrollTo(-(dropdownOptions?.height ? dropdownOptions?.height : screen_height / 3));
      }
      if (list && active.value && translateY.value >= -screen_height / 3) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    }, [active.value, dropdownOptions?.height, list, scrollTo, translateY.value]);

    useEffect(() => {
      if (isVisible) {
        bottomSheetSizeHandler();
      }
    }, [isVisible]);

    const onPressHandler = useCallback(
      async ({ item }: any) => {
        if (list?.onPressItem) list.onPressItem(item);
        if (list?.predefinedList === 'languages') {
          if (item !== null) {
            switchLanguage(item);
          } else {
            const deviceLanguange = await getDeviceLanguage();
            switchLanguage(null as Language);
            changeLanguageApp(deviceLanguange);
          }
        }
        if (dropdownOptions?.autoCloseOnSelect) {
          handleClose();
        }
      },
      [handleClose, list, switchLanguage, dropdownOptions?.autoCloseOnSelect],
    );

    return (
      <Fragment>
        <AnimatedBackground onTouch={lockBackdrop ? undefined : handleClose} isActive />
        <GestureDetector gesture={gesture}>
          <AnimatedBottomSheet {...testProperties(testID)} style={[bottomSheetStyle]}>
            <CloseBottomSheetButton onPress={bottomSheetSizeHandler}>
              <PanGestureHandlerView />
            </CloseBottomSheetButton>
            {!showCancelIcon && (
              <CloseIconContainer>
                <CloseButton onPress={handleClose} />
              </CloseIconContainer>
            )}
            <ModalHeader
              title={title}
              titleColor={titleColor}
              description={description || ''}
              alignHeader={alignHeader}
            />
            {body && <BodyContainer dropdownOptions={dropdownOptions}>{body}</BodyContainer>}
            {loading ? (
              <ActivityIndicator size={25} />
            ) : (
              list &&
              items && (
                <BodyContainer dropdownOptions={dropdownOptions}>
                  <StyledList
                    data={items || []}
                    numColumns={dropdownOptions ? dropdownOptions.numColumns : 1}
                    renderItem={({ item }) => (
                      <ModalItem
                        item={item}
                        predefinedList={list.predefinedList || ''}
                        onPress={() => onPressHandler({ item })}
                      />
                    )}
                  />
                </BodyContainer>
              )
            )}
          </AnimatedBottomSheet>
        </GestureDetector>
      </Fragment>
    );
  },
);

export default memo(BottomSheet);
