import React, { useState, useEffect, useCallback, memo } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { type ModalProps } from '@slices/types';
import { useModal } from '@hooks';
import { SVGIcon } from '@components/atoms';
import { Container, AnimatedMenu, MenuItem, MenuItemText, MenuItemTextContainer } from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export interface PopupMenuProps {}
const PopupMenu = React.forwardRef<PopupMenuProps, ModalProps>(
  ({ options, triggerButtonPosition, onClose, isVisible }, ref) => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const { hideModal } = useModal();

    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({
      top: 0,
      left: 0,
    });

    useEffect(() => {
      if (triggerButtonPosition && isVisible) {
        const { x, y, width, height } = triggerButtonPosition;

        // Determine if menu should open upwards or downwards
        const openUpwards = y + height + 150 > SCREEN_HEIGHT;

        setMenuPosition({
          top: openUpwards ? y - 150 : y + height,
          left: Math.min(x, SCREEN_WIDTH - 170), // Ensures the menu fits horizontally
        });

        // Trigger animation
        translateY.value = openUpwards ? 10 : -10;
        opacity.value = 0;

        setTimeout(() => {
          translateY.value = 0;
          opacity.value = 1;
        }, 10);
      }
    }, [triggerButtonPosition, translateY, opacity, isVisible]);

    const menuStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: withSpring(translateY.value) }],
      opacity: withSpring(opacity.value),
    }));

    const handleClose = useCallback(() => {
      if (isVisible) {
        translateY.value = -10;
        opacity.value = 0;
        hideModal();
      }
    }, [onClose, opacity, translateY]);

    const onPressHandler = useCallback(
      (onPress?: () => void) => {
        handleClose();
        onPress?.();
      },
      [handleClose],
    );

    if (!isVisible) return null;

    return (
      <Container onTouchEnd={handleClose}>
        <AnimatedMenu style={[menuStyle, { top: menuPosition.top, left: menuPosition.left }]}>
          {options &&
            options.map((option, index) => (
              <MenuItem key={index} onPress={() => onPressHandler(option?.handler)}>
                {option?.icon && <SVGIcon icon={option?.icon} />}
                <MenuItemTextContainer>
                  <MenuItemText>{option?.text}</MenuItemText>
                </MenuItemTextContainer>
              </MenuItem>
            ))}
        </AnimatedMenu>
      </Container>
    );
  },
);

export default memo(PopupMenu);
