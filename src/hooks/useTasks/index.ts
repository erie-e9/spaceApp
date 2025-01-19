import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Task, TaskState } from '@types';
import { Logger } from '@services';
import { useGetTaskByIdQuery, useAddTaskMutation, useUpdateTaskMutation, usePatchTaskMutation, useDeleteTaskMutation } from '@hooks/api/rest';
import { clearTasks, updateTask as updateTaskSlice, deleteTask as deleteTaskSlice } from '@slices/private';
import { useAppAlerts } from '@hooks';

export const useTasks = () => {
    const dispatch = useDispatch();
    const [addTask, { isSuccess: isAddSuccess, isError: isAddError, error: addError, isLoading: addLoading }] = useAddTaskMutation();
    const [updateTask, { isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError, isLoading: updateLoading }] = useUpdateTaskMutation();
    const [patchTask, { isSuccess: isPatchSuccess, isError: isPatchError, error: patchError, isLoading: patchLoading }] = usePatchTaskMutation();
    const [deleteTask, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError, isLoading: deleteLoading }] = useDeleteTaskMutation();

    const { showItemCreateActionToastSuccess, showCreateItemActionToastFailure,
        showUpdateItemActionToastSuccess, showUpdateItemActionToastFailure,
        showRemoveItemActionToastSuccess, showRemoveItemActionToastFailure, confirmRemoveActionAlert,
        showActionWillBeTriggeredToast } = useAppAlerts();

    const { tasks } = useSelector(
        (state: { tasks: TaskState }) => state.tasks,
    );

    const getTaskByIdHook = useCallback((id: number | string) => {
        try {
            const task = tasks.find((task) => task.id === id);
            return task;
        } catch (error) {
            Logger.log('[useTasks] getTaskByIdHook', { error })
        }
    }, []);

    const getTaskHook = useCallback(async (id: Pick<Task, 'id'>) => {
        const payload = await useGetTaskByIdQuery(id);
        return payload;
    }, []);

    const addTaskHook = useCallback(async (task: Partial<Task>) => {
        try {
            const payload = await addTask(task).unwrap();
            await showItemCreateActionToastSuccess();
            return payload
        } catch (error) {
            if (error?.status === 'OFFLINE') {
                await showActionWillBeTriggeredToast();
            } else {
                await showCreateItemActionToastFailure();
            }
            Logger.error('[useTasks] addTask:', { error, data: error?.data });
        }
    }, [dispatch, showItemCreateActionToastSuccess, showCreateItemActionToastFailure]);

    const updateTaskHook = useCallback(async (task: Task) => {
        try {
            await dispatch(updateTaskSlice(task))
            const payload = await updateTask(task).unwrap();
            await showUpdateItemActionToastSuccess();
            return payload
        } catch (error: unknown) {
            if (error?.status === 'OFFLINE') {
                Logger.warn('[useTasks] updateTaskHook: Update action enqueued for task', task.id);
                await showActionWillBeTriggeredToast();
            } else {
                Logger.error('[useTasks] updateTaskHook: Error updating cache:', { error: error });
                await showUpdateItemActionToastFailure();
            }
        }
    }, [dispatch, updateTask, showUpdateItemActionToastSuccess, showActionWillBeTriggeredToast, showUpdateItemActionToastFailure]);

    const patchTaskHook = useCallback(async (task: Task) => {
        try {
            await dispatch(updateTaskSlice(task))
            const payload = await patchTask(task).unwrap();
            await showUpdateItemActionToastSuccess();
            return payload
        } catch (error: unknown) {
            if (error?.status === 'OFFLINE') {
                Logger.warn('[useTasks] patchTaskHook: Update action enqueued for task', task.id);
                await showActionWillBeTriggeredToast();
            } else {
                Logger.error('[useTasks] patchTaskHook: Error updating cache:', { error: error });
                await showUpdateItemActionToastFailure();
            }
        }
    }, [dispatch, patchTask, showUpdateItemActionToastSuccess, showActionWillBeTriggeredToast, showUpdateItemActionToastFailure]);

    const deleteTaskHookAction = useCallback(async (id: Pick<Task, 'id'>, callback?: () => void) => {
        try {
            const payload = await deleteTask(id).unwrap();
            await showRemoveItemActionToastSuccess();
            await callback?.();
            return payload
        } catch (error) {
            if (error?.status === 'OFFLINE') {
                await showActionWillBeTriggeredToast();
            } else {
                await showRemoveItemActionToastFailure();
            }
            Logger.error('[useTasks] deleteTask:', { error });
            throw error;
        }
    }, [dispatch, deleteTask, showRemoveItemActionToastSuccess, showActionWillBeTriggeredToast, showRemoveItemActionToastFailure]);

    const deleteTaskHook = useCallback(async (id: Pick<Task, 'id'>, callback?: () => void) => {
        await confirmRemoveActionAlert(async () => {
            await deleteTaskHookAction(id, callback);
        });
    }, [confirmRemoveActionAlert]);

    const clearLocalTasks = useCallback(async () => {
        await dispatch(clearTasks());
    }, [dispatch]);

    return {
        data: tasks,
        getTaskHook,
        addTaskHook,
        updateTaskHook,
        patchTaskHook,
        deleteTaskHook,
        clearLocalTasks,
        isLoading: addLoading || updateLoading || patchLoading || deleteLoading,
        getTaskByIdHook
    };
};

