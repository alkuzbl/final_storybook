import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './app-reducer';
import { tasksReducer } from './tasks-reducer';
import { todolistReducer } from './todolist-reducer';

export type RootStateType = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistReducer,
  app: appReducer,
});

export type RootStoreType = typeof store;
export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
