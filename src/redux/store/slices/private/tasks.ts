import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiTasks } from '@hooks/api/rest/tasks';
import { type Task, type TaskState } from '@utils/types';

const initialState: TaskState = {
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // GET /tasks
            .addMatcher(apiTasks.endpoints.getTasks.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(apiTasks.endpoints.getTasks.matchFulfilled, (state, action: PayloadAction<any>) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addMatcher(apiTasks.endpoints.getTasks.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching tasks';
            })

            // GET /tasks/:id
            .addMatcher(apiTasks.endpoints.getTaskById.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(apiTasks.endpoints.getTaskById.matchFulfilled, (state, action: PayloadAction<any>) => {
                state.currentTask = action.payload;
                state.loading = false;
            })
            .addMatcher(apiTasks.endpoints.getTaskById.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching task';
            })

            // POST /tasks
            .addMatcher(apiTasks.endpoints.addTask.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(apiTasks.endpoints.addTask.matchFulfilled, (state, action: PayloadAction<any>) => {
                state.tasks.push(action.payload.data);
                state.loading = false;
            })
            .addMatcher(apiTasks.endpoints.addTask.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error adding task';
            })

            // UPDATE /tasks/:id
            .addMatcher(apiTasks.endpoints.updateTask.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(apiTasks.endpoints.updateTask.matchFulfilled, (state, action: PayloadAction<any>) => {
                if (state.tasks.length > 0) {
                    const index = state.tasks.findIndex((task: Task) => task.id === action.payload.id);
                    if (index !== -1) {
                        state.tasks[index] = action.payload;
                        state.loading = false;
                    }
                }
            })
            .addMatcher(apiTasks.endpoints.updateTask.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error updating task';
            })

            // DELETE /tasks/:id
            .addMatcher(apiTasks.endpoints.deleteTask.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(apiTasks.endpoints.deleteTask.matchFulfilled, (state, action) => {
                const { arg } = action?.meta;
                if (arg && arg?.originalArgs?.id) {
                    state.tasks = state.tasks.filter(task => task.id !== arg?.originalArgs?.id);
                    state.loading = false;
                }
            })
            .addMatcher(apiTasks.endpoints.deleteTask.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error deleting task';
            });
    },
});

export const { clearError } = tasksSlice.actions;

export default tasksSlice.reducer;
