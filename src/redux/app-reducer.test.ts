import { appReducer, InitStateAppType, setError, setStatusApp } from './app-reducer';

let state: InitStateAppType;

beforeEach(() => {
  state = {
    status: 'idle',
    error: null,
  };
});

test('The error "some error" should be added', () => {
  const testTasksState = appReducer(state, setError('some error'));

  expect(testTasksState.error).toBe('some error');
  expect(testTasksState.status).toBe('idle');
  expect(state.error).toBe(null);
});

test('The status "loading" should be added', () => {
  const testTasksState = appReducer(state, setStatusApp('loading'));

  expect(testTasksState.status).toBe('loading');
  expect(testTasksState.error).toBe(null);
  expect(state.status).toBe('idle');
});
