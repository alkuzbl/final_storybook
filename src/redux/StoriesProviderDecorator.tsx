import React from 'react';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { RootStateType } from './store';
import { tasksReducer } from './tasksReducer';
import { todolistReducer } from './todolistReducer';

const initialState: RootStateType = {
  todolist: [
    { id: '1', title: 'What to bu', filter: 'all' },
    { id: '2', title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    '1': [
      { id: '1', title: 'HTML&CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
      { id: '4', title: 'Rest API', isDone: false },
      { id: '5', title: 'GraphQL', isDone: false },
    ],
    '2': [
      { id: '1', title: 'HTML&CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
      { id: '4', title: 'Rest API', isDone: false },
      { id: '5', title: 'GraphQL', isDone: false },
    ],
  },
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistReducer,
});

// type StoryBookStoreType = typeof storyBookStore;
export const storyBookStore = createStore(rootReducer, initialState as RootStateType);

export const storiesProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
