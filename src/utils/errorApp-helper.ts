import { Dispatch } from 'redux';

import { AppStatusType, setError, setStatusApp } from '../redux/app-reducer';
import { setStatusTodolist } from '../redux/todolist-reducer';

export const errorsAppHandler = (
  err: { message: string },
  dispatch: Dispatch,
  status: AppStatusType,
) => {
  dispatch(setError(err.message));
  dispatch(setStatusApp(status));
};

export const errorsTodolistHandler = (
  err: { message: string },
  dispatch: Dispatch,
  id: string,
  status: AppStatusType,
) => {
  dispatch(setError(err.message));
  dispatch(setStatusApp(status));
  dispatch(setStatusTodolist(id, status));
};
