import React, { useEffect, useRef, memo, Fragment } from 'react';
import { Animated } from 'react-native';
import { Container, RadioItem, Touchable, StyledText } from './styles';

interface RadioProps {
  size: number;
  color: string;
  onChange: () => void;
  activated: boolean;
  title: string;
}

export const Radio: React.FC<RadioProps> = memo(({ size, color, onChange, activated, title }) => {
  const animation = useRef(new Animated.Value(activated ? 1 : 0)).current;

  useEffect(() => {
    if (activated) {
      Animated.timing(animation, {
        duration: 200,
        toValue: 1,
        //   easing: Easing.materialUIStandard,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        duration: 200,
        toValue: 0,
        //   easing: Easing.materialUIStandard,
        useNativeDriver: true,
      }).start();
    }
  }, [activated, animation]);

  return (
    <Container>
      <Touchable onPress={onChange}>
        <Fragment>
          <RadioItem activated={activated} size={size} color={color}>
            <Animated.View
              style={[
                {
                  height: size - 4,
                  width: size - 4,
                  borderRadius: size / 2,
                  backgroundColor: activated ? color : 'transparent',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  transform: [
                    {
                      scaleX: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                    {
                      scaleY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          </RadioItem>
          <StyledText type="Caption">{title}</StyledText>
        </Fragment>
      </Touchable>
    </Container>
  );
});

export default Radio;
