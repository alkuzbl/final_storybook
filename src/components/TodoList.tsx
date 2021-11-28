import React from 'react';

import { FiltersButtons } from './FiltersButton/FiltersButtons';
import { NewTask } from './Tasks/NewTask/NewTask';
import { Tasks } from './Tasks/Tasks';

export const TodoList = () => (
  <div>
    <h3>What to learn</h3>
    <NewTask />
    <Tasks />
    <FiltersButtons />
  </div>
);
