import React from 'react';
import { PressableProps } from 'react-native';
import { StyledTouchable } from './styles';

interface TappableProps extends PressableProps {
  component?: Element;
  style?: any;
  [x: string]: unknown;
}

const Tappable: React.FC<TappableProps> = ({
  children,
  style,
  onPress,
  onLongPress,
  component,
  ...props
}) => {
  const Touchable = (component || StyledTouchable) as unknown as React.FC<any>;
  return (
    <Touchable
      style={style[0]}
      onPress={(event: any) => {
        if (onPress) {
          onPress(event);
        }
      }}
      onLongPress={onLongPress}
      {...props}
    >
      {children}
    </Touchable>
  );
};

export default Tappable;

Tappable.defaultProps = {
  component: undefined,
  style: {},
};
