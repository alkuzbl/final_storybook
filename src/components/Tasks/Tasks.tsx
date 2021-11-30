import React from 'react';

import { useSelector } from 'react-redux';

import { RootStateType } from '../../redux/store';
import { TaskType } from '../../redux/tasksReducer';
import { FilterType } from '../../redux/todolistReducer';

import { Task } from './Task/Task';

type TasksPropsType = {
  todolistID: string;
  filter: FilterType;
};
export const Tasks = React.memo((props: TasksPropsType) => {
  const { todolistID, filter } = props;

  const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[todolistID]);

  let filterTasks = tasks;

  if (filter === 'active') {
    filterTasks = tasks.filter(t => !t.isDone);
  }
  if (filter === 'completed') {
    filterTasks = tasks.filter(t => t.isDone);
  }

  return (
    <>
      {filterTasks.map(t => (
        <Task
          key={t.id}
          id={t.id}
          title={t.title}
          isDone={t.isDone}
          todolistID={todolistID}
        />
      ))}
    </>
  );
});
