import { memo } from 'react';
import { useResponseHandler } from '@hooks';
import { StepContainer, ButtonsContainer, StyledButton, StyledScrollView } from '../styles';

export const Step = (props: any) => {
  const { loading } = useResponseHandler();
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
        {props.itemsLength > 1 &&
          props.currentIndex > 0 &&
          props.prevStepButtonHandler &&
          !loading && (
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
              loading={props.submitButtonLoading || loading || false}
              disabled={props.submitButtonDisabled || loading || false}
              backgroundColor={props.submitButtonBackgroundColor || undefined}
              remoteFeatureFlags={props.submitButtonFeatureFlags || []}
              widthButton={!loading ? buttonSize : undefined}
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
