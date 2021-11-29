import { v1 } from 'uuid';

import {
  ADD_TODOLIST,
  AddTodolistType,
  REMOVE_TODOLIST,
  RemoveTodolistType,
} from './todolistReducer';

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const CHANGE_STATUS_TASK = 'CHANGE_STATUS_TASK';
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TasksType = {
  [key: string]: TaskType[];
};
export type InitialStateTasksType = TasksType;
const initialStateTasks: InitialStateTasksType = {
  // [NEW_ID]: [
  //   { id: v1(), title: 'HTML&CSS', isDone: true },
  //   { id: v1(), title: 'JS', isDone: true },
  //   { id: v1(), title: 'ReactJS', isDone: false },
  //   { id: v1(), title: 'Rest API', isDone: false },
  //   { id: v1(), title: 'GraphQL', isDone: false },
  // ],
};

export const tasksReducer = (
  state = initialStateTasks,
  action: ActionType,
): InitialStateTasksType => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, [action.tasksID]: [action.payload, ...state[action.tasksID]] };
    case REMOVE_TASK:
      return {
        ...state,
        [action.tasksID]: state[action.tasksID].filter(s => s.id !== action.id),
      };
    case UPDATE_TASK:
      return {
        ...state,
        [action.tasksID]: state[action.tasksID].map(s =>
          s.id === action.id ? { ...s, title: action.title } : s,
        ),
      };
    case CHANGE_STATUS_TASK:
      return {
        ...state,
        [action.tasksID]: state[action.tasksID].map(s =>
          s.id === action.id ? { ...s, isDone: action.isDone } : s,
        ),
      };
    case ADD_TODOLIST:
      return { ...state, [action.id]: [] };
    case REMOVE_TODOLIST: {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
};

type AddTaskType = ReturnType<typeof addTask>;
type RemoveTaskType = ReturnType<typeof removeTask>;
type UpdateTaskType = ReturnType<typeof updateTask>;
type ChangeStatusTaskType = ReturnType<typeof changeStatusTask>;

type ActionType =
  | AddTaskType
  | RemoveTaskType
  | UpdateTaskType
  | ChangeStatusTaskType
  | AddTodolistType
  | RemoveTodolistType;

export const addTask = (tasksID: string, title: string) =>
  ({ type: ADD_TASK, tasksID, payload: { id: v1(), title, isDone: false } } as const);

export const removeTask = (tasksID: string, id: string) =>
  ({ type: REMOVE_TASK, tasksID, id } as const);

export const updateTask = (tasksID: string, id: string, title: string) =>
  ({ type: UPDATE_TASK, tasksID, id, title } as const);

export const changeStatusTask = (tasksID: string, id: string, isDone: boolean) =>
  ({ type: CHANGE_STATUS_TASK, tasksID, id, isDone } as const);
