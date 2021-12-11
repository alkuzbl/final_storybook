import React from 'react';

import { useDispatch } from 'react-redux';

import { removeTodolistTC, updateTitleTodolistTC } from '../redux/todolistReducer';

import { EditableSpan } from './common/EditableSpan';

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
