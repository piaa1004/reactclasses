import { useTheme } from '../contexts/ThemeContext';

function Content() {
  console.log('Content render');

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <main
      className={`content ${theme}`}
    >
      <h2>Content</h2>

      <p>
        현재 테마:
        {' '}
        <strong>{theme}</strong>
      </p>

      <button
        onClick={toggleTheme}
      >
        테마 변경
      </button>
    </main>
  );
}

export default Content;