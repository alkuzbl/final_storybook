import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { LinearProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from 'react-redux';

import { InitStateAppType } from '../../redux/app-reducer';
import { RootStateType } from '../../redux/store';

const styleForHeaderMargin = { marginBottom: '20px' };

const ButtonAppBar = () => {
  const appData = useSelector<RootStateType, InitStateAppType>(state => state.app);
  const { status, isInitialized } = appData;

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
          {isInitialized && <Button color="inherit">Log out</Button>}
        </Toolbar>
      </AppBar>
      <div style={{ height: '4px', backgroundColor: '#1976d2' }}>
        {status === 'loading' && <LinearProgress color="secondary" />}
      </div>
    </Box>
  );
};

export const Header = () => <ButtonAppBar />;
