import { Grid, Paper } from '@mui/material';

import { FilterType } from '../../redux/todolistReducer';
import { FiltersButtons } from '../FiltersButton/FiltersButtons';

import { NewTask } from './Tasks/NewTask/NewTask';
import { Tasks } from './Tasks/Tasks';
import { TodolistTitle } from './TodolistTitle';

type TodoListPropsType = {
  todolistID: string;
  title: string;
  filter: FilterType;
};

export const TodoList = (props: TodoListPropsType) => {
  const { todolistID, title, filter } = props;

  return (
    <Grid item>
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
