import { useCallback, useEffect, useMemo } from 'react';
import { type Task } from '@types';
import { Logger, useCopy } from '@services';
import { useGetTasksQuery } from '@hooks/api/rest';
import {
  useShare,
  useTasks as useTasksHook,
  useModal,
  useMMKVStorageArray,
  useAppAlerts,
} from '@hooks';
import { SVGIcon } from '@components/atoms';
import { TasksProps } from '..';
import { SwipeButton, SwipeableFullContainer, AnimatedView } from '../styles';

export const useTasks = ({ navigation }: TasksProps) => {
  const { getCopyValue } = useCopy();
  const { showModal } = useModal();
  const { shareMessage, shareCustomContent } = useShare();
  const { confirmChangeQueueAlert } = useAppAlerts();
  const { data, deleteTaskHook, updateTaskHook, clearLocalTasks } = useTasksHook();
  const { data: items, isLoading, refetch } = useGetTasksQuery({});
  const { getMMKVItem, updateMMKVItem } = useMMKVStorageArray<any>({
    key: 'requestQueue',
    defaultValue: [],
  });
  const nullExtraLoading: Array<null> | undefined = isLoading ? [null, null] : undefined; // extra items to indicate loading more items

  const itemList = useMemo((): Array<Task | null | undefined> => {
    return data.length > 0 ? [...(data || items), ...(nullExtraLoading || [])] : [];
  }, [data, items, isLoading]);

  const filterBy = useMemo(() => {
    return itemList.length > 0 ? ['title', 'description', 'priority'] : undefined;
  }, [itemList]);

  useEffect(() => {
    refetch();
  }, []);

  const tasksHeaderTitle = useMemo((): string => {
    return getCopyValue('tasks:Tasks.screenTitle', {
      count:
        itemList.length > 0 && itemList[0] !== null && itemList[0] !== undefined
          ? `(${itemList.length - (nullExtraLoading?.length || 0)})`
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

  return {
    itemList,
    isLoading,
    filterBy,
    taskForm,
    tasksHeaderTitle,
    tasksSearcher,
    renderRightActions,
    renderLeftActions,
    showPopUp,
  };
};
