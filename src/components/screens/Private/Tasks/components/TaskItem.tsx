import React, { memo, useCallback, useMemo } from 'react';
import { Easing, FadeIn, LinearTransition } from 'react-native-reanimated';
import truncate from 'lodash/truncate';
import { testProperties } from '@utils/functions';
import { dayjs } from '@utils/formatters';
import { labels } from '@utils/forms/labels';
import type { Task } from '@types';
import {
  TaskItemButton,
  TaskContentContainer,
  TaskContentData,
  TaskDescriptionText,
  TaskItemContainer,
  TaskTitleText,
  CreatedAtContainer,
  CreatedAtText,
  DueDateText,
  DueDateContainer,
} from './styles';

export interface TaskItemProps {
  testID?: string;
  item: Task;
  itemHeight?: number | undefined;
  rightContent?: string;
  onPress?: ((item: any) => void) | undefined;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  testID,
  item,
  itemHeight,
  rightContent,
  onPress,
}) => {
  const { undefinedStatus, pendingStatus, inProgressStatus, completeStatus } = labels();

  const onPressHandler = useCallback(() => {
    if (item) onPress?.(item);
  }, [item]);

  const formattedCreatedAt = useMemo(() => {
    return item?.created_at ? `${dayjs(item.created_at).fromNow(true)}` : '';
  }, [item?.created_at]);

  const formattedDueDate = useMemo(() => {
    return item?.due_date ? `${dayjs(item?.due_date).fromNow(true)}` : '';
  }, [item?.due_date]);

  const statusTask = useMemo(() => {
    return {
      0: undefinedStatus,
      1: pendingStatus,
      2: inProgressStatus,
      3: completeStatus,
    };
  }, [item?.status]);

  const animatedProps = {
    // layout: LinearTransition.easing(Easing.ease),
    entering: FadeIn.duration(600),
  };

  return (
    <TaskItemContainer {...testProperties(testID || 'TaskItemID')} itemHeight={itemHeight}>
      <TaskItemButton onPress={onPressHandler}>
        <TaskContentContainer isComplete={item?.status === 3}>
          <TaskContentData>
            <TaskTitleText {...animatedProps} isComplete={item?.status === 3} color="typography950">
              {item?.title}
            </TaskTitleText>
            {item?.description && (
              <TaskDescriptionText
                {...animatedProps}
                color="typography700"
                type="Caption"
                isComplete={item?.status === 3}
              >
                {truncate(item?.description, {
                  length: 40,
                  omission: '...',
                })}
              </TaskDescriptionText>
            )}
            {item?.status >= 0 && (
              <CreatedAtContainer>
                <CreatedAtText {...animatedProps} type="Label" color="typography950">
                  {statusTask[item?.status || 0]}
                </CreatedAtText>
              </CreatedAtContainer>
            )}
          </TaskContentData>
          <DueDateContainer>
            {item?.created_at && (
              <CreatedAtText {...animatedProps} type="Label">
                {formattedCreatedAt}
              </CreatedAtText>
            )}
            {(rightContent || formattedDueDate) && (
              <DueDateText {...animatedProps} type="Label" color="typography700">
                {rightContent || formattedDueDate}
              </DueDateText>
            )}
          </DueDateContainer>
        </TaskContentContainer>
      </TaskItemButton>
    </TaskItemContainer>
  );
};

export default memo(TaskItem);
