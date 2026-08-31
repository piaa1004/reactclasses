import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../actions/userActions';

export const UserProfile = () => {
  const [userIdInput, setUserIdInput] = useState('1');
  const dispatch = useDispatch();

  const { data: user, loading, error } = useSelector((state) => state.user);

  const handleFetch = () => {
    // Thunk 생성자를 호출하여 반환된 Thunk 함수를 dispatch에 전달
    dispatch(fetchUserById(userIdInput));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>사용자 조회 (Legacy Redux Thunk)</h2>
      
      <input
        type="number"
        value={userIdInput}
        onChange={(e) => setUserIdInput(e.target.value)}
        min="1"
        max="10"
      />
      <button onClick={handleFetch} disabled={loading} style={{ marginLeft: '8px' }}>
        {loading ? '조회 중...' : '조회하기'}
      </button>

      {error && <p style={{ color: 'red' }}>에러: {error}</p>}

      {user && (
        <div style={{ marginTop: '16px', border: '1px solid #ccc', padding: '12px' }}>
          <h3>{user.name}</h3>
          <p>이메일: {user.email}</p>
          <p>전화번호: {user.phone}</p>
          <p>웹사이트: {user.website}</p>
        </div>
      )}
    </div>
  );
};