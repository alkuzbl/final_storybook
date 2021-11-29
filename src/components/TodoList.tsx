import React from 'react';

import { FilterType } from '../redux/todolistReducer';

import { FiltersButtons } from './FiltersButton/FiltersButtons';
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
    <div>
      <TodolistTitle title={title} todolistID={todolistID} />
      <NewTask todolistID={todolistID} />
      <Tasks todolistID={todolistID} filter={filter} />
      <FiltersButtons filter={filter} todolistID={todolistID} />
    </div>
  );
};
