import React from 'react';

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootStateType } from '../../redux/store';
import { loginValidationCheck } from '../../utils/formValidationCheck - helper';

import { setLogin } from './auth-reducer';

export const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: value => loginValidationCheck(value),
    onSubmit: values => {
      dispatch(setLogin(values));
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={2}>
        <form onSubmit={formik.handleSubmit}>
          <FormLabel>
            <FormGroup>
              <TextField
                error={!!formik.errors.email}
                label={formik.errors.email ? formik.errors.email : 'Email'}
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              <TextField
                error={!!formik.errors.password}
                label={formik.errors.password ? formik.errors.password : 'Password'}
                margin="normal"
                type="password"
                {...formik.getFieldProps('password')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps('rememberMe')}
                  />
                }
                label="RememberMe"
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormLabel>
        </form>
      </Grid>
    </Grid>
  );
};
