import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { tasksReducer } from './tasksReducer';
import { todolistReducer } from './todolistReducer';

export type RootStateType = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistReducer,
});

export type RootStoreType = typeof store;
export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
