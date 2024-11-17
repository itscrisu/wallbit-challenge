import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../context/ThemeContext';

export const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <IconButton 
      onClick={toggleColorMode} 
      color="inherit"
      sx={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        transition: 'all 0.3s ease'
      }}
    >
      {theme.palette.mode === 'dark' ? (
        <LightMode sx={{ color: 'orange' }} />
      ) : (
        <DarkMode sx={{ color: '#666' }} />
      )}
    </IconButton>
  );
};