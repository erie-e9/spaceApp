import React, { Fragment, memo, useMemo } from 'react';
import { useResponseHandler } from '@hooks';
import { StepContainer, ButtonsContainer, StyledButton, StyledScrollView } from '../styles';
import type { MultiStepProps } from '../index';

interface StepsProps extends MultiStepProps {
  currentStepIndex: number;
  itemsLength: number;
}

export const Step: React.FC<StepsProps> = ({
  children,
  currentStepIndex,
  itemsLength,
  isLast,
  submitButtonTitle,
  submitButtonTextTransform,
  submitButtonLoading,
  submitButtonDisabled,
  submitButtonBackgroundColor,
  submitButtonFeatureFlags,
  submitButtonHandler,
  prevStepButtonTitle,
  prevStepButtonTextTransform,
  prevStepButtonloading,
  prevStepButtonDisabled,
  prevStepButtonBackgroundColor,
  prevStepButtonFeatureFlags,
  prevStepButtonHandler,
  nextStepButtonTextTransform,
  nextStepButtonLoading,
  nextStepButtonBackgroundColor,
  nextStepButtonFeatureFlags,
  nextStepButtonTitle,
  nextStepButtonDisabled,
  nextStepButtonHandler,
  extraElementLastStep,
}) => {
  const { loading } = useResponseHandler();
  const buttonSize = useMemo(() => {
    return (!nextStepButtonHandler && !prevStepButtonHandler) ||
      itemsLength === 1 ||
      currentStepIndex === 0
      ? '100%'
      : '50%';
  }, [currentStepIndex, itemsLength, nextStepButtonHandler, prevStepButtonHandler]);

  return (
    <StepContainer>
      <StyledScrollView>{children}</StyledScrollView>
      <Fragment>{extraElementLastStep && isLast && extraElementLastStep}</Fragment>
      <ButtonsContainer>
        {itemsLength > 1 && currentStepIndex > 0 && prevStepButtonHandler && !loading && (
          <Fragment>
            <StyledButton
              testID={'prevStepperButtonID'}
              title={prevStepButtonTitle || 'Previous'}
              onPress={prevStepButtonHandler}
              onPressAsync={prevStepButtonHandler}
              onPressType="onPressIn"
              textTransform={prevStepButtonTextTransform || 'capitalize'}
              loading={prevStepButtonloading || false}
              disabled={prevStepButtonDisabled || false}
              backgroundColor={prevStepButtonBackgroundColor || undefined}
              remoteFeatureFlags={prevStepButtonFeatureFlags || []}
              widthButton={buttonSize}
            />
          </Fragment>
        )}
        <Fragment>
          {isLast ? (
            <StyledButton
              testID={'submitStepperButtonID'}
              title={submitButtonTitle || 'Finish'}
              onPress={submitButtonHandler}
              onPressAsync={submitButtonHandler}
              onPressType="onPressIn"
              textTransform={submitButtonTextTransform || 'capitalize'}
              loading={submitButtonLoading || loading || false}
              disabled={submitButtonDisabled || loading || false}
              backgroundColor={submitButtonBackgroundColor || undefined}
              remoteFeatureFlags={submitButtonFeatureFlags || []}
              widthButton={!loading ? buttonSize : undefined}
            />
          ) : (
            <Fragment>
              {nextStepButtonHandler && (
                <StyledButton
                  testID={'nextStepperButtonID'}
                  title={nextStepButtonTitle || 'Next'}
                  onPress={nextStepButtonHandler}
                  onPressAsync={nextStepButtonHandler}
                  onPressType="onPressIn"
                  textTransform={nextStepButtonTextTransform || 'capitalize'}
                  loading={nextStepButtonLoading || false}
                  disabled={nextStepButtonDisabled || false}
                  backgroundColor={nextStepButtonBackgroundColor || undefined}
                  remoteFeatureFlags={nextStepButtonFeatureFlags || []}
                  widthButton={buttonSize}
                />
              )}
            </Fragment>
          )}
        </Fragment>
      </ButtonsContainer>
    </StepContainer>
  );
};

export default memo(Step);
