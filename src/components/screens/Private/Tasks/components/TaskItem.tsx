import { FC, memo, useMemo } from 'react';
import { Easing, FadeIn, LinearTransition } from 'react-native-reanimated';
import truncate from 'lodash/truncate';
import { screen_width, testProperties } from '@utils/functions';
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
  StyledSkeleton,
} from './styles';

export interface TaskItemProps {
  testID?: string;
  item: Task;
  itemHeight?: number | undefined;
  rightContent?: string;
  onPress?: ((item: any) => void) | undefined;
}

export const TaskItem: FC<TaskItemProps> = ({
  testID,
  item,
  itemHeight,
  rightContent,
  onPress,
}) => {
  const { undefinedStatus, pendingStatus, inProgressStatus, completeStatus } = labels();

  const formattedCreatedAt = useMemo(() => {
    return item?.created_at ? `${dayjs(item.created_at).fromNow(true)}` : '';
  }, []);

  const formattedDueDate = useMemo(() => {
    return item?.due_date ? `${dayjs(item.due_date).fromNow(true)}` : '';
  }, []);

  const statusTask = useMemo(() => {
    return {
      0: undefinedStatus,
      1: pendingStatus,
      2: inProgressStatus,
      3: completeStatus,
    };
  }, []);

  const skeletonProps = useMemo(() => {
    return {
      show: item === null,
      // animationType: 'shiver',
      duration: 1200,
      backgroundColor: 'tertiary200',
    };
  }, [item]);

  const animatedProps = {
    layout: LinearTransition.easing(Easing.ease),
    entering: FadeIn.duration(600),
  };

  return (
    <TaskItemContainer {...testProperties(testID || 'TaskItemID')} itemHeight={itemHeight}>
      <TaskItemButton onPress={() => item !== null && onPress?.(item)}>
        <TaskContentContainer isComplete={item?.status === 3}>
          <TaskContentData>
            <StyledSkeleton {...skeletonProps} height={15} width={100} borderRadius={5}>
              <TaskTitleText
                {...animatedProps}
                isComplete={item?.status === 3}
                color="typography950"
              >
                {item?.title}
              </TaskTitleText>
            </StyledSkeleton>
            <StyledSkeleton
              {...skeletonProps}
              height={13}
              width={screen_width - 150}
              borderRadius={5}
            >
              {item?.description && (
                <TaskDescriptionText
                  {...animatedProps}
                  color="typography700"
                  isComplete={item?.status === 3}
                >
                  {truncate(item?.description, {
                    length: 45,
                    omission: '...',
                  })}
                </TaskDescriptionText>
              )}
            </StyledSkeleton>
            <StyledSkeleton {...skeletonProps} height={10} width={60} borderRadius={5}>
              <CreatedAtContainer>
                {item?.status && item?.status > 0 && (
                  <CreatedAtText {...animatedProps} type="Label" color="typography950">
                    {statusTask[item?.status || 1]}
                  </CreatedAtText>
                )}
              </CreatedAtContainer>
            </StyledSkeleton>
          </TaskContentData>
          <DueDateContainer>
            <StyledSkeleton {...skeletonProps} height={13} width={60} borderRadius={5}>
              {item?.created_at && (
                <CreatedAtText {...animatedProps} type="Label">
                  {formattedCreatedAt}
                </CreatedAtText>
              )}
            </StyledSkeleton>
            <StyledSkeleton {...skeletonProps} height={10} width={60} borderRadius={5}>
              {(rightContent || formattedDueDate) && (
                <DueDateText {...animatedProps} type="Label" color="typography700">
                  {rightContent || formattedDueDate}
                </DueDateText>
              )}
            </StyledSkeleton>
          </DueDateContainer>
        </TaskContentContainer>
      </TaskItemButton>
    </TaskItemContainer>
  );
};

export default memo(TaskItem);
