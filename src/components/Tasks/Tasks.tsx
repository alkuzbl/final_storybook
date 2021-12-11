import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TaskStatuses, TaskType } from '../../dal/api';
import { RootStateType } from '../../redux/store';
import { getTasksTC } from '../../redux/tasksReducer';
import { FilterType } from '../../redux/todolistReducer';

import { Task } from './Task/Task';

type TasksPropsType = {
  todolistID: string;
  filter: FilterType;
};
export const Tasks = React.memo((props: TasksPropsType) => {
  const { todolistID, filter } = props;

  const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[todolistID]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksTC(todolistID));
  }, []);

  let filterTasks = tasks;

  if (filter === 'active') {
    filterTasks = tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (filter === 'completed') {
    filterTasks = tasks.filter(t => t.status === TaskStatuses.Completed);
  }

  return (
    <>
      {filterTasks.map(t => (
        <Task
          key={t.id}
          id={t.id}
          title={t.title}
          status={t.status}
          todolistID={todolistID}
        />
      ))}
    </>
  );
});
