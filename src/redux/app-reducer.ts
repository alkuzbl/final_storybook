import { Dispatch } from 'redux';

import { authAPI } from '../dal/api';
import { setIsLoggedIn } from '../features/Login/auth-reducer';

const APP_SET_ERROR = 'App/SET_ERROR';
const APP_SET_STATUS = 'App/SET_STATUS';
const SET_APP_INITIALIZED = 'App/SET_APP_INITIALIZED';

const initStateApp: InitStateAppType = {
  status: 'idle',
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state = initStateApp,
  action: ActionType,
): InitStateAppType => {
  switch (action.type) {
    case APP_SET_ERROR:
      return { ...state, ...action.payload };
    case APP_SET_STATUS:
      return { ...state, ...action.payload };
    case SET_APP_INITIALIZED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// actions
export const setError = (error: null | string) =>
  ({ type: APP_SET_ERROR, payload: { error } } as const);
export const setStatusApp = (status: AppStatusType) =>
  ({ type: APP_SET_STATUS, payload: { status } } as const);
export const setAppInitialized = (isInitialized: boolean) =>
  ({ type: SET_APP_INITIALIZED, payload: { isInitialized } } as const);

// types
export type InitStateAppType = {
  status: AppStatusType;
  error: string | null;
  isInitialized: boolean;
};
type SetErrorType = ReturnType<typeof setError>;
type SetStatusAppType = ReturnType<typeof setStatusApp>;
type setAppInitializedType = ReturnType<typeof setAppInitialized>;
type ActionType = SetErrorType | SetStatusAppType | setAppInitializedType;

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const initializeApp = () => (dispatch: Dispatch) => {
  authAPI
    .getAuthMe()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn(true));
      }
      // разобраться - не понимаю
      dispatch(setAppInitialized(true));
    })
    .catch(err => dispatch(setError(err.message)));
};
