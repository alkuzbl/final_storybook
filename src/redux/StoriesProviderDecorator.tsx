import React from 'react';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { TaskPriorities, TaskStatuses } from '../dal/api';

import { RootStateType } from './store';
import { tasksReducer } from './tasks-reducer';
import { todolistReducer } from './todolist-reducer';

const initialState: RootStateType = {
  auth: { isLoggedIn: false },
  app: {
    error: null,
    status: 'idle',
    isInitialized: false,
  },
  todolist: [
    {
      id: '1',
      title: 'What to bu',
      addedDate: '',
      order: 0,
      filter: 'all',
      status: 'idle',
    },
    {
      id: '2',
      title: 'What to buy',
      addedDate: '',
      order: 0,
      filter: 'all',
      status: 'idle',
    },
  ],
  tasks: {
    '1': [
      {
        id: '1',
        title: 'HTML&CSS',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '1',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '1',
      },
      {
        id: '3',
        title: 'ReactJS',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '1',
      },
      {
        id: '4',
        title: 'Rest API',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '1',
      },
      {
        id: '5',
        title: 'GraphQL',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '1',
      },
    ],
    '2': [
      {
        id: '1',
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '2',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '2',
      },
      {
        id: '3',
        title: 'ReactJS',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '2',
      },
      {
        id: '4',
        title: 'Rest API',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '2',
      },
      {
        id: '5',
        title: 'GraphQL',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: '2',
      },
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
