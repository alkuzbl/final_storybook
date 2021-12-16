import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { LinearProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

import { AppStatusType } from '../../redux/app-reducer';
import { RootStateType } from '../../redux/store';

const styleForHeaderMargin = { marginBottom: '20px' };

const ButtonAppBar = () => {
  const appStatus = useSelector<RootStateType, AppStatusType>(state => state.app.status);
  return (
    <Box sx={{ flexGrow: 1 }} style={styleForHeaderMargin}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: '4px', backgroundColor: '#1976d2' }}>
        {appStatus === 'loading' && <LinearProgress color="secondary" />}
      </div>
    </Box>
  );
};

export const Header = () => <ButtonAppBar />;
