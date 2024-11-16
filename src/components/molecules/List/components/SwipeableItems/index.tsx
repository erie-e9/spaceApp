import React, { memo } from 'react';
import { DefaultTheme } from 'styled-components';
import { SharedValue } from 'react-native-reanimated';
import { SVGIcon, type SVGIconProps } from '@components/atoms';
import { SwipeableFullContainer, SwipeButton } from './styles';

export interface SwipeableFullContainerProps {
  backgroundColor?: keyof DefaultTheme['tokens']['colors'];
}

interface Props extends SVGIconProps, SwipeableFullContainerProps {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  onPress: () => void;
}

const SwipeableItems: React.FC<Props> = ({
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
      <SwipeButton onPress={onPress}>
        <SVGIcon icon={icon || 'add'} iconColor={iconColor} opposingColor={opposingColor} />
      </SwipeButton>
    </SwipeableFullContainer>
  );
};

export default memo(SwipeableItems);
