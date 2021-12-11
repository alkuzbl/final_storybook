import {
  changeFilterTodolist,
  InitialStateTodolistType,
  removeTodolist,
  todolistReducer,
  updateTitleTodolist,
} from './todolistReducer';

let state: InitialStateTodolistType = [];

beforeEach(() => {
  state = [
    { id: '1', title: 'What to buy', filter: 'all', order: 0, addedDate: '' },
    { id: '2', title: 'What to learn', filter: 'all', order: 0, addedDate: '' },
  ];
});

// test('A new todolist should be added', () => {
//   const testTasksState = todolistReducer(
//     state,
//     addTodolist('3', 'Test title for todolist'),
//   );
//
//   expect(testTasksState.length).toBe(3);
//   expect(testTasksState[2].title).toBe('Test title for todolist');
//   expect(testTasksState[2].filter).toBe('all');
// });

test('There should be a todolist with id 1', () => {
  const testTasksState = todolistReducer(state, removeTodolist('1'));

  expect(testTasksState.length).toBe(1);
  expect(testTasksState[0].title).toBe('What to learn');
});

test('The title should be updated in the to-do list', () => {
  const testTasksState = todolistReducer(
    state,
    updateTitleTodolist('1', 'Test title for todolist'),
  );

  expect(testTasksState.length).toBe(2);
  expect(testTasksState[0].title).toBe('Test title for todolist');
  expect(testTasksState[1].title).toBe('What to learn');
  expect(testTasksState.map(s => s.title)).not.toContain('What to buy');
});

test('The title should be updated in the to-do list', () => {
  const testTasksState = todolistReducer(state, changeFilterTodolist('1', 'completed'));

  expect(testTasksState.length).toBe(2);
  expect(testTasksState[0].filter).toBe('completed');
  expect(testTasksState[1].filter).toBe('all');
});
