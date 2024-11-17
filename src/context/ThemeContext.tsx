import { CssBaseline, ThemeOptions } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';

export const ColorModeContext = createContext({ 
  toggleColorMode: () => {} 
});

const baseThemeConfig: ThemeOptions = {
  typography: {
    fontFamily: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'all 0.3s ease',
        },
      },
    },
  },
};

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme-mode', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...baseThemeConfig,
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#1976d2' : '#90caf9',
          },
          secondary: {
            main: mode === 'light' ? '#dc004e' : '#f48fb1',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
      } as ThemeOptions),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};