import { useCallback, useEffect, useMemo } from 'react';
import { Keyboard } from 'react-native';
import { useFormik } from 'formik';
import { type Task } from '@types';
import { Logger } from '@services';
import { dayjs, formatDate } from '@utils/formatters';
import { labels } from '@utils/forms/labels';
import { useTasks, useResponseHandler, useTheme, useAppAlerts, useMMKVStorageArray } from '@hooks';
import { formSchemas } from '@utils/forms/validators/schemas';
import { TaskProps } from '..';
import { IQueueItem } from '../../Queue';

interface TaskExtraProps extends Task, IQueueItem { }

export const useTask = ({ navigation, route }: TaskProps) => {
  const params: TaskExtraProps = route?.params?.task || {};
  const { id = 0, index = -1, title = '', description = '', due_date = '', status = '0', method } = params;
  const { confirmChangeQueueAlert, confirmRemoveQueueActionAlert } = useAppAlerts();
  const { darkMode } = useTheme();
  const { loading, setLoading } = useResponseHandler();
  const { addTaskHook, updateTaskHook, deleteTaskHook } = useTasks();
  const { getMMKVItem, updateMMKVItem, removeMMKVItem } = useMMKVStorageArray<any>({
    key: 'requestQueue',
    defaultValue: [],
  });
  const { taskSchema } = formSchemas();
  const { statusList } = labels();

  const isEditTask = useMemo(() => id || title, [id, title]);

  const taskHeaderTitle = useMemo((): string => {
    return `tasks:Task.${isEditTask ? 'edit' : 'new'}.screenTitle`
  }, []);

  const taskHeaderDescription = useMemo((): string => {
    return `tasks:Task.${isEditTask ? 'edit' : 'new'}.description`
  }, []);

  const maxDateDueDate = useMemo((): string => {
    return '2025-01-30'
  }, []);

  const minDateDueDate = useMemo((): string => {
    return dayjs(new Date).format('YYYY-MM-DD');
  }, []);

  const formik = useFormik({
    initialValues: {
      // title: 'created offline 4',
      // description: 'description',
      title,
      description,
      status: `${status}`, // Int but body needs initla value as String
      // due_date: due_date ? dayjs(due_date).format('DD/MM/YYYY') : '',
      due_date: due_date ? dayjs(due_date).format('DD/MM/YYYY') : undefined,
    },
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formatedstatus: number | null = Number(values.status) > 0 ? Number(values.status) : null;
        const existLocalItem = await getMMKVItem(id);
        const timestamp = new Date().toISOString();
        const dueDate = values.due_date !== undefined ? `${formatDate(values.due_date, 'YYYY-MM-DD')}T${timestamp.split('T')[1]}` : undefined;

        if (existLocalItem || index > 0 || method) {
          if (method === 'DELETE') {
            await confirmChangeQueueAlert(async () => {
              await updateMMKVItem(id || index, { ...values, status: formatedstatus, due_date: dueDate, timestamp: timestamp, method: 'PUT' })
              await navigation.goBack();
            });
          } else if (method === 'PUT' || method === 'PATCH' || method === 'POST') {
            await updateMMKVItem(id || index, { id, ...values, status: formatedstatus, due_date: dueDate, timestamp: timestamp, method, user_id: 1 });
            await navigation.goBack();
          }
        } else {
          if (id) {
            await updateTaskHook({ id, ...values, status: formatedstatus, due_date: dueDate });
          } else {
            await navigation.goBack();
            await addTaskHook({ ...values, status: formatedstatus });
          }
        }
      } catch (error) {
        Logger.log('Error in onSubmit task', { error });
      } finally {
        setLoading(false);
      }
    },
  });

  const clearInputHandler = useCallback(
    (field: string) => {
      formik.setFieldValue(field, '')
    },
    [formik]
  );

  const fieldValueHandler = useCallback(
    (field: string, value: any) => formik.setFieldValue(field, value),
    [formik]
  );

  const primaryButtonHandler = useCallback(async () => {
    Keyboard.dismiss();
    formik.handleSubmit();
  }, [formik, getMMKVItem]);

  const primaryButton = useMemo(
    () => ({
      testID: 'taskPrimaryButton',
      title: isEditTask ? 'tasks:Task.controllers.submitEdit' : 'tasks:Task.controllers.submitAdd',
      disabled: loading,
      loading: loading,
      onPress: primaryButtonHandler,
    }),
    [id, darkMode, loading, primaryButtonHandler]
  );

  const removeTask = useCallback(async (): Promise<void> => {
    try {
      const existLocalItem = await getMMKVItem(id);
      if (existLocalItem) {
        await confirmRemoveQueueActionAlert(async () => {
          await removeMMKVItem(id);
          await navigation.goBack();
        });
      } else {
        if (id) {
          await deleteTaskHook({ id }, navigation.goBack);
        }
      }
    } catch (error) {

    }
  }, []);

  return {
    ...formik,
    clearInputHandler,
    fieldValueHandler,
    primaryButton,
    removeTask,
    taskHeaderTitle,
    taskHeaderDescription,
    statusList,
    maxDateDueDate,
    minDateDueDate,
  };
};
