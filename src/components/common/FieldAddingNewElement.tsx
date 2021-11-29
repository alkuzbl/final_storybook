import React, { ChangeEvent, useState } from 'react';

import { Button, TextField } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type DefaultProps = TextFieldProps & ButtonProps;
type FieldAddingNewElementPropsType = DefaultProps & {
  onClickCallBack: (title: string) => void;
};
export const FieldAddingNewElement = (props: FieldAddingNewElementPropsType) => {
  const { onClickCallBack } = props;

  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onClickHandler = () => {
    if (value) {
      onClickCallBack(value);
      setValue('');
    } else {
      setError('This field is required ');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    if (error) {
      setError('');
    }
  };

  return (
    <>
      <TextField
        error={!!error}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={onChangeHandler}
        value={value}
      />
      <Button variant="text" onClick={onClickHandler} disabled={!!error}>
        +
      </Button>
    </>
  );
};
