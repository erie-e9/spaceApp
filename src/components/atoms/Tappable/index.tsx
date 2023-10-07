import React, { memo } from 'react';
import { PressableProps } from 'react-native';
import { StyledTouchable } from './styles';

interface TappableProps extends PressableProps {
  testID?: string;
  component?: Element;
  style?: any;
  [x: string]: unknown;
}

export const Tappable: React.FC<TappableProps> = ({
  testID,
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
      testID={testID}
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

Tappable.defaultProps = {
  testID: 'TappableID',
  component: undefined,
  style: {},
};

export default memo(Tappable);
