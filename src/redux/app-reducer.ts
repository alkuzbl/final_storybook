const APP_SET_ERROR = 'App/SET_ERROR';
const APP_SET_STATUS = 'App/SET_STATUS';

const initStateApp: InitStateAppType = {
  status: 'idle',
  error: null,
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
    default:
      return state;
  }
};

// actions
export const setError = (error: null | string) =>
  ({ type: APP_SET_ERROR, payload: { error } } as const);
export const setStatusApp = (status: AppStatusType) =>
  ({ type: APP_SET_STATUS, payload: { status } } as const);

// types
export type InitStateAppType = {
  status: AppStatusType;
  error: string | null;
};
type SetErrorType = ReturnType<typeof setError>;
type SetStatusAppType = ReturnType<typeof setStatusApp>;
type ActionType = SetErrorType | SetStatusAppType;

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
