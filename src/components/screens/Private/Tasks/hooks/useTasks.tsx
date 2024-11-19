import { useCallback, useEffect, useMemo } from 'react';
import { Task } from '@types';
import { useCopy } from '@services';
import { useTasks as useTasksHook } from '@hooks';
import { TasksProps } from '..';

export const useTasks = ({ navigation }: TasksProps) => {
  const { getCopyValue } = useCopy();
  const { data, refetch, deleteTaskHook } = useTasksHook();

  const itemList = useMemo((): Array<Task> => {
    return data as Array<Task>;
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const tasksHeaderTitle = useMemo((): string => {
    return getCopyValue('tasks:Tasks.screenTitle', {
      count: itemList.length > 0 ? `(${itemList.length})` : '',
    });
  }, [itemList]);

  const tasksHeaderDescription = useMemo((): string => {
    return 'tasks:Tasks.description';
  }, []);

  const tasksSearcher = useMemo((): string => {
    return 'tasks:Tasks.controllers.searchInputLabel';
  }, []);

  const taskFormModal = useCallback((task?: Task) => {
    navigation.navigate('Private', { screen: 'Task', params: { task: task } } as never);
  }, []);

  return {
    itemList,
    deleteTaskHook,
    taskFormModal,
    tasksHeaderTitle,
    tasksHeaderDescription,
    tasksSearcher,
  };
};
