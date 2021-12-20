import { TaskStatuses, TodolistType } from '../dal/api';

import { AppStatusType } from './app-reducer';
import {
  addTask,
  removeTask,
  tasksReducer,
  TasksType,
  updateTask,
} from './tasks-reducer';
import { addTodolist, FilterType, removeTodolist } from './todolist-reducer';

let state: TasksType;

beforeEach(() => {
  state = {
    '1': [
      {
        id: '1',
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        priority: 0,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
        description: '',
      },
      {
        id: '2',
        title: 'Test HTML title',
        status: TaskStatuses.Completed,
        priority: 0,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
        description: '',
      },
    ],
  };
});

test('A new task should be added', () => {
  const newTask = {
    id: '1',
    title: 'Test title',
    status: TaskStatuses.Completed,
    priority: 0,
    startDate: '',
    deadline: '',
    todoListId: '1',
    order: 0,
    addedDate: '',
    description: '',
  };
  const testTasksState = tasksReducer(state, addTask('1', newTask));

  expect(testTasksState['1'].length).toBe(3);
  expect(testTasksState['1'][0].title).toBe('Test title');
});

test('The task with id 2 must be deleted', () => {
  const testTasksState = tasksReducer(state, removeTask('1', '2'));

  expect(testTasksState['1'].length).toBe(1);
  expect(testTasksState['1'].map(s => s.title)).not.toContain('Test HTML title');
});

test('In a task with id 2, the name should be "Test title"', () => {
  const newTitleTask = {
    id: '2',
    title: 'Test title',
    status: TaskStatuses.Completed,
    priority: 0,
    startDate: '',
    deadline: '',
    todoListId: '1',
    order: 0,
    addedDate: '',
    description: '',
  };
  const testTasksState = tasksReducer(state, updateTask('1', '2', newTitleTask));

  expect(testTasksState['1'].length).toBe(2);
  expect(testTasksState['1'].map(s => s.title)).not.toContain('Test HTML title');
  expect(testTasksState['1'][1].title).toBe('Test title');
});

test('In a task with id 2, the status should be "TaskStatuses.New"', () => {
  const newStatusTask = {
    id: '2',
    title: 'Test HTML title',
    status: TaskStatuses.New,
    priority: 0,
    startDate: '',
    deadline: '',
    todoListId: '1',
    order: 0,
    addedDate: '',
    description: '',
  };

  const testTasksState = tasksReducer(state, updateTask('1', '2', newStatusTask));

  expect(testTasksState['1'].length).toBe(2);
  expect(testTasksState['1'][1].title).toBe('Test HTML title');
  expect(testTasksState['1'][1].status).toBe(TaskStatuses.New);
});

test('A second task list with id 2 should be added', () => {
  const newTodolist: TodolistType & { filter: FilterType; status: AppStatusType } = {
    id: '2',
    title: 'Test todolist title',
    filter: 'all',
    order: 0,
    addedDate: '',
    status: 'idle',
  };

  const testTasksState = tasksReducer(state, addTodolist(newTodolist));

  expect(Object.keys(testTasksState).length).toBe(2);
  expect(Object.keys(testTasksState)[0]).toBe('1');
  expect(Object.keys(testTasksState)[1]).toBe('2');
  expect(testTasksState['1'].length).toBe(2);
  expect(testTasksState['2'].length).toBe(0);
});

test('A second task list with id 1 should be deleted', () => {
  const testTasksState = tasksReducer(state, removeTodolist('1'));

  expect(Object.keys(testTasksState)).toHaveLength(0);
  expect(testTasksState).toStrictEqual({});
});
