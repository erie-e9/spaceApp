import React, { memo, ReactElement, forwardRef, Fragment } from 'react';
import Step from './components/Step';
import { StepContainer } from './styles';

interface Props {
  children: ReactElement[] | any[];
  currentStepIndex: string | number;
  stepsLength?: number;
  submitButtonTitle?: string;
  submitButtonHandler: () => void;
  prevStepButtonTitle?: string;
  prevStepButtonHandler?: () => void;
  nextStepButtonTitle?: string;
  nextStepButtonDisabled?: boolean;
  nextStepButtonHandler?: () => void;
  extraElementLastStep?: React.ReactNode | JSX.Element;
}

interface MultiStepProps extends React.FC<Props> {
  Step: typeof Step;
}

const MultiStepBase: React.FC<Props> = ({
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
                currentIndex: currentStepIndex,
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
  forwardRef((props: Props, ref) => <MultiStepBase ref={ref} {...props} />),
) as unknown as MultiStepProps;

MultiStep.Step = Step;

export default MultiStep;
