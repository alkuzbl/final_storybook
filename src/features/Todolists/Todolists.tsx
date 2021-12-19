import React, { useEffect } from 'react';

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { FieldAddingNewElement } from '../../components/FieldAddingNewElement/FieldAddingNewElement';
import { setInitialization } from '../../redux/app-reducer';
import { RootStateType } from '../../redux/store';
import {
  createTodolistTC,
  InitialStateTodolistType,
  setTodolistsTC,
} from '../../redux/todolist-reducer';
import { TodoList } from '../TodoList/TodoList';

export const Todolists = () => {
  const todolist = useSelector<RootStateType, InitialStateTodolistType>(
    state => state.todolist,
  );
  const initialized = useSelector<RootStateType, boolean>(
    state => state.app.isInitialized,
  );
  const dispatch = useDispatch();
  // не работает
  useEffect(() => {
    console.log('init');
    dispatch(setInitialization());
  }, [initialized]);

  useEffect(() => {
    dispatch(setTodolistsTC());
  }, []);

  const addNewTodolist = (title: string) => {
    dispatch(createTodolistTC(title));
  };

  return (
    <>
      <FieldAddingNewElement
        onClickCallBack={addNewTodolist}
        label="Title for to-do list"
      />
      <Grid justifyContent="center" container spacing={1}>
        {todolist.map(t => (
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
