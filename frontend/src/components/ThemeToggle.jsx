import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => (
  <IconButton onClick={toggleDarkMode} color="inherit">
    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
  </IconButton>
);

export default ThemeToggle;
