import React, { ChangeEvent } from 'react';

import { Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';

import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan';
import { TaskStatuses } from '../../../../dal/api';
import { removeTaskTC, updateTaskTC } from '../../../../redux/tasks-reducer';

type TaskPropsType = {
  todolistID: string;
  title: string;
  status: TaskStatuses;
  id: string;
};

export const Task = (props: TaskPropsType) => {
  const { title, status, id, todolistID } = props;

  const dispatch = useDispatch();

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked
      ? { status: TaskStatuses.Completed }
      : { status: TaskStatuses.New };
    dispatch(updateTaskTC(todolistID, id, newStatus));
  };

  const onBlurEndEditSpanHandler = (value: string) =>
    dispatch(updateTaskTC(todolistID, id, { title: value }));

  const onClickRemoveHandler = () => dispatch(removeTaskTC(todolistID, id));

  const checked = status === TaskStatuses.Completed;

  return (
    <div style={{ display: 'flex' }}>
      <Checkbox checked={checked} size="small" onChange={changeStatus} />
      <EditableSpan
        title={title}
        onBlurCallBack={onBlurEndEditSpanHandler}
        onClickCallBack={onClickRemoveHandler}
        style={checked ? { opacity: '.5' } : {}}
      />
    </div>
  );
};
