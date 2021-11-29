import React, { ChangeEvent, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TextField } from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton/IconButton';
import { SvgIconProps } from '@mui/material/SvgIcon/SvgIcon';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type DefaultPropsType = IconButtonProps & TextFieldProps & SvgIconProps;
type EditableSpanPropsType = DefaultPropsType & {
  title: string;
  onBlurCallBack: (value: string) => void;
  onClickCallBack: () => void;
  style?: {};
};
export const EditableSpan = (props: EditableSpanPropsType) => {
  const { title, onClickCallBack, onBlurCallBack, style } = props;

  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const onDoubleClickEditSpanHandler = () => {
    setEditing(true);
    setValue(title);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };

  const onBlur = () => {
    setEditing(false);
    onBlurCallBack(value);
  };

  const onClick = () => {
    onClickCallBack();
    setEditing(false);
  };

  const styleComponent = {} && style;

  return (
    <>
      {!editing && (
        <span onDoubleClick={onDoubleClickEditSpanHandler} style={styleComponent}>
          {title}
        </span>
      )}
      {editing && (
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={value}
          onChange={onChange}
          autoFocus
          onBlur={onBlur}
        />
      )}
      <IconButton aria-label="delete" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};
