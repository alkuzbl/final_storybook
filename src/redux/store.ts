import { combineReducers, createStore } from 'redux';

import { tasksReducer } from './tasksReducer';
import { todolistReducer } from './todolistReducer';

export type RootStateType = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistReducer,
});

export type RootStoreType = typeof store;
export const store = createStore(rootReducer);
