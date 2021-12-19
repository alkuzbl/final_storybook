import { Grid, Paper } from '@mui/material';

import { AppStatusType } from '../../redux/app-reducer';
import { FilterType } from '../../redux/todolist-reducer';
import { FiltersButtons } from '../FiltersButton/FiltersButtons';

import { NewTask } from './Tasks/NewTask/NewTask';
import { Tasks } from './Tasks/Tasks';
import { TodolistTitle } from './TodolistTitle';

type TodoListPropsType = {
  todolistID: string;
  title: string;
  filter: FilterType;
  disabled?: AppStatusType;
};

export const TodoList = (props: TodoListPropsType) => {
  const { todolistID, title, filter, disabled } = props;

  const disabledTodolistWithTheStatus: {} =
    disabled === 'loading' ? { pointerEvents: 'none' } : {};

  return (
    <Grid item style={disabledTodolistWithTheStatus}>
      <Paper
        sx={{
          minHeight: 400,
          width: 300,
          padding: '5px',
        }}
      >
        <TodolistTitle title={title} todolistID={todolistID} />
        <FiltersButtons filter={filter} todolistID={todolistID} />
        <NewTask todolistID={todolistID} />
        <Tasks todolistID={todolistID} filter={filter} />
      </Paper>
    </Grid>
  );
};
