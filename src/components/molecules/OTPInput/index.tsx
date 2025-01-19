import React, { useState, useRef, memo, useCallback, useMemo, useEffect } from 'react';
import { TextInput } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { testProperties } from '@utils/functions';
import { useModal } from '@hooks';
import { InputContainer, StyledTextInput, OtpInputContainer } from './styles';

export interface OTPInputProps {
  testID?: string;
  length: number;
  onSuccess: (value: string) => void;
  error?: string;
  code?: string;
}

const OTPInput = ({ testID, length = 4, onSuccess, error, code }: OTPInputProps) => {
  const { hideModal } = useModal();
  const theme = useTheme();
  const [otp, setOtp] = useState<Array<string>>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const inputs = useRef<TextInput[]>([]);
  const shakeAnimation = useSharedValue(0);
  const [isError, setIsError] = useState(!!error);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChangeText = (text: string, index: number) => {
    if (text.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = text;

      for (let i = index + 1; i < length; i++) {
        newOtp[i] = '';
      }
      setOtp(newOtp);

      if (index < length - 1) {
        inputs.current[index + 1].focus();
      } else {
        const enteredOtp = newOtp.join('');
        validateOtp(enteredOtp);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      setIsError(false);
      for (let i = index + 1; i < length; i++) {
        newOtp[i] = '';
      }
      setOtp(newOtp);
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const validateOtp = useCallback(
    async (enteredOtp: string) => {
      if (enteredOtp === code) {
        onSuccess(enteredOtp);
        hideModal();
      } else {
        setIsError(true);
        shakeInputs();
      }
    },
    [onSuccess, hideModal],
  );

  const shakeInputs = () => {
    shakeAnimation.value = withSequence(
      withTiming(-10, { duration: 50, easing: Easing.linear }),
      withTiming(10, { duration: 50, easing: Easing.linear }),
      withTiming(-10, { duration: 50, easing: Easing.linear }),
      withTiming(10, { duration: 50, easing: Easing.linear }),
      withTiming(0, { duration: 50, easing: Easing.linear }),
    );
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeAnimation.value }],
    };
  });

  return (
    <OtpInputContainer {...testProperties(testID || 'OTPInputID')}>
      {otp.map((digit, index) => (
        <InputContainer key={index} style={animatedStyles}>
          <StyledTextInput
            ref={(el) => (inputs.current[index] = el!)}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            selectionColor={theme.tokens.colors.typography800}
            onFocus={() => {
              const newOtp = [...otp];
              newOtp[index] = '';
              setOtp(newOtp);
              setFocusedIndex(index);
            }}
            onBlur={() => setFocusedIndex(null)}
            error={isError && otp.join('').length === length}
            focused={focusedIndex === index}
            textContentType="oneTimeCode"
            cursorColor="secondary950"
          />
        </InputContainer>
      ))}
    </OtpInputContainer>
  );
};

export default memo(OTPInput);
