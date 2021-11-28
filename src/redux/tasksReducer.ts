import { v1 } from 'uuid';

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const CHANGE_STATUS_TASK = 'CHANGE_STATUS_TASK';
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type InitialStateTasksType = TaskType[];
const initialStateTasks: InitialStateTasksType = [
  { id: v1(), title: 'HTML&CSS', isDone: true },
  { id: v1(), title: 'JS', isDone: true },
  { id: v1(), title: 'ReactJS', isDone: false },
  { id: v1(), title: 'Rest API', isDone: false },
  { id: v1(), title: 'GraphQL', isDone: false },
];
type ActionType = AddTaskType | RemoveTaskType | UpdateTaskType | ChangeStatusTaskType;
export const tasksReducer = (
  state = initialStateTasks,
  action: ActionType,
): InitialStateTasksType => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case REMOVE_TASK:
      return state.filter(s => s.id !== action.id);
    case UPDATE_TASK:
      return state.map(s => (s.id === action.id ? { ...s, title: action.title } : s));
    case CHANGE_STATUS_TASK:
      return state.map(s => (s.id === action.id ? { ...s, isDone: action.isDone } : s));
    default:
      return state;
  }
};
type AddTaskType = ReturnType<typeof addTask>;
export const addTask = (id: string, title: string, isDone: boolean) =>
  ({ type: ADD_TASK, payload: { id, title, isDone } } as const);
type RemoveTaskType = ReturnType<typeof removeTask>;
export const removeTask = (id: string) => ({ type: REMOVE_TASK, id } as const);
type UpdateTaskType = ReturnType<typeof updateTask>;
export const updateTask = (id: string, title: string) =>
  ({ type: UPDATE_TASK, id, title } as const);
type ChangeStatusTaskType = ReturnType<typeof changeStatusTask>;
export const changeStatusTask = (id: string, isDone: boolean) =>
  ({ type: CHANGE_STATUS_TASK, id, isDone } as const);
