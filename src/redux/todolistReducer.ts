export const ADD_TODOLIST = 'ADD_TODOLIST';
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const UPDATE_TITLE_TODOLIST = 'UPDATE_TITLE_TODOLIST';
const CHANGE_FILTER_TODOLIST = 'CHANGE_FILTER_TODOLIST';
export type FilterType = 'all' | 'active' | 'completed';
type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};
export type InitialStateTodolistType = TodolistType[];
const initialStateTodolist: InitialStateTodolistType = [];

export const todolistReducer = (
  state: InitialStateTodolistType = initialStateTodolist,
  action: ActionType,
): InitialStateTodolistType => {
  switch (action.type) {
    case ADD_TODOLIST:
      return [...state, { id: action.id, title: action.title, filter: 'all' }];
    case REMOVE_TODOLIST:
      return state.filter(s => s.id !== action.id);
    case UPDATE_TITLE_TODOLIST:
      return state.map(s => (s.id === action.id ? { ...s, title: action.title } : s));
    case CHANGE_FILTER_TODOLIST:
      return state.map(s => (s.id === action.id ? { ...s, filter: action.filter } : s));
    default:
      return state;
  }
};
export type AddTodolistType = ReturnType<typeof addTodolist>;
export type RemoveTodolistType = ReturnType<typeof removeTodolist>;
type UpdateTitleTodolistType = ReturnType<typeof updateTitleTodolist>;
type ChangeFilterTodolistType = ReturnType<typeof changeFilterTodolist>;
type ActionType =
  | AddTodolistType
  | RemoveTodolistType
  | UpdateTitleTodolistType
  | ChangeFilterTodolistType;
export const addTodolist = (id: string, title: string) =>
  ({ type: ADD_TODOLIST, id, title } as const);
export const removeTodolist = (id: string) => ({ type: REMOVE_TODOLIST, id } as const);
export const updateTitleTodolist = (id: string, title: string) =>
  ({ type: UPDATE_TITLE_TODOLIST, id, title } as const);
export const changeFilterTodolist = (id: string, filter: FilterType) =>
  ({ type: CHANGE_FILTER_TODOLIST, id, filter } as const);
