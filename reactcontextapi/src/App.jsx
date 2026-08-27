import { useMemo, useState } from 'react';

import {
  UserContext,
} from './contexts/UserContext';

import {
  ThemeContext,
} from './contexts/ThemeContext';

import Layout from './components/Layout';

function App() {
  const [user, setUser] = useState({
    name: '홍길동',
    role: 'admin',
  });

  const [theme, setTheme] = useState('light');

  const logout = () => {
    setUser(null);
  };

  const login = () => {
    setUser({
      name: '홍길동',
      role: 'admin',
    });
  };

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'light'
        ? 'dark'
        : 'light'
    );
  };

  const userValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <UserContext value={userValue}>
      <ThemeContext value={themeValue}>
        <Layout />
      </ThemeContext>
    </UserContext>
  );
}

export default App;