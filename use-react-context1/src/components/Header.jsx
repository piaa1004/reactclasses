// src/components/Header.jsx
import { useTheme } from '../context/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();

  console.log('Header render');

  return (
    <header>
      <h1>React useContext Demo</h1>

      <p>현재 테마: {theme}</p>

      <button onClick={toggleTheme}>
        테마 변경
      </button>
    </header>
  );
}

export default Header;