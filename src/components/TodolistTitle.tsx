import React from 'react';

import { useDispatch } from 'react-redux';

import { removeTodolist, updateTitleTodolist } from '../redux/todolistReducer';

import { EditableSpan } from './common/EditableSpan';

type TodolistTitlePropsType = {
  title: string;
  todolistID: string;
};

export const TodolistTitle = (props: TodolistTitlePropsType) => {
  const { title, todolistID } = props;

  const dispatch = useDispatch();

  const deleteTodolist = () => {
    dispatch(removeTodolist(todolistID));
  };

  const updateTitle = (value: string) => {
    dispatch(updateTitleTodolist(todolistID, value));
  };

  return (
    <EditableSpan
      onBlurCallBack={updateTitle}
      onClickCallBack={deleteTodolist}
      title={title}
    />
  );
};
