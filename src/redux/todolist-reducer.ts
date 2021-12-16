import { Dispatch } from 'redux';

import { todolistAPI, TodolistType } from '../dal/api';

import { setStatusApp } from './app-reducer';

export const ADD_TODOLIST = 'ADD_TODOLIST';
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const UPDATE_TITLE_TODOLIST = 'UPDATE_TITLE_TODOLIST';
const CHANGE_FILTER_TODOLIST = 'CHANGE_FILTER_TODOLIST';

export const todolistReducer = (
  state: InitialStateTodolistType = [],
  action: ActionType,
): InitialStateTodolistType => {
  switch (action.type) {
    case ADD_TODOLIST:
      return [...state, action.payload];
    case REMOVE_TODOLIST:
      return state.filter(s => s.id !== action.id);
    case UPDATE_TITLE_TODOLIST:
      return state.map(s => (s.id === action.id ? { ...s, title: action.title } : s));
    case CHANGE_FILTER_TODOLIST:
      return state.map(s => (s.id === action.id ? { ...s, filter: action.filter } : s));
    default:
      return state;
  }
};

// actions
export const addTodolist = (payload: TodolistType & { filter: FilterType }) =>
  ({ type: ADD_TODOLIST, payload } as const);
export const removeTodolist = (id: string) => ({ type: REMOVE_TODOLIST, id } as const);
export const updateTitleTodolist = (id: string, title: string) =>
  ({ type: UPDATE_TITLE_TODOLIST, id, title } as const);
export const changeFilterTodolist = (id: string, filter: FilterType) =>
  ({ type: CHANGE_FILTER_TODOLIST, id, filter } as const);

// thanks
export const setTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusApp('loading'));
  todolistAPI.getTodolists().then(res => {
    res.data.forEach(todolist => dispatch(addTodolist({ ...todolist, filter: 'all' })));
    dispatch(setStatusApp('idle'));
  });
};

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setStatusApp('loading'));
  todolistAPI.createTodolist(title).then(res => {
    const todolist = res.data.data.item;
    dispatch(addTodolist({ ...todolist, filter: 'all' }));
    dispatch(setStatusApp('idle'));
  });
};

export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
  dispatch(setStatusApp('loading'));
  todolistAPI.deleteTodolist(todolistID).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(removeTodolist(todolistID));
      dispatch(setStatusApp('idle'));
    }
  });
};

export const updateTitleTodolistTC =
  (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'));
    todolistAPI.updateTodolist(todolistID, title).then(res => {
      if (res.data.resultCode === 0) {
        dispatch(updateTitleTodolist(todolistID, title));
        dispatch(setStatusApp('idle'));
      }
    });
  };

// types
export type AddTodolistType = ReturnType<typeof addTodolist>;
export type RemoveTodolistType = ReturnType<typeof removeTodolist>;
type ActionType =
  | AddTodolistType
  | RemoveTodolistType
  | ReturnType<typeof updateTitleTodolist>
  | ReturnType<typeof changeFilterTodolist>;
export type FilterType = 'all' | 'active' | 'completed';
export type InitialStateTodolistType = (TodolistType & { filter: FilterType })[];
