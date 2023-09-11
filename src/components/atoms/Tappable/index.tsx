import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { StyledTouchable } from './styles';

interface TappableProps extends TouchableOpacityProps {
  component?: Element;
  style?: any;
  [x: string]: unknown;
}

const Tappable: React.FC<TappableProps> = ({
  children,
  onPress,
  component,
  ...props
}) => {
  const Touchable = (component || StyledTouchable) as unknown as React.FC<any>;

  return (
    <Touchable onPress={onPress} {...props}>
      {children}
    </Touchable>
  );
};

export default Tappable;

Tappable.defaultProps = {
  component: undefined,
  style: {},
};
