import React, { memo, ReactElement, forwardRef, Fragment } from 'react';
import Step from './components/Step';
import { StepContainer } from './styles';
import { TouchableProps } from '@utils/types/buttons';

export interface MultiStepProps extends Partial<TouchableProps> {
  children: ReactElement[] | any[];
  isLast?: boolean;
  submitButtonTitle?: string;
  submitButtonTextTransform?: string;
  submitButtonLoading?: string;
  submitButtonDisabled?: string;
  submitButtonBackgroundColor?: string;
  submitButtonFeatureFlags?: string;
  submitButtonHandler: () => void;
  prevStepButtonTitle?: string;
  prevStepButtonTextTransform?: string;
  prevStepButtonloading?: string;
  prevStepButtonDisabled?: string;
  prevStepButtonBackgroundColor?: string;
  prevStepButtonFeatureFlags?: string;
  prevStepButtonHandler?: () => void;
  nextStepButtonTextTransform?: string;
  nextStepButtonLoading?: string;
  nextStepButtonBackgroundColor?: string;
  nextStepButtonFeatureFlags?: string;
  nextStepButtonTitle?: string;
  nextStepButtonDisabled?: boolean;
  nextStepButtonHandler?: () => void;
  extraElementLastStep?: React.ReactNode | JSX.Element;
}

interface Props extends React.FC<MultiStepProps> {
  Step: typeof Step;
}

const MultiStepBase: React.FC<MultiStepProps> = ({
  children,
  currentStepIndex,
  submitButtonTitle,
  submitButtonHandler,
  prevStepButtonTitle,
  prevStepButtonHandler,
  nextStepButtonTitle,
  nextStepButtonDisabled,
  nextStepButtonHandler,
  extraElementLastStep,
}) => {
  return (
    <StepContainer>
      {React.Children.map(children, (element, i) => {
        if (i === currentStepIndex) {
          return (
            <Fragment>
              {React.cloneElement(element, {
                itemsLength: children.length,
                currentStepIndex: currentStepIndex,
                isLast: currentStepIndex === children.length - 1,
                submitButtonTitle,
                submitButtonHandler,
                prevStepButtonTitle,
                prevStepButtonHandler,
                nextStepButtonTitle,
                nextStepButtonDisabled,
                nextStepButtonHandler,
                extraElementLastStep,
              })}
            </Fragment>
          );
        }
        return null;
      })}
    </StepContainer>
  );
};

const MultiStep = memo(
  forwardRef((props: any, ref) => <MultiStepBase ref={ref} {...props} />),
) as unknown as Props;

MultiStep.Step = Step;

MultiStepBase.displayName = 'MultiStepBase';
export default MultiStep;
