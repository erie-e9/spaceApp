export interface Task {
    id?: number;
    user_id?: number;
    title: string;
    description?: string;
    due_date?: string;
    status?: number | null;
    priority?: number;
    attached_files?: Array<{
        fileName?: string;
        base64?: string;
        fileSize?: number;
        type?: string;
        uri?: string;
    }> | null;
    action_required?: string;
    difficulty_level?: string;
    created_by_role?: string;
    course_id?: number;
    instructor_comments?: string;
    graded?: string;
    grade?: number;
    created_at?: string;
    updated_at?: string;
}

export interface TaskState {
    tasks: Task[];
    currentTask: Task | null;
    loading: boolean;
    error: string | null;
}