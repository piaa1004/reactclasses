import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, resetUser } from '../actions/userActions';

export const UserInput = () => {
  const [inputId, setInputId] = useState('1');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputId.trim()) return;
    // Thunk 액션 디스패치
    dispatch(fetchUserById(inputId));
  };

  const handleReset = () => {
    setInputId('1');
    dispatch(resetUser());
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label htmlFor="userIdInput">조회할 사용자 ID (1 ~ 10):</label>
      <div className="input-group">
        <input
          id="userIdInput"
          type="number"
          min="1"
          max="10"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          disabled={loading}
          placeholder="ID 입력"
        />
        <button type="submit" className="btn-fetch" disabled={loading}>
          {loading ? '조회 중...' : '조회'}
        </button>
        <button
          type="button"
          className="btn-reset"
          onClick={handleReset}
          disabled={loading}
        >
          초기화
        </button>
      </div>
    </form>
  );
};