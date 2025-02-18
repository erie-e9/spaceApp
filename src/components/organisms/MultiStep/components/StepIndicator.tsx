import React, { Fragment, memo, useEffect } from 'react';
import { DefaultTheme } from 'styled-components';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {
  CirclePoint,
  Container,
  StyledText,
  TouchablePoints,
  ProgressBarContainer,
  ProgressBarBackground,
  ProgressBarFill,
} from '../styles';

interface Props {
  position?: number;
  size?: number;
  color?: string | keyof DefaultTheme['tokens']['colors'];
  currentStepIndex: number;
  direction?: string;
  showNumberPosition?: boolean;
  onChange?: () => void;
  totalSteps: number;
  stepIndicatorStyle?: 'Primary' | 'Secondary';
}

export const StepIndicator: React.FC<Props> = ({
  position,
  size,
  color,
  currentStepIndex,
  direction,
  showNumberPosition = false,
  onChange,
  totalSteps,
  stepIndicatorStyle = 'Primary',
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming((currentStepIndex - 1) / totalSteps, {
      duration: 500,
    });
  }, [currentStepIndex, progress, totalSteps]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  if (totalSteps === 1) {
    return;
  }

  return (
    <Container direction={direction} width={stepIndicatorStyle === 'Primary' ? '10px' : '30%'}>
      <TouchablePoints onPress={onChange}>
        <Fragment>
          {stepIndicatorStyle === 'Primary' ? (
            Array.from({ length: totalSteps }).map((_, index) => (
              <CirclePoint
                key={index}
                activated={currentStepIndex - 1 >= index}
                isFilled={currentStepIndex - 1 <= index}
                size={size}
                color={color}
              >
                {showNumberPosition && <StyledText type="Label">{String(position)}</StyledText>}
              </CirclePoint>
            ))
          ) : (
            <ProgressBarContainer>
              <ProgressBarBackground>
                <ProgressBarFill style={animatedStyle} color={color} />
              </ProgressBarBackground>
            </ProgressBarContainer>
          )}
        </Fragment>
      </TouchablePoints>
    </Container>
  );
};

export default memo(StepIndicator);
