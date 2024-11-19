import { api } from '@hooks/api';
import { Logger } from '@services';
import { type Task } from '@utils/types';

export const apiTasks = api({
    baseUrl: process.env.API_REST_BASE || '',
    reducerPath: 'apiRestBase',
    // tagTypes: ['CREATE', 'EDIT', 'REMOVE'],
    // keepUnusedDataFor: 90,
    endpoints: (builder) => ({
        getTasks: builder.query<Array<Task>, void>({
            query: () => `tasks`,
            // providesTags: ['CREATE', 'REMOVE'],
        }),

        getTaskById: builder.query<Task, Pick<Task, 'id'>>({
            query: (task) => `tasks/${task.id}`,
        }),

        addTask: builder.mutation<Task, Partial<Task>>({
            query: (task: Task) => ({
                url: 'tasks',
                method: 'POST',
                body: {
                    user_id: 1,
                    ...task
                },
            }),
            // invalidatesTags: ['CREATE'],
        }),

        updateTask: builder.mutation<Task, Partial<Task>>({
            query: (task) => {
                return ({
                    url: `tasks/${task.id}`,
                    method: 'PUT',
                    body: task,
                })
            },
            async onQueryStarted(task, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedTask } = await queryFulfilled;
                    dispatch(
                        apiTasks.util.updateQueryData('getTasks', task, (draft: any) => {
                            const index = draft.findIndex((task: Task) => task.id === updatedTask.id);
                            if (index !== -1) {
                                draft[index] = updatedTask;
                                return draft;
                            }
                        })
                    );
                } catch (error) {
                    Logger.error('Error updating cache:', { error: error.error?.data });
                    throw error?.error?.data?.message
                }
            },
            // invalidatesTags: ['EDIT'],
        }),

        deleteTask: builder.mutation<Task, Pick<Task, 'id'>>({
            query: ({ id }) => ({
                url: `tasks/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        apiTasks.util.updateQueryData('getTasks', undefined, (draft: any) => {
                            const index = draft.findIndex((task: Task) => task.id === id);
                            if (index !== -1) {
                                draft.splice(index, 1);
                                return draft
                            }
                        })
                    );
                } catch (error) {
                    Logger.error('Error deleting task:', error);
                    throw error;
                }
            },
            // invalidatesTags: ['REMOVE'],
        }),
    })
});

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = apiTasks;

