import { useCallback, useMemo } from 'react';
import { Keyboard } from 'react-native';
import { useFormik } from 'formik';
import { type Task } from '@types';
import { Logger } from '@services';
import { dayjs, formatDate } from '@utils/formatters';
import { labels } from '@utils/forms/labels';
import { useTasks, useResponseHandler, useTheme } from '@hooks';
import { formSchemas } from '@utils/forms/validators/schemas';
import { TaskProps } from '..';

export const useTask = ({ navigation, route }: TaskProps) => {
  const params: Task = route?.params?.task || {};

  const { id = 0, title = '', description = '', due_date = '', status = '0' } = params;

  const { darkMode } = useTheme();
  const { loading, setLoading } = useResponseHandler();
  const { addTaskHook, updateTaskHook, deleteTaskHook } = useTasks();
  const { taskSchema } = formSchemas();
  const { statusList } = labels();

  const taskHeaderTitle = useMemo((): string => {
    return `tasks:Task.${id ? 'edit' : 'add'}.screenTitle`
  }, []);

  const taskHeaderDescription = useMemo((): string => {
    return `tasks:Task.${id ? 'edit' : 'add'}.description`
  }, []);

  const maxDateDueDate = useMemo((): string => {
    return '2025-01-30'
  }, []);

  const minDateDueDate = useMemo((): string => {
    return dayjs(new Date).format('YYYY-MM-DD');
  }, []);

  const formik = useFormik({
    initialValues: {
      title,
      description,
      status: `${status}`,
      due_date: due_date ? dayjs(due_date).format('DD/MM/YYYY') : '',
    },
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      try {
        const formatedstatus: number | null = Number(values.status) > 0 ? Number(values.status) : null;
        if (id) {
          const dueDate = `${formatDate(values.due_date, 'YYYY-MM-DD')}T${due_date.split('T')[1]}`
          await updateTaskHook({ id, ...values, status: formatedstatus, due_date: dueDate });
        } else {
          await addTaskHook({ ...values, status: formatedstatus });
          await navigation.goBack();
        }
      } catch (error) {
        Logger.log('Error in onSubmit', { error });
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

  const primaryButtonHandler = useCallback(() => {
    Keyboard.dismiss();
    formik.handleSubmit();
  }, [formik]);

  const primaryButton = useMemo(
    () => ({
      testID: 'taskPrimaryButton',
      title: id ? 'tasks:Task.controllers.submitEdit' : 'tasks:Task.controllers.submitAdd',
      disabled: loading,
      loading: loading,
      onPress: primaryButtonHandler,
    }),
    [id, darkMode, loading, primaryButtonHandler]
  );

  const removeTask = useCallback(async (): Promise<void> => {
    if (id) {
      await deleteTaskHook({ id }, navigation.goBack);
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
