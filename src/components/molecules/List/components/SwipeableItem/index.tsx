import React, { memo } from 'react';
import { DefaultTheme } from 'styled-components/native';
import { SharedValue } from 'react-native-reanimated';
import { SVGIcon, type SVGIconProps } from '@components/atoms';
import { SwipeableFullContainer, SwipeButton } from './styles';

export interface SwipeableContainerProps {
  backgroundColor?: keyof DefaultTheme['tokens']['colors'];
}

interface Props extends SVGIconProps, SwipeableContainerProps {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  onPress: () => void;
}

const SwipeableItem: React.FC<Props> = ({
  prog,
  drag,
  onPress,
  icon,
  iconColor,
  opposingColor,
  backgroundColor,
}) => {
  return (
    <SwipeableFullContainer backgroundColor={backgroundColor}>
      <SwipeButton backgroundColor={backgroundColor} onPress={onPress}>
        <SVGIcon icon={icon || 'add'} iconColor={iconColor} opposingColor={opposingColor} />
      </SwipeButton>
    </SwipeableFullContainer>
  );
};

export default memo(SwipeableItem);
