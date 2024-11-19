import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type Task, type TaskState } from '@utils/types';
import { Logger } from '@services';
import {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from '@hooks/api/rest';
import { useAppAlerts } from '@hooks';

export const useTasks = () => {
    const dispatch = useDispatch();
    const { data, isSuccess: isGetTasksSuccess, isError: isGetTasksError, error: getTasksError, refetch,
    } = useGetTasksQuery({});
    const [addTask, { isSuccess: isAddSuccess, isError: isAddError, error: addError }] = useAddTaskMutation();
    const [updateTask, { isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateTaskMutation();
    const [deleteTask, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] = useDeleteTaskMutation();

    const { showItemCreateActionToastSuccess, showItemCreateActionToastFailure,
        showItemEditedActionToastSuccess, showItemEditedActionToastFailure,
        showItemRemovedActionToastSuccess, showItemRemovedActionToastFailure, confirmRemoveActionAlert, } = useAppAlerts();

    const { tasks } = useSelector(
        (state: { tasks: TaskState }) => state.tasks,
    );

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
            await showItemCreateActionToastFailure();
            Logger.error('[useTasks] addTask:', { error });
        }
    }, [dispatch]);

    const updateTaskHook = useCallback(async (task: Task) => {
        try {
            const payload = await updateTask(task).unwrap();
            await showItemEditedActionToastSuccess();
            return payload
        } catch (error) {
            await showItemEditedActionToastFailure();
            Logger.error('[useTasks] updateTaskHook:', { error });
        }
    }, [dispatch]);

    const deleteTaskHookAction = useCallback(async (id: Pick<Task, 'id'>, callback?: () => void) => {
        try {
            const payload = await deleteTask(id).unwrap();
            await showItemRemovedActionToastSuccess();
            await callback?.();
            return payload
        } catch (error) {
            await showItemRemovedActionToastFailure();
            Logger.error('[useTasks] deleteTask:', { error });
            throw error;
        }
    }, [dispatch]);

    const deleteTaskHook = useCallback(async (id: Pick<Task, 'id'>, callback?: () => void) => {
        await confirmRemoveActionAlert(async () => {
            await deleteTaskHookAction(id, callback);
        });
    }, [confirmRemoveActionAlert]);

    return {
        data: tasks || data,
        refetch,
        getTaskHook,
        addTaskHook,
        updateTaskHook,
        deleteTaskHook,
    };
};

