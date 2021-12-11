import React, { ChangeEvent, useEffect, useState } from 'react';

import { todolistAPI, TodolistType } from './api';

export default {
  title: 'API/API for working with todolists',
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<TodolistType[] | null>(null);

  useEffect(() => {
    todolistAPI.getTodolists().then(response => {
      setState(response.data);
      setTodolistId(response.data);
    });
  }, []);

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        {todolistId?.map(t => (
          <span key={t.id}>
            <b>Todolist - Id</b> - {t.id} , <b>Title:</b> {t.title} <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export const CreateTodolists = () => {
  const [state, setState] = useState<any>(null);
  const [value, setValue] = useState<string>('');

  const createNewTodolist = () => {
    todolistAPI.createTodolist(value).then(response => {
      setState(response.data.data.item);
    });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input type="text" value={value} onChange={onChangeHandler} />
        <button type="submit" onClick={createNewTodolist}>
          Add title
        </button>
      </div>
    </div>
  );
};

export const UpdateTodolists = () => {
  const [state, setState] = useState<any>(null);
  const [value, setValue] = useState<string>('');
  const [id, setId] = useState<string>('');

  const updateTodolist = () => {
    todolistAPI.updateTodolist(id, value).then(response => {
      setState(response.status);
      setValue('');
      setId('');
    });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);
  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => setId(e.currentTarget.value);

  return (
    <div>
      <b>HTTP status code</b> - {state}
      <div>
        <p>Title</p>
        <input type="text" value={value} onChange={onChangeHandler} />
        <p>TodolistId</p>
        <input type="text" value={id} onChange={onChangeId} />
        <button type="submit" onClick={updateTodolist}>
          Update title
        </button>
      </div>
    </div>
  );
};

export const RemoveTodolists = () => {
  const [state, setState] = useState<any>(null);
  const [id, setId] = useState<string>('');

  const removeTodolist = () => {
    todolistAPI
      .deleteTodolist(id)
      .then(response => {
        if (response.data.resultCode === 0) {
          setState(JSON.stringify(response.data));
          setId('');
        }
      })
      .catch(error => {
        setState(JSON.stringify(error));
      });
  };

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => setId(e.currentTarget.value);

  return (
    <div>
      <b>Response DATA</b> - {state}
      <div>
        <p>TodolistId</p>
        <input type="text" value={id} onChange={onChangeId} />
        <button type="submit" onClick={removeTodolist}>
          Remove todolist
        </button>
      </div>
    </div>
  );
};
