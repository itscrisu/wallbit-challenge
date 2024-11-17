import React from 'react';
import ProgrammerCart from './components/ProgrammerCart';
import { ThemeToggle } from './components/common/ThemeToggle';
import { ThemeContextProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <ThemeToggle />
      <ProgrammerCart />
    </ThemeContextProvider>
  );
};

export default App;