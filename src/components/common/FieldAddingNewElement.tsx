import React, { ChangeEvent, useState } from 'react';

import { Button, TextField } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type DefaultProps = TextFieldProps & ButtonProps;
type FieldAddingNewElementPropsType = DefaultProps & {
  onClickCallBack: (title: string) => void;
  label?: string;
};

export const FieldAddingNewElement = (props: FieldAddingNewElementPropsType) => {
  const { onClickCallBack, label } = props;

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

  const styleForElementMargin = {
    marginBottom: '20px',
  };

  return (
    <div style={styleForElementMargin}>
      <TextField
        error={!!error}
        id="outlined-basic"
        label={label || ''}
        variant="outlined"
        onChange={onChangeHandler}
        value={value}
      />
      <Button
        variant="outlined"
        onClick={onClickHandler}
        disabled={!!error}
        style={{ padding: '15px' }}
      >
        +
      </Button>
    </div>
  );
};
