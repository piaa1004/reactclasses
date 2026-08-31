// src/App.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { UserInput } from './components/UserInput';
import { UserCard } from './components/UserCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import './App.css';

export default function App() {  // 👈 'export default'가 붙어있는지 확인
  const loading = useSelector((state) => state.user?.loading);

  return (
    <div className="app-container">
      <span className="header-badge">Redux + Redux-Thunk Legacy Demo</span>
      <h1 className="title">사용자 정보 조회</h1>

      <UserInput />

      {loading ? <LoadingSpinner /> : <UserCard />}
    </div>
  );
}