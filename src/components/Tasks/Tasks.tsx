import React from 'react';

import { useSelector } from 'react-redux';

import { RootStateType } from '../../redux/store';
import { InitialStateTasksType } from '../../redux/tasksReducer';

import { Task } from './Task/Task';

export const Tasks = () => {
  const tasks = useSelector<RootStateType, InitialStateTasksType>(state => state.tasks);
  return (
    <div>
      {tasks.map(t => (
        <Task key={t.id} id={t.id} title={t.title} isDone={t.isDone} />
      ))}
    </div>
  );
};
