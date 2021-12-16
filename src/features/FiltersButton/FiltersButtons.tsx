import React from 'react';

import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';

import { changeFilterTodolist, FilterType } from '../../redux/todolist-reducer';

const filtersButton: FiltersButtonType = [
  { id: v1(), label: 'All', filter: 'all' },
  { id: v1(), label: 'Active', filter: 'active' },
  { id: v1(), label: 'Completed', filter: 'completed' },
];

type FilterButtonType = {
  id: string;
  label: string;
  filter: FilterType;
};
type FiltersButtonType = FilterButtonType[];
type FiltersButtonsPropsType = {
  filter: FilterType;
  todolistID: string;
};
export const FiltersButtons = (props: FiltersButtonsPropsType) => {
  const { filter, todolistID } = props;

  const dispatch = useDispatch();

  const onClick = (filterValue: FilterType) => {
    dispatch(changeFilterTodolist(todolistID, filterValue));
  };

  const styleForButtonsFlex = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  };
  return (
    <div style={styleForButtonsFlex}>
      {filtersButton.map(f => (
        <Button
          key={f.id}
          variant="contained"
          disabled={f.filter === filter}
          onClick={() => onClick(f.filter)}
        >
          {f.label}
        </Button>
      ))}
    </div>
  );
};
