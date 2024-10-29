import React, { memo, useMemo } from 'react';
import { testProperties } from '@utils/functions';
import { HeaderTemplate, ScreenBackground } from '@components/atoms';
import { Dropdown, Switch, TextInput } from '@components/molecules';
import { MultiStep, DatePicker, ButtonImagePicker } from '@components/organisms';
import StepIndicator from '@components/organisms/MultiStep/components/StepIndicator';
import { PointsContainer } from '@components/organisms/MultiStep/styles';
import { StyledContainer, BodyContainer, StepContainer, StepItemContainer } from './styles';
import { useTheme } from '@hooks';

export interface StepsProps {
  title: string;
  description: string;
  items: Array<any>;
}

interface Props {
  testID?: string;
  steps: Array<StepsProps>;
  adjustsFontTitle?: boolean;
  numberOfLinesTitle?: number;
  bodyTestID?: string;
  hookHandler: any;
  backButton?: boolean;
  nextStepButtonDisabled?: boolean;
  values: Record<string, any>;
  touched?: Record<string, boolean>;
  errors?: Record<string, any>;
  showProgress?: boolean;
  currentStepIndex: number;
  submitButtonTitle?: string;
  extraElementLastStep?: React.ReactNode | JSX.Element;
  submitButtonHandler: () => void;
  prevStepButtonHandler?: () => void;
  nextStepButtonHandler?: () => void;
}

const MultiStepper: React.FC<Props> = ({
  testID = 'MultiStepperID',
  steps = [],
  adjustsFontTitle = false,
  numberOfLinesTitle = 1,
  bodyTestID = 'MultiStepperBodyID',
  hookHandler,
  backButton = false,
  nextStepButtonDisabled,
  values,
  touched,
  errors,
  showProgress = true,
  currentStepIndex,
  submitButtonHandler,
  submitButtonTitle,
  prevStepButtonHandler,
  nextStepButtonHandler,
  extraElementLastStep,
}) => {
  const { Images } = useTheme();
  const headerLabels = useMemo(() => {
    return {
      title: steps[currentStepIndex]?.title,
      description: steps[currentStepIndex]?.description,
    };
  }, [currentStepIndex]);

  return (
    <ScreenBackground
      testID={testID}
      type="solid"
      // colors={['#51506b', '#181725', '#181725', '#06060a']}
      colors={['#66768a', '#253e3f', '#172325', '#060a0a']}
      layerOpacity={1}
      backgroundType="image"
      backgroundSource={Images.wallpapers.background1}
    >
      <StyledContainer {...testProperties(testID)}>
        {steps.length > 0 && (
          <HeaderTemplate
            title={headerLabels.title}
            description={headerLabels.description}
            adjustsFontTitle={adjustsFontTitle}
            numberOfLinesTitle={numberOfLinesTitle}
            backButton={backButton}
          />
        )}
        {showProgress && (
          <PointsContainer>
            <StepIndicator
              size={9}
              currentStepIndex={currentStepIndex + 1}
              totalSteps={steps.length}
            />
          </PointsContainer>
        )}
        <BodyContainer testID={bodyTestID}>
          <MultiStep
            currentStepIndex={currentStepIndex}
            prevStepButtonTitle={'signup:SignUp.submitButtons.previousText'}
            nextStepButtonTitle={'signup:SignUp.submitButtons.continueText'}
            submitButtonTitle={submitButtonTitle || 'signup:SignUp.submitButtons.finishText'}
            nextStepButtonDisabled={nextStepButtonDisabled}
            extraElementLastStep={extraElementLastStep}
            prevStepButtonHandler={prevStepButtonHandler}
            nextStepButtonHandler={nextStepButtonHandler}
            submitButtonHandler={submitButtonHandler}
          >
            {steps.map((step, index) => (
              <MultiStep.Step key={index}>
                <StepContainer>
                  <StepItemContainer>
                    {step.items.map((item, i) => {
                      const sharedProps = {
                        key: i,
                        ref: item.ref,
                        label: item.label,
                        name: item.name,
                        value: values[item.name],
                        error: errors?.[item.name],
                        touched: touched?.[item.name],
                        editable: item.editable,
                        required: item.required,
                      };

                      switch (item.type) {
                        case 'textinput':
                          return (
                            <TextInput
                              {...sharedProps}
                              blurOnSubmit={false}
                              secureTextEntry={item.secureTextEntry}
                              maxLength={item?.maxLength}
                              maintainFocus={item.maintainFocus}
                              keyboardType={item.keyboardType}
                              importantForAutofill="yes"
                              showPasswordStrength={item.showPasswordStrength}
                              removeBlankSpaces={item.removeBlankSpaces}
                              editable={item.editable}
                              autoCapitalize={item.autoCapitalize}
                              textContentType={item.textContentType}
                              multiline={item.multiline}
                              rightIcon={item.secureTextEntry ? 'passwordToggle' : 'clear'}
                              onBlur={hookHandler?.handleBlur(item.name)}
                              onChangeText={item.onChange || hookHandler.handleChange(item.name)}
                              rightIconHandler={() =>
                                item.secureTextEntry
                                  ? hookHandler.setShowPassword(!hookHandler.showPassword)
                                  : hookHandler.clearInputHandler(item.name)
                              }
                              autoComplete="off"
                              autoCorrect={item.autoCorrect}
                              onSubmitEditing={item.onSubmitEditing}
                              returnKeyType={item.returnKeyType}
                              returnKeyLabel={item.returnKeyLabel}
                              enablesReturnKeyAutomatically
                            />
                          );
                        case 'dropdown':
                          return (
                            <Dropdown
                              {...sharedProps}
                              data={item.items}
                              placeholder={item.label}
                              bottomSheet={item.bottomSheet}
                              showButton={item.showButton}
                              dropdownHeight={item.dropdownHeight}
                              width="100%"
                              onSelect={hookHandler.handleChange(item.name)}
                            />
                          );
                        case 'switch':
                          return (
                            <Switch
                              {...sharedProps}
                              activated={values[item.name]}
                              color={'primary500'}
                              size={25}
                              showIndicators={!false}
                              onChange={(value) => hookHandler.fieldValueHandler(item.name, value)}
                            />
                          );
                        case 'camera-image':
                          return (
                            <ButtonImagePicker
                              {...sharedProps}
                              placeholder={item.label}
                              origin={item.origin}
                              mediaType={item.mediaType}
                              selectionLimit={item.selectionLimit}
                              onSelect={(value) => hookHandler.fieldValueHandler(item.name, value)}
                            />
                          );
                        case 'date-picker':
                          return (
                            <DatePicker
                              {...sharedProps}
                              placeholder={item.label}
                              onSelect={hookHandler.handleChange(item.name)}
                            />
                          );
                        case 'radiobutton':
                          return <></>;
                        case 'checkbox':
                          return <></>;
                        case 'slider':
                          return <></>;
                        case 'file-selector':
                          return <></>;
                        default:
                          return null;
                      }
                    })}
                  </StepItemContainer>
                </StepContainer>
              </MultiStep.Step>
            ))}
          </MultiStep>
        </BodyContainer>
      </StyledContainer>
    </ScreenBackground>
  );
};

export default memo(MultiStepper);
