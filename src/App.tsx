import React from 'react';

import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { v1 } from 'uuid';

import { FieldAddingNewElement } from './components/common/FieldAddingNewElement';
import { TodoList } from './components/TodoList';
import { RootStateType } from './redux/store';
import { addTodolist, InitialStateTodolistType } from './redux/todolistReducer';

const App = () => {
  const todolist = useSelector<RootStateType, InitialStateTodolistType>(
    state => state.todolist,
  );

  const dispatch = useDispatch();

  const addNewTodolist = (title: string) => {
    const id = v1();
    dispatch(addTodolist(id, title));
  };

  return (
    <div className="App">
      <div>
        <FieldAddingNewElement onClickCallBack={addNewTodolist} />
      </div>
      {todolist.map(t => (
        <TodoList key={t.id} title={t.title} todolistID={t.id} filter={t.filter} />
      ))}
    </div>
  );
};

export default App;
