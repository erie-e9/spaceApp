import React, { memo } from 'react';
import { screen_width } from '@utils/functions';
import {
  StepContainer,
  ButtonsContainer,
  ButtonContainer,
  StyledButton,
  StyledScrollView,
} from '../styles';

export const Step = (props: any) => {
  const buttonSize =
    (!props.nextStepButtonHandler && !props.prevStepButtonHandler) ||
    props.itemsLength === 1 ||
    props.currentIndex === 0
      ? '100%'
      : '50%';

  return (
    <StepContainer>
      <StyledScrollView>{props.children}</StyledScrollView>
      <>{props.extraElementLastStep && props.isLast && props.extraElementLastStep}</>
      <ButtonsContainer>
        {props.itemsLength > 1 && props.currentIndex > 0 && props.prevStepButtonHandler && (
          <>
            <StyledButton
              testID={'prevStepperButtonID'}
              title={props.prevStepButtonTitle || 'Previous'}
              onPress={props.prevStepButtonHandler}
              onPressAsync={props.prevStepButtonHandler}
              onPressType="onPressIn"
              textTransform={props.prevStepButtonTextTransform || 'capitalize'}
              loading={props.prevStepButtonloading || false}
              disabled={props.prevStepButtonDisabled || false}
              backgroundColor={props.prevStepButtonBackgroundColor || undefined}
              remoteFeatureFlags={props.prevStepButtonFeatureFlags || []}
              widthButton={buttonSize}
            />
          </>
        )}
        <>
          {props.isLast ? (
            <StyledButton
              testID={'submitStepperButtonID'}
              title={props.submitButtonTitle || 'Finish'}
              onPress={props.submitButtonHandler}
              // onPressAsync={props.submitButtonHandler}
              onPressType="onPressIn"
              textTransform={props.submitButtonTextTransform || 'capitalize'}
              loading={props.submitButtonLoading || false}
              disabled={props.submitButtonDisabled || false}
              backgroundColor={props.submitButtonBackgroundColor || undefined}
              remoteFeatureFlags={props.submitButtonFeatureFlags || []}
              widthButton={buttonSize}
            />
          ) : (
            <>
              {props.nextStepButtonHandler && (
                <StyledButton
                  testID={'nextStepperButtonID'}
                  title={props.nextStepButtonTitle || 'Next'}
                  onPress={props.nextStepButtonHandler}
                  onPressAsync={props.nextStepButtonHandler}
                  onPressType="onPressIn"
                  textTransform={props.nextStepButtonTextTransform || 'capitalize'}
                  loading={props.nextStepButtonLoading || false}
                  disabled={props.nextStepButtonDisabled || false}
                  backgroundColor={props.nextStepButtonBackgroundColor || undefined}
                  remoteFeatureFlags={props.nextStepButtonFeatureFlags || []}
                  widthButton={buttonSize}
                />
              )}
            </>
          )}
        </>
      </ButtonsContainer>
    </StepContainer>
  );
};

export default memo(Step);
