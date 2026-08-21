import React from 'react';

// const count = 0;

const Header = ({ title, subtitle }) => {

  // count++;
  
  return (
    <header style={{ background: '#333', color: '#fff', padding: '20px' }}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
};

export default Header;
