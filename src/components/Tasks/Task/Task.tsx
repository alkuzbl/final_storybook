import React from 'react';

import { Checkbox } from '@mui/material';

import { TaskType } from '../../../redux/tasksReducer';

type TaskPropsType = TaskType;
export const Task = (props: TaskPropsType) => {
  const { title, isDone } = props;
  return (
    <div>
      <Checkbox checked={isDone} size="small" /> <span>{title}</span>
    </div>
  );
};
