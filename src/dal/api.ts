import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: { 'API-KEY': '3e38d8b8-e96b-4053-a284-8500f7337dfb' },
});

// api
export const authAPI = {
  setLogin: (data: { email: string; password: string; rememberMe: string }) =>
    instance.post<{ resultCode: number; data: { userId: number } }>('auth/login', data),
  getAuthMe: () => instance.get<{ resultCode: number }>('auth/me'),
};

export const todolistAPI = {
  getTodolists: () => instance.get<TodolistType[]>('todo-lists'),
  createTodolist: (title: string) =>
    instance.post<ResponseAPIType<DataAPIType>>('todo-lists', { title }),
  deleteTodolist: (id: string) =>
    instance.delete<ResponseAPIType<{}>>(`todo-lists/${id}`),
  updateTodolist: (id: string, title: string) =>
    instance.put<ResponseAPIType<{}>>(`todo-lists/${id}`, { title }),
  reorderTodolist: (id: string, putAfterItemId: string) =>
    instance.put<ResponseAPIType<{}>>(`todo-lists/${id}/reorder`, { putAfterItemId }),
};

export const tasksAPI = {
  getTasks: (id: string, count: number, page: number) =>
    instance.get<ResponseTasksAPIType>(
      `todo-lists/${id}/tasks/?count=${count}&page=${page}`,
    ),
  createTask: (id: string, title: string) =>
    instance.post<ResponseTaskAPIType<{ item: TaskType }>>(`todo-lists/${id}/tasks`, {
      title,
    }),
  updateTask: (todolistId: string, taskId: string, model: ModelTaskType) =>
    instance.put<ResponseTaskAPIType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    ),
  removeTask: (todolistId: string, taskId: string) =>
    instance.delete<ResponseTaskAPIType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`),

  reorderTask: (todolistId: string, taskId: string, putAfterItemId: string) =>
    instance.put<ResponseTaskAPIType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {
      putAfterItemId,
    }),
};

// types
export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type DataAPIType = {
  item: TodolistType;
};

type ResponseAPIType<D> = {
  resultCode: number;
  messages: string[];
  data: D;
};

export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft,
}
export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  Later,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type ModelTaskType = {
  title: string;
  description: string;
  // completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type ResponseTaskAPIType<D> = {
  resultCode: number;
  messages: string[];
  data: D;
};

type ResponseTasksAPIType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};
