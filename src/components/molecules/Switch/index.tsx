import React, { memo, useCallback, Fragment, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { DefaultTheme } from 'styled-components/native';
import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Tooltip } from '@components/atoms';
import {
  Container,
  StyledAnimatedContainer,
  StyledSwitch,
  IndicatorContainer,
  StyledText,
  DescriptionContainer,
} from './styles';

interface SwitchProps {
  name: string;
  label?: string;
  error?: string;
  activated: boolean;
  color?: keyof DefaultTheme['tokens']['colors'];
  borderColor?: keyof DefaultTheme['tokens']['colors'];
  size?: number;
  showIndicators?: boolean;
  onChange: (value: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  error,
  activated,
  color,
  borderColor,
  size = 20,
  showIndicators = true,
  onChange,
}) => {
  const animation = useSharedValue(activated ? 1 : 0);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: animation.value === 1 || activated ? 1 : 0.6,
      transform: [
        {
          translateX: withTiming(animation.value === 1 ? size - 1 : 0 + 1, {
            duration: 200,
            easing: Easing.linear,
          }),
        },
      ],
    }),
    [animation.value, activated],
  );

  const handlePress = useCallback(() => {
    onChange(!activated);
  }, [onChange, activated]);

  useEffect(() => {
    animation.value = !activated ? 0 : 1;
  }, [animation.value, activated]);

  return (
    <Container>
      {label && (
        <DescriptionContainer>
          <StyledText type="Subtitle2" font="Primary" color="typography100" textAlign="justify">
            {name}
          </StyledText>
        </DescriptionContainer>
      )}
      <TouchableWithoutFeedback onPress={handlePress}>
        <Fragment>
          <StyledSwitch borderColor={borderColor} size={size}>
            <StyledAnimatedContainer color={color} size={size} style={[animatedStyle]} />
            {showIndicators && (
              <IndicatorContainer size={size}>
                <StyledText type="Caption" style={{ fontSize: size / 1.5 || 0 }}>
                  o
                </StyledText>
                <StyledText type="Caption" style={{ fontSize: size / 1.5 || 0 }}>
                  |
                </StyledText>
              </IndicatorContainer>
            )}
          </StyledSwitch>
          {error && <Tooltip visible message={error} duration={3000} />}
        </Fragment>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default memo(Switch);
