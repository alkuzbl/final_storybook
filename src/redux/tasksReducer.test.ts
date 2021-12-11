import { TaskStatuses } from '../dal/api';

import { removeTask, tasksReducer } from './tasksReducer';
import { removeTodolist } from './todolistReducer';

let state = {};

beforeEach(() => {
  state = {
    // todolist: [{ id: '1', title: 'What to buy', filter: 'all' }],

    '1': [
      { id: '1', title: 'HTML&CSS', status: TaskStatuses.Completed },
      { id: '2', title: 'JS', status: TaskStatuses.Completed },
      { id: '3', title: 'ReactJS', status: TaskStatuses.New },
      { id: '4', title: 'Rest API', status: TaskStatuses.New },
      { id: '5', title: 'GraphQL', status: TaskStatuses.New },
    ],
  };
});

// test('A new task should be added', () => {
//   const testTasksState = tasksReducer(state, addTask('1', 'Test title'));
//
//   expect(testTasksState['1'].length).toBe(6);
//   expect(testTasksState['1'][0].title).toBe('Test title');
// });

test('The task with id 3 must be deleted', () => {
  const testTasksState = tasksReducer(state, removeTask('1', '3'));

  expect(testTasksState['1'].length).toBe(4);
  expect(testTasksState['1'].map(s => s.title)).not.toContain('ReactJS');
});

// test('In a task with id 3, the name should be "Test title"', () => {
//   const testTasksState = tasksReducer(state, updateTask('1', '3', 'Test title'));
//
//   expect(testTasksState['1'].length).toBe(5);
//   expect(testTasksState['1'].map(s => s.title)).not.toContain('ReactJS');
//   expect(testTasksState['1'][2].title).toBe('Test title');
// });

// test('In a task with id 3, the isDone should be "true"', () => {
//   const testTasksState = tasksReducer(state, changeStatusTask('1', '3', true));
//
//   expect(testTasksState['1'].length).toBe(5);
//   expect(testTasksState['1'][2].title).toBe('ReactJS');
//   expect(testTasksState['1'][2].isDone).toBe(true);
// });

// test('A second task list with id 2 should be added', () => {
//   const testTasksState = tasksReducer(state, addTodolist('2', ''));
//
//   expect(Object.keys(testTasksState).length).toBe(2);
//   expect(Object.keys(testTasksState)[0]).toBe('1');
//   expect(Object.keys(testTasksState)[1]).toBe('2');
//   expect(testTasksState['1'].length).toBe(5);
//   expect(testTasksState['2'].length).toBe(0);
// });

test('A second task list with id 2 should be added', () => {
  const testTasksState = tasksReducer(state, removeTodolist('1'));

  expect(Object.keys(testTasksState)).toHaveLength(0);
  expect(testTasksState).toStrictEqual({});
});
