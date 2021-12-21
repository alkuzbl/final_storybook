import { Dispatch } from 'redux';

import { authAPI, AuthDataType } from '../../dal/api';
import { setError, setStatusApp } from '../../redux/app-reducer';
import { clearState } from '../../redux/todolist-reducer';
import { errorsAppHandler } from '../../utils/errorApp-helper';

const SET_IS_LOGGED_IN = 'login/SET_IS_LOGGED_IN';

const initialState = {
  isLoggedIn: false,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionType,
): InitialStateType => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// actions
export const setIsLoggedIn = (isLoggedIn: boolean) =>
  ({ type: SET_IS_LOGGED_IN, payload: { isLoggedIn } } as const);

// thanks
export const setLogin = (loginFormData: AuthDataType) => async (dispatch: Dispatch) => {
  try {
    dispatch(setStatusApp('loading'));
    const res = await authAPI.setLogin(loginFormData);
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setError(res.data.messages[0]));
    }
    dispatch(setStatusApp('succeeded'));
  } catch (err: any) {
    errorsAppHandler(err, dispatch, 'failed');
  }
};

export const setLogOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setStatusApp('loading'));
    const res = await authAPI.logOut();
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn(false));
      dispatch(clearState());
    } else {
      dispatch(setError(res.data.messages[0]));
    }
    dispatch(setStatusApp('succeeded'));
  } catch (err: any) {
    errorsAppHandler(err, dispatch, 'failed');
  }
};

// types
type InitialStateType = {
  isLoggedIn: boolean;
};
type ActionType = ReturnType<typeof setIsLoggedIn>;
