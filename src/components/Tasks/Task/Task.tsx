import React, { ChangeEvent } from 'react';

import { Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';

import {
  changeStatusTask,
  removeTask,
  TaskType,
  updateTask,
} from '../../../redux/tasksReducer';
import { EditableSpan } from '../../common/EditableSpan';

type TaskPropsType = TaskType & {
  todolistID: string;
};

export const Task = (props: TaskPropsType) => {
  const { title, isDone, id, todolistID } = props;

  const dispatch = useDispatch();

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeStatusTask(todolistID, id, e.currentTarget.checked));
  };

  const onBlurEndEditSpanHandler = (value: string) =>
    dispatch(updateTask(todolistID, id, value));

  const onClickRemoveHandler = () => dispatch(removeTask(todolistID, id));

  return (
    <div>
      <Checkbox checked={isDone} size="small" onChange={changeStatus} />
      <EditableSpan
        title={title}
        onBlurCallBack={onBlurEndEditSpanHandler}
        onClickCallBack={onClickRemoveHandler}
        style={isDone ? { opacity: '.5' } : {}}
      />
    </div>
  );
};
