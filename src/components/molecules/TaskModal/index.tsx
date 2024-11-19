import React, { memo, useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import { type Task } from '@utils/types';
import { testProperties } from '@utils/functions';
import { MultimediaPicker } from '@components/organisms';
import { ContentWrapper, StyledInput } from './styles';

interface TaskModalParams extends Task {
  handleTask: (item: Task) => Promise<void>;
}

const TaskModal = ({ handleTask, title, description, id }: TaskModalParams): JSX.Element => {
  const [_title, setTitle] = useState(title || '');
  const [_description, setDescription] = useState(description || '');

  const quantityLimit = 255;
  const limitExceeded = title.length > quantityLimit;

  const submitHandler = useCallback(() => {
    Keyboard.dismiss();
    handleTask({
      id,
      title: _title,
      description: _description,
    });
  }, [_title, _description]);

  return (
    <ContentWrapper>
      <StyledInput
        {...testProperties('task-title-input')}
        label={'Title'}
        name={'Title'}
        multiline
        required={true}
        value={_title}
        // onChangeText={(text: string) => seValues({ ...values, title: text })}
        onChangeText={setTitle}
        maxLength={255}
        keyboardType={'default'}
        importantForAutofill="yes"
        textContentType={'none'}
        rightIcon="clear"
        autoCorrect={false}
        onSubmitEditing={submitHandler}
        returnKeyType={'send'}
        returnKeyLabel={'send'}
        enablesReturnKeyAutomatically={true}
      />
      <StyledInput
        {...testProperties('task-description-input')}
        label={'Description'}
        name={'taskDescriptionInput'}
        multiline
        required={false}
        value={_description}
        onChangeText={setDescription}
        // onChangeText={(text: string) => seValues({ ...values, description: text })}
        maxLength={255}
        keyboardType={'default'}
        importantForAutofill="no"
        textContentType={'none'}
        rightIcon="clear"
        autoCorrect={false}
        onSubmitEditing={submitHandler}
        returnKeyType={'send'}
        returnKeyLabel={'send'}
        enablesReturnKeyAutomatically={true}
      />
      <>
        {/* <Title type="Body2">Add image(s)</Title> */}
        <MultimediaPicker
          origin="library"
          selectionLimit={5}
          onSelect={(items) => console.log('TaskModal', { items })}
        />
      </>
    </ContentWrapper>
  );
};

export default memo(TaskModal);
