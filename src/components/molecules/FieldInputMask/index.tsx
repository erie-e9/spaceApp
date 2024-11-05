import React, { ReactNode, memo, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { type CommonControllerProps } from '@types';
import { TransformAnimation } from '@components/animated';
import { Tooltip } from '@components/atoms';
import {
  TextInputContainer,
  Wrapper,
  LabelColorAnimationContainer,
  StyledText,
  CounterColorAnimationContainer,
  FooterContainer,
  ErrorContainer,
} from './styles';

export interface Props extends Partial<CommonControllerProps> {
  children: ReactNode;
  value?: string;
  focused?: boolean;
  backgroundLabel?: string;
  characterCounter?: string;
  footerComponent?: ReactNode;
  style?: StyleProp<ViewStyle>;
  heightExpansible?: boolean;
}

const FieldInputMask: React.FC<Props> = ({
  testID = 'FieldInputMaskID',
  value,
  required,
  label,
  maintainFocus,
  error,
  touched,
  backgroundLabel,
  editable,
  children,
  focused,
  characterCounter,
  footerComponent,
  heightExpansible,
  style,
}) => {
  const hasValue = value !== null && value !== '';

  const showError = useMemo(() => {
    return value === '' && touched && !!error;
  }, [touched, value, error]);

  return (
    <TextInputContainer style={style}>
      {(focused || hasValue) && (
        <TransformAnimation
          trigger={focused || hasValue}
          duration={100}
          initialXValue={0}
          finalXValue={0}
          initialYValue={15}
          finalYValue={-3}
          repeat={1}
          style={{ zIndex: 1000 }}
        >
          <LabelColorAnimationContainer>
            <StyledText
              type="Label"
              focused={focused || maintainFocus}
              error={showError}
              backgroundLabel={backgroundLabel}
              hasValue={hasValue}
              editable={editable}
              touched={touched}
            >
              {label}
              {required && '*'}
            </StyledText>
          </LabelColorAnimationContainer>
        </TransformAnimation>
      )}
      <Wrapper
        testID={`${testID}-wrapper`}
        editable={editable}
        touched={touched}
        focused={focused || !!value}
        error={showError || false}
        hasValue={hasValue}
        maintainFocus={maintainFocus}
        heightExpansible={heightExpansible}
      >
        {children}
      </Wrapper>
      {focused && characterCounter && (
        <CounterColorAnimationContainer>
          <StyledText
            type="Label"
            focused={focused || maintainFocus}
            error={showError}
            backgroundLabel={backgroundLabel}
            hasValue={hasValue}
            editable={editable}
            touched={touched}
          >
            {characterCounter}
          </StyledText>
        </CounterColorAnimationContainer>
      )}
      <FooterContainer>
        {showError && error && (
          <ErrorContainer>
            <Tooltip visible message={error} duration={3000000} />
          </ErrorContainer>
        )}
        {footerComponent && footerComponent}
      </FooterContainer>
    </TextInputContainer>
  );
};

export default memo(FieldInputMask);
