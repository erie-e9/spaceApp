import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/core';
import { type ApplicationScreenProps, type ApplicationStackParamList } from '@types';
import { useFieldEditor } from './hooks/useFieldEditor';
import { MultiStepper } from '@components/templates';

export interface FieldEditorProps {
  navigation: ApplicationScreenProps;
  route: RouteProp<ApplicationStackParamList, 'FieldEditor'>;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ navigation, route }) => {
  const useFieldEditorHook = useFieldEditor({ navigation, route });

  return (
    <MultiStepper
      testID="FieldEditorID"
      numberOfLinesTitle={3}
      showProgress={false}
      backButton
      bodyTestID="FieldEditorBodyID"
      hookHandler={useFieldEditorHook}
      steps={useFieldEditorHook.steps}
      currentStepIndex={0}
      values={useFieldEditorHook.values}
      errors={useFieldEditorHook.errors}
      touched={useFieldEditorHook.touched}
      submitButtonTitle={useFieldEditorHook.submitButtonTitle}
      submitButtonHandler={useFieldEditorHook.onSubmitHandler}
    />
  );
};

export default memo(FieldEditor);
