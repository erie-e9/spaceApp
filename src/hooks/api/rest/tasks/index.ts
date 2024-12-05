import { api } from '@hooks/api';
import { type Task } from '@utils/types';

export const apiTasks = api({
    baseUrl: process.env.API_REST_BASE || '',
    reducerPath: 'apiRestBase',
    // tagTypes: ['CREATE', 'EDIT', 'REMOVE'],
    // keepUnusedDataFor: 90,
    endpoints: (builder) => ({
        getTasks: builder.query<Array<Task>, void>({
            query: () => ({
                url: `tasks`,
                method: 'GET',
                enqueueable: false,
                retries: 3,
                retryDelay: 3000,
            }),
            // providesTags: ['CREATE', 'REMOVE'],
        }),

        getTaskById: builder.query<Task, Pick<Task, 'id'>>({
            query: (task) => ({
                url: `tasks/${task.id}`,
                method: 'GET',
                enqueueable: false,
                retries: 3,
                retryDelay: 1000,
            }),
        }),

        addTask: builder.mutation<Task, Partial<Task>>({
            query: (task: Task) => ({
                url: 'tasks',
                method: 'POST',
                body: {
                    user_id: 1, //! pending 
                    ...task
                },
                enqueueable: true,
                retries: 3,
                retryDelay: 1000,
            }),
            // invalidatesTags: ['CREATE'],
        }),

        updateTask: builder.mutation<Task, Partial<Task>>({
            query: (task) => {
                return ({
                    url: `tasks/${task.id}`,
                    method: 'PUT',
                    body: task,
                    enqueueable: true,
                    retries: 3,
                    retryDelay: 1000,
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
                    throw error;
                }
            },
            // invalidatesTags: ['EDIT'],
        }),

        patchTask: builder.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: `tasks/${task.id}`,
                method: 'PATCH',
                body: task,
                enqueueable: true,
                retries: 3,
                retryDelay: 1000,
            }),
            async onQueryStarted(task, { dispatch, queryFulfilled }) {
                try {
                    const { data: patchedTask } = await queryFulfilled;
                    dispatch(
                        apiTasks.util.updateQueryData('getTasks', task, (draft: any) => {
                            const index = draft.findIndex((task: Task) => task.id === patchedTask.id);
                            if (index !== -1) {
                                draft[index] = patchedTask;
                                return draft;
                            }
                        })
                    );
                } catch (error) {
                    throw error;
                }
            },
            // invalidatesTags: ['PATCH'],
        }),

        deleteTask: builder.mutation<Task, Pick<Task, 'id'>>({
            query: ({ id }) => ({
                url: `tasks/${id}`,
                method: 'DELETE',
                enqueueable: true,
                retries: 3,
                retryDelay: 1000,
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
    usePatchTaskMutation,
    useDeleteTaskMutation,
} = apiTasks;

