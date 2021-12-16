import { Dispatch } from 'redux';

import { ModelTaskType, tasksAPI, TaskStatuses, TaskType } from '../dal/api';

import { RootStateType } from './store';
import {
  ADD_TODOLIST,
  AddTodolistType,
  REMOVE_TODOLIST,
  RemoveTodolistType,
} from './todolist-reducer';

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const GET_TASKS = 'GET_TASKS';

export type InitialStateTasksType = TasksType;
const initialStateTasks: InitialStateTasksType = {};

export const tasksReducer = (
  state = initialStateTasks,
  action: ActionType,
): InitialStateTasksType => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        [action.tasksID]: [action.payload, ...state[action.tasksID]],
      };
    case REMOVE_TASK:
      return {
        ...state,
        [action.tasksID]: state[action.tasksID].filter(s => s.id !== action.id),
      };
    case UPDATE_TASK:
      return {
        ...state,
        [action.tasksID]: state[action.tasksID].map(s =>
          s.id === action.id ? { ...s, ...action.payload } : s,
        ),
      };
    case ADD_TODOLIST:
      return { ...state, [action.payload.id]: [] };
    case REMOVE_TODOLIST: {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    case GET_TASKS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// actions
export const addTask = (tasksID: string, payload: TaskType) =>
  ({
    type: ADD_TASK,
    tasksID,
    payload,
  } as const);
export const removeTask = (tasksID: string, id: string) =>
  ({ type: REMOVE_TASK, tasksID, id } as const);
export const updateTask = (tasksID: string, id: string, payload: TaskType) =>
  ({ type: UPDATE_TASK, tasksID, id, payload } as const);
export const getTasks = (payload: TasksType) => ({ type: GET_TASKS, payload } as const);

// thanks
export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
  tasksAPI.getTasks(todolistID, 10, 1).then(res => {
    if (res.data.error === null) {
      dispatch(getTasks({ [todolistID]: res.data.items }));
    }
  });
};

export const createTaskTC =
  (todolistID: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistID, title).then(res => {
      if (res.data.resultCode === 0) {
        const task: TaskType = res.data.data.item;
        dispatch(addTask(todolistID, task));
      }
    });
  };

export const removeTaskTC =
  (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    tasksAPI.removeTask(todolistID, taskID).then(res => {
      if (res.data.resultCode === 0) {
        dispatch(removeTask(todolistID, taskID));
      }
    });
  };

export const updateTaskTC =
  (todolistID: string, taskID: string, updatedModel: UpdatedModelType) =>
  (dispatch: Dispatch, getState: () => RootStateType) => {
    const state = getState();
    const task = state.tasks[todolistID].find(t => t.id === taskID);
    if (task) {
      const taskModelApi: ModelTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      };
      tasksAPI
        .updateTask(todolistID, taskID, { ...taskModelApi, ...updatedModel })
        .then(res => {
          if (res.data.resultCode === 0) {
            const updatedTask = res.data.data.item;
            dispatch(updateTask(todolistID, taskID, updatedTask));
          }
        });
    } else {
      // console.log('Error, task not found');
    }
  };

// types
export type TasksType = {
  [key: string]: TaskType[];
};

type ActionType =
  | ReturnType<typeof addTask>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof updateTask>
  | AddTodolistType
  | RemoveTodolistType
  | ReturnType<typeof getTasks>;

type UpdatedModelType = { title: string } | { status: TaskStatuses };
