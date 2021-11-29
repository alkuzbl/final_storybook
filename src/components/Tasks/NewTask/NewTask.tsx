import React from 'react';

import { useDispatch } from 'react-redux';

import { addTask } from '../../../redux/tasksReducer';
import { FieldAddingNewElement } from '../../common/FieldAddingNewElement';

type NewTaskPropsType = {
  todolistID: string;
};
export const NewTask = (props: NewTaskPropsType) => {
  const { todolistID } = props;

  const dispatch = useDispatch();

  const addNewTask = (title: string) => {
    dispatch(addTask(todolistID, title));
  };

  return (
    <div>
      <FieldAddingNewElement onClickCallBack={addNewTask} />
    </div>
  );
};
