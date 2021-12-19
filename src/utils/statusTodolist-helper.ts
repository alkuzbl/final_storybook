import { Dispatch } from 'redux';

import { AppStatusType, setStatusApp } from '../redux/app-reducer';
import { setStatusTodolist } from '../redux/todolist-reducer';

export const setWithTheStatus = (
  id: string,
  status: AppStatusType,
  dispatch: Dispatch,
) => {
  dispatch(setStatusApp(status));
  dispatch(setStatusTodolist(id, status));
};
