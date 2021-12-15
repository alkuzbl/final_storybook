import React, { useEffect } from 'react';

import './App.css';

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { FieldAddingNewElement } from '../components/common/FieldAddingNewElement';
import { Header } from '../features/Header/Header';
import { TodoList } from '../features/TodoList/TodoList';
import { RootStateType } from '../redux/store';
import {
  createTodolistTC,
  getTodolistsTC,
  InitialStateTodolistType,
} from '../redux/todolistReducer';

const App = () => {
  const todolist = useSelector<RootStateType, InitialStateTodolistType>(
    state => state.todolist,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodolistsTC());
  }, []);

  const addNewTodolist = (title: string) => {
    dispatch(createTodolistTC(title));
  };

  return (
    <div className="App">
      <Header />
      <div className="App-container">
        <FieldAddingNewElement
          onClickCallBack={addNewTodolist}
          label="Title for to-do list"
        />
        <Grid justifyContent="center" container spacing={1}>
          {todolist.map(t => (
            <TodoList key={t.id} title={t.title} todolistID={t.id} filter={t.filter} />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default App;
