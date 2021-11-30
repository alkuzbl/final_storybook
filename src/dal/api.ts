import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: { 'API-KEY': '3e38d8b8-e96b-4053-a284-8500f7337dfb' },
});

type TodolistAPIType = {
  id: string;
  addedDate: Date;
  order: number;
  title: string;
};

type DataAPIType = {
  item: TodolistAPIType;
};

type ResponseAPIType = {
  resultCode: number;
  messages: string[] | [];
  data: DataAPIType | {};
};

type TaskAPIType = {
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

type ResponseTaskAPIType = {
  resultCode: number;
  messages: string[] | [];
  data:
    | {}
    | {
        item: TaskAPIType;
      };
};

type ResponseTasksAPIType = {
  items: TaskAPIType[];
  totalCount: number;
  error: string;
};

export const authAPI = {
  setLogin: (data: { email: string; password: string; rememberMe: string }) =>
    instance.post<{ resultCode: number; data: { userId: number } }>('auth/login', data),
  getAuthMe: () => instance.get<{ resultCode: number }>('auth/me'),
};

export const todolistAPI = {
  getTodolists: () => instance.get<TodolistAPIType[]>('todo-lists'),
  setNewTodolist: (data: { title: string }) =>
    instance.post<ResponseAPIType>('todo-lists', data),
  deleteTodolist: (id: string) => instance.delete<ResponseAPIType>(`todo-lists/${id}`),
  updateTodolist: (id: string, data: { title: string }) =>
    instance.put<ResponseAPIType>(`todo-lists/${id}`, data),
  reorderTodolist: (id: string, data: { putAfterItemId: string }) =>
    instance.put<ResponseAPIType>(`todo-lists/${id}/reorder`, data),
  getTasks: (id: string, count: number, page: number) =>
    instance.get<ResponseTasksAPIType>(
      `todo-lists/${id}/tasks/?count=${count}&page=${page}`,
    ),
  setNewTask: (id: string, data: { title: string }) =>
    instance.post<ResponseTaskAPIType>(`todo-lists/${id}/tasks`, data),

  updateTask: (todolistId: string, taskId: string, data: TaskAPIType) =>
    instance.put<ResponseTaskAPIType>(`todo-lists/${todolistId}/tasks/${taskId}`, data),

  deleteTask: (todolistId: string, taskId: string) =>
    instance.delete<ResponseTaskAPIType>(`todo-lists/${todolistId}/tasks/${taskId}`),
  reorderTask: (todolistId: string, taskId: string, data: { putAfterItemId: string }) =>
    instance.put<ResponseTaskAPIType>(`todo-lists/${todolistId}/tasks/${taskId}`, data),
};
