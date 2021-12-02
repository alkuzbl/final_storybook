import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: { 'API-KEY': '3e38d8b8-e96b-4053-a284-8500f7337dfb' },
});

export type TodolistAPIType = {
  id: string;
  addedDate: Date;
  order: number;
  title: string;
};

type DataAPIType = {
  item: TodolistAPIType;
};

type ResponseAPIType<D> = {
  resultCode: number;
  messages: string[];
  data: D;
};

export type TaskAPIType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: Date;
  deadline: Date;
  id: string;
  todoListId: string;
  order: number;
  addedDate: Date;
};

export type ModelTaskAPIType = {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: Date;
  deadline: Date;
};

type ResponseTaskAPIType<D> = {
  resultCode: number;
  messages: string[];
  data: D;
};

type ResponseTasksAPIType = {
  items: TaskAPIType[];
  totalCount: number;
  error: string | null;
};

export const authAPI = {
  setLogin: (data: { email: string; password: string; rememberMe: string }) =>
    instance.post<{ resultCode: number; data: { userId: number } }>('auth/login', data),
  getAuthMe: () => instance.get<{ resultCode: number }>('auth/me'),
};

export const todolistAPI = {
  getTodolists: () => instance.get<TodolistAPIType[]>('todo-lists'),

  createTodolist: (title: string) =>
    instance.post<ResponseAPIType<DataAPIType>>('todo-lists', { title }),

  deleteTodolist: (id: string) =>
    instance.delete<ResponseAPIType<{}>>(`todo-lists/${id}`),

  updateTodolist: (id: string, title: string) =>
    instance.put(`todo-lists/${id}`, { title }),

  reorderTodolist: (id: string, putAfterItemId: string) =>
    instance.put<ResponseAPIType<{}>>(`todo-lists/${id}/reorder`, { putAfterItemId }),

  getTasks: (id: string, count: number, page: number) =>
    instance.get<ResponseTasksAPIType>(
      `todo-lists/${id}/tasks/?count=${count}&page=${page}`,
    ),

  createTask: (id: string, title: string) =>
    instance.post<ResponseTaskAPIType<TaskAPIType>>(`todo-lists/${id}/tasks`, { title }),

  updateTask: (todolistId: string, taskId: string, model: ModelTaskAPIType) =>
    instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model),

  deleteTask: (todolistId: string, taskId: string) =>
    instance.delete<ResponseTaskAPIType<TaskAPIType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
    ),

  reorderTask: (todolistId: string, taskId: string, putAfterItemId: string) =>
    instance.put<ResponseTaskAPIType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {
      putAfterItemId,
    }),
};
