import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {Animated} from 'react-native';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;
const LoaderContainer = styled.View`
  width: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Ball = styled.View`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-radius: ${(props) => props.size / 2};
  background-color: ${(props) => props.color};
`;

const Loader = ({color, size}) => {
  const animations = {
    one: new Animated.Value(0),
    two: new Animated.Value(0),
    three: new Animated.Value(0),
  };

  useEffect(() => {
    onStartAnimation();
  }, []);

  const onAnimated = (animation, nextAnimation) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: -10,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(nextAnimation, 180);
  };

  const onStartAnimation = () => {
    const twoAnimation = () => {
      onAnimated(animations.two, threeAnimation);
    };

    const threeAnimation = () => {
      onAnimated(animations.three, onStartAnimation);
    };

    onAnimated(animations.one, twoAnimation);
  };

  return (
    <Root>
      <LoaderContainer>
        <Animated.View style={{transform: [{translateY: animations.one}]}}>
          <Ball color={color} size={size} />
        </Animated.View>
        <Animated.View style={{transform: [{translateY: animations.two}]}}>
          <Ball color={color} size={size} />
        </Animated.View>
        <Animated.View style={{transform: [{translateY: animations.three}]}}>
          <Ball color={color} size={size} />
        </Animated.View>
      </LoaderContainer>
    </Root>
  );
};

export default React.memo(Loader);
