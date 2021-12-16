import React from 'react';

import { useDispatch } from 'react-redux';

import { FieldAddingNewElement } from '../../../../components/common/FieldAddingNewElement';
import { createTaskTC } from '../../../../redux/tasks-reducer';

type NewTaskPropsType = {
  todolistID: string;
};
export const NewTask = (props: NewTaskPropsType) => {
  const { todolistID } = props;

  const dispatch = useDispatch();

  const addNewTask = (title: string) => {
    dispatch(createTaskTC(todolistID, title));
  };

  return (
    <div>
      <FieldAddingNewElement onClickCallBack={addNewTask} />
    </div>
  );
};
