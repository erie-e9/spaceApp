import { memo, useMemo } from 'react';
import truncate from 'lodash/truncate';
import { testProperties } from '@utils/functions';
import { dayjs } from '@utils/formatters';
import { labels } from '@utils/forms/labels';
import { Task } from '@types';
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
  onPress?: ((item: any) => void) | undefined;
}

export const TaskItem: React.FC<TaskItemProps> = ({ testID, item, itemHeight, onPress }) => {
  const { pendingStatus, inProgressStatus, completeStatus } = labels();
  const formattedCreatedAt = useMemo(() => {
    return `${dayjs(item.created_at).fromNow()}`;
  }, [item.created_at]);

  const formattedDueDate = useMemo(() => {
    return item.due_date ? `${dayjs(item.due_date).fromNow()}` : '';
  }, [item.due_date]);

  const statusTask = useMemo(() => {
    return {
      1: pendingStatus,
      2: inProgressStatus,
      3: completeStatus,
    };
  }, []);

  return (
    <TaskItemContainer {...testProperties(testID || 'TaskItemID')} itemHeight={itemHeight}>
      <TaskItemButton onPress={() => onPress?.(item)}>
        <TaskContentContainer isComplete={item.status === 3}>
          <TaskContentData>
            <TaskTitleText color="typography900" isComplete={item.status === 3}>
              {item.id} | {item.title}
            </TaskTitleText>
            <TaskDescriptionText color="typography900" isComplete={item.status === 3}>
              {truncate(item.description, {
                length: 45,
                omission: '...',
              })}
            </TaskDescriptionText>
            {item.status && item.status > 0 && (
              <CreatedAtContainer>
                <CreatedAtText type="Label" color="typography600">
                  {statusTask[item?.status || 1]}
                </CreatedAtText>
              </CreatedAtContainer>
            )}
          </TaskContentData>
          {item.created_at && (
            <DueDateContainer>
              <CreatedAtText type="Label">{formattedCreatedAt}</CreatedAtText>
              <DueDateText type="Label" color="typography600">
                {formattedDueDate}
              </DueDateText>
            </DueDateContainer>
          )}
        </TaskContentContainer>
      </TaskItemButton>
    </TaskItemContainer>
  );
};

export default memo(TaskItem);
