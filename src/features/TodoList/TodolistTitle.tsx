import React from 'react';

import { useDispatch } from 'react-redux';

import { EditableSpan } from '../../components/EditableSpan/EditableSpan';
import { removeTodolistTC, updateTitleTodolistTC } from '../../redux/todolist-reducer';

type TodolistTitlePropsType = {
  title: string;
  todolistID: string;
};

export const TodolistTitle = (props: TodolistTitlePropsType) => {
  const { title, todolistID } = props;
  const dispatch = useDispatch();

  const deleteTodolist = () => {
    dispatch(removeTodolistTC(todolistID));
  };

  const updateTitle = (value: string) => {
    dispatch(updateTitleTodolistTC(todolistID, value));
  };

  const styleForTitle = { marginBottom: '10px' };
  return (
    <EditableSpan
      onBlurCallBack={updateTitle}
      onClickCallBack={deleteTodolist}
      title={title}
      style={styleForTitle}
      label="Update task"
    />
  );
};
