// src/components/Main.jsx
import Content from './Content';

function Main() {
  console.log('Main render');

  return (
    <main>
      <h2>Main</h2>
      <Content />
    </main>
  );
}

export default Main;