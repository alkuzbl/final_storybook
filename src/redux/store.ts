import { combineReducers, createStore } from 'redux';

import { tasksReducer } from './tasksReducer';

export type RootStateType = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export type RootStoreType = typeof store;
export const store = createStore(rootReducer);
