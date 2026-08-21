import React from 'react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {

  const togglehandler = function (prev) {
    setDarkMode(prev => !prev);
  };

  return (
    <section style={{ marginTop: '30px' }}>
      <h2>🎨 테마 토글</h2>
      {/* <button onClick={() => setDarkMode(prev => !prev)}>
        {darkMode ? '라이트 모드' : '다크 모드'} 전환
      </button> */}
      <button onClick={togglehandler}>
        {darkMode ? '라이트 모드' : '다크 모드'} 전환
      </button>
    </section>
  );
};

export default ThemeToggle;
