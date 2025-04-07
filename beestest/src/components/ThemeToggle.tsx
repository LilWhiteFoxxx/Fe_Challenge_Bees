import React from 'react';

import { Box, Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useThemeMode } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <LightModeIcon sx={{ color: isDark ? '#888' : '#ff8228' }} />
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        sx={{
          '& .MuiSwitch-thumb': {
            backgroundColor: isDark ? '#90caf9' : '#ff8228',
          },
          '& .MuiSwitch-track': {
            backgroundColor: isDark ? '#444' : '#ccc',
          },
        }}
      />
      <DarkModeIcon sx={{ color: isDark ? '#90caf9' : '#aaa' }} />
    </Box>
  );
};

export default ThemeToggle;
