import { Dispatch } from 'redux';

import { authAPI } from '../../dal/api';
import { setError, setStatusApp } from '../../redux/app-reducer';
import { errorsAppHandler } from '../../utils/errorApp-helper';

const SET_IS_LOGGED_IN = 'login/SET_IS_LOGGED_IN';

type InitialStateType = {
  isLoggedIn: boolean;
};

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

// type setAppInitializedType = ReturnType<typeof setAppInitialized>;
type ActionType = ReturnType<typeof setIsLoggedIn>;

export const setLogin =
  (loginFormData: { email: string; password: string; rememberMe: boolean }) =>
  (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'));
    authAPI
      .setLogin(loginFormData)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedIn(true));
          dispatch(setStatusApp('idle'));
        } else {
          dispatch(setError(res.data.messages[0]));
          dispatch(setStatusApp('idle'));
        }
      })
      .catch(err => errorsAppHandler(err, dispatch, 'idle'));
  };

export const setLogOut = () => (dispatch: Dispatch) => {
  dispatch(setStatusApp('loading'));
  authAPI
    .logOut()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn(false));
        dispatch(setStatusApp('idle'));
      } else {
        dispatch(setError(res.data.messages[0]));
        dispatch(setStatusApp('idle'));
      }
    })
    .catch(err => errorsAppHandler(err, dispatch, 'idle'));
};
