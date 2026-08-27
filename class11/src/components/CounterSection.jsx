import React, { useState, useCallback } from 'react';
import ChildButton from './ChildButton';

function CounterSection() {
  const [count, setCount] = useState(0);  // setCount 함수에게 전달될 수 있는 아규먼트는? 정수값 또는 콜백함수...
  const [toggle, setToggle] = useState(false);

  // count = count + 1; 아무 의미 없음

  // 매번 새로운 함수가 생성되지 않도록 useCallback 사용
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const toggleState = () => {
    setToggle((prev) => !prev);
  };

  return (
    <section>
      <h2>🔁 useCallback 최적화</h2>
      <p>카운트: {count}</p>
      <ChildButton onClick={handleIncrement} label="카운트 증가" />
      <button onClick={toggleState} style={{ marginLeft: '10px' }}>
        상태 토글: {toggle ? 'ON' : 'OFF'}
      </button>
    </section>
  );
}

export default CounterSection;
