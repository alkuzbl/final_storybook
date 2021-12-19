import * as React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

import { setError } from '../../redux/app-reducer';
import { RootStateType } from '../../redux/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorBar = () => {
  const dispatch = useDispatch();
  const error = useSelector<RootStateType, any>(state => state.app.error);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      dispatch(setError(null));
    }
    dispatch(setError(null));
  };

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
