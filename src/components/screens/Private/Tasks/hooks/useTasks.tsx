import { useCallback, useMemo, Fragment } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { Task } from '@types';
import { Logger, useCopy } from '@services';
import { useGetTasksQuery } from '@hooks/api/rest';
import {
  useShare,
  useTasks as useTasksHook,
  useModal,
  useMMKVStorageArray,
  useAppAlerts,
} from '@hooks';
import { Skeleton } from '@components/animated';
import { SVGIcon } from '@components/atoms';
import TaskItem from '../components/TaskItem';
import { TasksProps } from '..';
import {
  SwipeButton,
  SwipeableFullContainer,
  AnimatedView,
  SkeletonContainer,
  RightSkeletonContainer,
  LeftContentData,
} from '../styles';

export const useTasks = ({ navigation }: TasksProps) => {
  const { getCopyValue } = useCopy();
  const { showModal } = useModal();
  const { shareMessage } = useShare();
  const { confirmChangeQueueAlert } = useAppAlerts();
  const {
    data,
    deleteTaskHook,
    updateTaskHook,
    clearLocalTasks,
    isLoading: tasksHookLoading,
  } = useTasksHook();
  const { isFetching, refetch } = useGetTasksQuery({});
  const { getMMKVItem, updateMMKVItem } = useMMKVStorageArray<any>({
    key: 'requestQueue',
    defaultValue: [],
  });

  // extra items to indicate loading more items
  const itemList = useMemo((): Array<Task> => data, [data]);

  const filterBy = useMemo(() => {
    return itemList.length > 0 ? ['title', 'description'] : undefined;
  }, [itemList]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [tasksHookLoading]),
  );

  const tasksHeaderTitle = useMemo((): string => {
    return getCopyValue('tasks:Tasks.screenTitle', {
      count:
        itemList.length > 0 && itemList[0] !== null && itemList[0] !== undefined
          ? `(${itemList.length})`
          : '',
    });
  }, [itemList]);

  const tasksSearcher = useMemo((): string => {
    return 'tasks:Tasks.controllers.searchInputLabel';
  }, []);

  const taskForm = useCallback((task?: Task) => {
    navigation.navigate('Private', { screen: 'Task', params: { task: task } } as never);
  }, []);

  const renderLeftAction = useCallback(
    async (task: Task) => {
      const { id } = task;
      try {
        if (id) {
          const existLocalItem = await getMMKVItem(id);
          if (existLocalItem && existLocalItem.method === 'DELETE') {
            const timestamp = new Date().toISOString();
            await confirmChangeQueueAlert(async () => {
              await updateMMKVItem(id, {
                ...task,
                status: task.status === 3 ? 2 : 3,
                timestamp,
                method: 'PUT',
              });
            });
          } else {
            await updateTaskHook({ id, ...task, status: task.status === 3 ? 2 : 3 });
          }
        }
      } catch (error) {
        Logger.log('[SwipeableTaskOptions] renderLeftAction: ', { error });
      }
    },
    [updateTaskHook, getMMKVItem],
  );

  const renderLeftActions = useCallback((task: Task) => {
    return (
      <SwipeableFullContainer>
        <SwipeButton
          backgroundColor={task.status === 3 ? 'tertiary200' : 'primary500'}
          onPress={() => renderLeftAction(task)}
        >
          <SVGIcon
            icon={task.status === 3 ? 'arrowback' : 'check'}
            strokeWidth={task.status === 3 ? 1.5 : 2}
          />
        </SwipeButton>
      </SwipeableFullContainer>
    );
  }, []);

  const renderRightAction = useCallback(
    (task: Task, type?: 'remove' | 'share') => {
      const { id, title } = task;
      if (id) {
        if (type === 'remove') {
          deleteTaskHook({ id });
        } else {
          shareMessage(title);
        }
      }
    },
    [deleteTaskHook],
  );

  const renderRightActions = useCallback((task: Task) => {
    return (
      <AnimatedView>
        <SwipeButton
          backgroundColor="danger_status"
          onPress={() => renderRightAction(task, 'remove')}
        >
          <SVGIcon icon="remove" iconColor="#fff" />
        </SwipeButton>
        <SwipeButton backgroundColor="tertiary200" onPress={() => renderRightAction(task, 'share')}>
          <SVGIcon icon="share" />
        </SwipeButton>
      </AnimatedView>
    );
  }, []);

  const options = useMemo(
    () => [
      {
        text: 'tasks:Task.new.screenTitle',
        icon: 'add',
        handler: () => {
          navigation.navigate('Private', { screen: 'Task' });
        },
      },
      {
        text: 'queue:Queue.title',
        icon: 'queue',
        handler: () => {
          navigation.navigate('Private', { screen: 'Queue' });
        },
      },
      {
        text: 'common:messages.clearCache',
        icon: 'remove',
        handler: () => clearLocalTasks(),
      },
    ],
    [],
  );

  const showPopUp = useCallback(() => {
    showModal({
      type: 'popup',
      title: 'authentication:Authentication.alerts.useAnotherAccount.title',
      description: 'authentication:Authentication.alerts.useAnotherAccount.description',
      options: options,
      triggerButtonPosition: { x: 350, y: 90, width: 150, height: 0 },
    });
  }, []);

  const renderItemComponent = useCallback(
    ({ item }: { item: Task }) => <TaskItem item={item} itemHeight={70} onPress={taskForm} />,
    [isFetching, tasksHookLoading],
  );

  const TaskSkeleton = useMemo(() => {
    return isFetching || tasksHookLoading ? (
      <Fragment>
        {Array.from({ length: itemList.length > 0 ? 1 : 3 }).map((_, index) => {
          const skeletonProps = {
            show: true,
            // animationType: 'shiver' as AnimationType,
            duration: 1200,
            backgroundColor: 'tertiary200',
          };
          return (
            <SkeletonContainer key={index}>
              <LeftContentData>
                <Skeleton {...skeletonProps} height={12} width={100} borderRadius={5} />
                <Skeleton {...skeletonProps} height={12} width={200} borderRadius={5} />
                <Skeleton {...skeletonProps} height={10} width={60} borderRadius={5} />
              </LeftContentData>
              <RightSkeletonContainer>
                <Skeleton {...skeletonProps} height={12} width={40} borderRadius={5} />
                <Skeleton {...skeletonProps} height={10} width={30} borderRadius={5} />
              </RightSkeletonContainer>
            </SkeletonContainer>
          );
        })}
      </Fragment>
    ) : (
      <Fragment></Fragment>
    );
  }, [isFetching, tasksHookLoading]);

  return {
    itemList,
    isLoading: isFetching || tasksHookLoading,
    filterBy,
    taskForm,
    tasksHeaderTitle,
    tasksSearcher,
    renderRightActions,
    renderLeftActions,
    showPopUp,
    renderItemComponent,
    TaskSkeleton,
  };
};
