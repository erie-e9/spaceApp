import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import truncate from 'lodash/truncate';
import { useCopy } from '@services';
import { PrivateParamsList } from '@navigators/Private';
import { ApplicationStackParamList } from '@types';
import { testProperties } from '@utils/functions';
import { Dropdown } from '@components/molecules';
import { DatePicker } from '@components/organisms';
import { CallToAction } from '@components/templates';
import { useTask } from './hooks/useTask';
import {
  BodyContainer,
  StyledInput,
  StyledScrollView,
  FeatureButton,
  FeaturesContainer,
  RowItemContainer,
  RowContainer,
} from './styles';

export interface TaskProps {
  navigation: StackNavigationProp<PrivateParamsList>;
  route: RouteProp<ApplicationStackParamList, 'Task'>;
}

export const Task: React.FC<TaskProps> = ({ navigation, route }) => {
  const useTaskHook = useTask({ navigation, route });
  const id = route?.params?.task?.id;
  const { getCopyValue } = useCopy();

  return (
    <CallToAction
      testID="TaskID"
      title={useTaskHook.taskHeaderTitle}
      description={useTaskHook.taskHeaderDescription}
      numberOfLinesTitle={3}
      backButton
      headerOptions={
        id && (
          <FeaturesContainer>
            <FeatureButton
              onPress={useTaskHook.removeTask}
              type="Icon"
              iconType="svg"
              icon="remove"
              textColor="typography800"
            />
          </FeaturesContainer>
        )
      }
      body={
        <StyledScrollView>
          <BodyContainer testID="TaskBodyID">
            <StyledInput
              {...testProperties('taskTitleInput')}
              label="tasks:Task.controllers.title"
              name={'taskTitleInput'}
              multiline
              required={true}
              value={useTaskHook?.values?.title}
              error={useTaskHook?.errors?.title}
              touched={useTaskHook?.touched?.title}
              onBlur={useTaskHook.handleBlur('title')}
              maxLength={100}
              onChangeText={useTaskHook.handleChange('title')}
              keyboardType={'default'}
              importantForAutofill="yes"
              textContentType={'none'}
              rightIcon="clear"
              autoCorrect={false}
              // onSubmitEditing={submitHandler}
              returnKeyType={'next'}
              returnKeyLabel={'next'}
              enablesReturnKeyAutomatically={true}
            />
            <StyledInput
              {...testProperties('taskDescriptionInput')}
              label="tasks:Task.controllers.description"
              name={'taskDescriptionInput'}
              multiline
              value={useTaskHook?.values?.description}
              error={useTaskHook?.errors?.description}
              touched={useTaskHook?.touched?.description}
              required={false}
              onBlur={useTaskHook.handleBlur('description')}
              maxLength={255}
              onChangeText={useTaskHook.handleChange('description')}
              rightIconHandler={() => useTaskHook.clearInputHandler('description')}
              rightIcon="clear"
              editable={true}
              keyboardType={'default'}
              importantForAutofill="yes"
              textContentType={'none'}
              autoCorrect={false}
              returnKeyType={'send'}
              returnKeyLabel={'send'}
              enablesReturnKeyAutomatically={true}
            />
            <RowContainer>
              <RowItemContainer>
                <Dropdown
                  {...testProperties('taskStatus')}
                  label="tasks:Task.controllers.status"
                  data={useTaskHook?.statusList}
                  description="tasks:Task.controllers.statusDescription"
                  placeholder="tasks:Task.controllers.status"
                  value={useTaskHook?.values?.status}
                  error={useTaskHook?.errors?.status}
                  touched={useTaskHook?.touched?.status}
                  bottomSheet={true}
                  dropdownHeight={300}
                  width="100%"
                  onSelect={useTaskHook.handleChange('status')}
                />
              </RowItemContainer>
              <RowItemContainer>
                <DatePicker
                  {...testProperties('taskDatePicker')}
                  mode="calendar"
                  label={truncate(getCopyValue('tasks:Task.controllers.dueDate'), {
                    length: 17,
                    omission: '...',
                  })}
                  title="tasks:Task.controllers.dueDate"
                  description="tasks:Task.controllers.dueDateDescription"
                  placeholder={truncate(getCopyValue('tasks:Task.controllers.dueDate'), {
                    length: 17,
                    omission: '...',
                  })}
                  value={useTaskHook?.values?.due_date}
                  error={useTaskHook?.errors?.due_date}
                  touched={useTaskHook?.touched?.due_date}
                  onSelect={useTaskHook.handleChange('due_date')}
                  maxDate={useTaskHook.maxDateDueDate}
                  minDate={useTaskHook.minDateDueDate}
                  rightIconHandler={() => useTaskHook.clearInputHandler('due_date')}
                />
              </RowItemContainer>
            </RowContainer>
          </BodyContainer>
        </StyledScrollView>
      }
      primaryButton={useTaskHook.primaryButton}
    />
  );
};

export default memo(Task);
