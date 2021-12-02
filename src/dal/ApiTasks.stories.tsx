import React, { ChangeEvent, useEffect, useState } from 'react';

import { ModelTaskAPIType, TaskAPIType, todolistAPI } from './api';

export default {
  title: 'API/API for working with tasks',
};

type GetDataPropsType = {
  id: string;
};
const GetData = ({ id }: GetDataPropsType) => {
  const [tasks, setTasks] = useState<TaskAPIType[] | null>(null);
  const getTasks = () => {
    todolistAPI.getTasks(id, 10, 1).then(response => {
      setTasks(response.data.items);
    });
  };
  return (
    <div>
      <h3>Title and id tasks</h3>
      <p>(Enter the todolistId)</p>
      <button type="submit" onClick={getTasks} disabled={!id}>
        Get tasks
      </button>

      {tasks?.map(t => (
        <div key={t.id}>
          <span>
            <b>Title</b> - {t.title} ; <b>Id</b> - {t.id}
          </span>
        </div>
      ))}
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<TaskAPIType[] | null>(null);
  const [todolistId, setTodolistId] = useState<string[] | null>(null);

  useEffect(() => {
    todolistAPI.getTodolists().then(response => {
      setTodolistId(response.data.map(t => t.id));
    });
  }, []);

  const getTasks = (taskId: string) => {
    todolistAPI.getTasks(taskId, 10, 1).then(response => {
      setState(response.data.items);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        {todolistId?.map(t => (
          <div key={t}>
            <span>
              <b>Todolist - Id</b> - {t} <br />
              <button type="submit" onClick={() => getTasks(t)}>
                Get tasks
              </button>
            </span>
            <div>
              {state?.map(task => (
                <div key={task.id}>
                  <span>
                    <b>TaskId</b> - {task.id} <b>Task title</b> - {task.title}{' '}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [value, setValue] = useState<string>('');
  const [id, setId] = useState<string>('');
  const createTask = () => {
    todolistAPI.createTask(id, value).then(response => {
      setState(response.data.data);
    });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);
  const onChangeIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <p>Title</p>
        <input type="text" value={value} onChange={onChangeHandler} />
        <p>todolistId</p>
        <input type="text" value={id} onChange={onChangeIdHandler} />
        <button type="submit" onClick={createTask}>
          Add task
        </button>
      </div>
      <GetData id={id} />
    </div>
  );
};

export const RemoveTask = () => {
  const [state, setState] = useState<any>(null);
  const [id, setId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const removeTask = () => {
    todolistAPI
      .deleteTask(id, taskId)
      .then(response => {
        if (response.data.resultCode === 0) {
          setState(JSON.stringify(response.data));
          setTaskId('');
        }
      })
      .catch(error => {
        setState(JSON.stringify(error));
      });
  };

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => setId(e.currentTarget.value);

  const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskId(e.currentTarget.value);

  return (
    <div>
      <b>Response DATA</b> - {state}
      <div>
        <p>TodolistId</p>
        <input type="text" value={id} onChange={onChangeId} />
        <p>TaskId</p>
        <input type="text" value={taskId} onChange={onChangeTaskId} />
        <button type="submit" onClick={removeTask}>
          Remove task
        </button>
      </div>
      <GetData id={id} />
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [id, setId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const date = new Date();
  const modelTask: ModelTaskAPIType = {
    title: 'jjj',
    description: 'lkhikhkl',
    completed: false,
    status: 0,
    priority: 0,
    startDate: date,
    deadline: date,
  };
  const updateTask = () => {
    todolistAPI
      .updateTask(id, taskId, modelTask)
      .then(response => {
        if (response.data.resultCode === 0) {
          setState(JSON.stringify(response.data));
          setTaskId('');
        }
      })
      .catch(error => {
        setState(JSON.stringify(error));
      });
  };

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => setId(e.currentTarget.value);

  const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskId(e.currentTarget.value);

  return (
    <div>
      <b>Response DATA</b> - {state}
      <div>
        <p>TodolistId</p>
        <input type="text" value={id} onChange={onChangeId} />
        <p>TaskId</p>
        <input type="text" value={taskId} onChange={onChangeTaskId} />
        <button type="submit" onClick={updateTask}>
          Remove task
        </button>
      </div>
      <GetData id={id} />
    </div>
  );
};
