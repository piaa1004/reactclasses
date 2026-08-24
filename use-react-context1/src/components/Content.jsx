// src/components/Content.jsx
import { useTheme } from '../context/ThemeContext';

function Content() {
  const { theme } = useTheme();

  console.log('Content render');

  const style = {
    padding: '30px',
    backgroundColor: theme === 'light' ? '#ffffff' : '#222222',
    color: theme === 'light' ? '#222222' : '#ffffff',
  };

  return (
    <section style={style}>
      <h2>Content</h2>
      <p>현재 테마: {theme}</p>
    </section>
  );
}

export default Content;