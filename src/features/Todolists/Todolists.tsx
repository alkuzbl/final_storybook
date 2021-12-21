import React, { useEffect } from 'react';

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { FieldAddingNewElement } from '../../components/FieldAddingNewElement/FieldAddingNewElement';
import { RootStateType } from '../../redux/store';
import {
  createTodolistTC,
  InitialStateTodolistType,
  setTodolistsTC,
} from '../../redux/todolist-reducer';
import { TodoList } from '../TodoList/TodoList';

export const Todolists = () => {
  const todolists = useSelector<RootStateType, InitialStateTodolistType>(
    state => state.todolist,
  );
  const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(setTodolistsTC());
  }, []);

  const addNewTodolist = (title: string) => {
    dispatch(createTodolistTC(title));
  };

  if (!isLoggedIn) {
    return <Navigate to="login" />;
  }

  return (
    <>
      <FieldAddingNewElement
        onClickCallBack={addNewTodolist}
        label="Title for to-do list"
      />
      <Grid justifyContent="center" container spacing={1}>
        {todolists.map(t => (
          <TodoList
            key={t.id}
            title={t.title}
            todolistID={t.id}
            filter={t.filter}
            disabled={t.status}
          />
        ))}
      </Grid>
    </>
  );
};
