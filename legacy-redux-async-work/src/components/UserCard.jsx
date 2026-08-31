// src/components/UserCard.jsx
import React from 'react';
import { useSelector } from 'react-redux';

export const UserCard = () => {
  const { data: user, error } = useSelector((state) => state.user);

  if (error) {
    return <div className="error-box">⚠️ {error}</div>;
  }

  if (!user) {
    return <div className="empty-box">사용자 ID를 입력하고 조회 버튼을 눌러주세요.</div>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar">{user.name?.charAt(0) || 'U'}</div>
        <div>
          <h3>{user.name}</h3>
          <span className="username">@{user.username}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="info-row">
          <span className="label">이메일:</span>
          <span>{user.email}</span>
        </div>
        <div className="info-row">
          <span className="label">전화번호:</span>
          <span>{user.phone}</span>
        </div>
        <div className="info-row">
          <span className="label">웹사이트:</span>
          <span>{user.website}</span>
        </div>
        <div className="info-row">
          <span className="label">회사:</span>
          <span>{user.company?.name}</span>
        </div>
        <div className="info-row">
          <span className="label">거주지:</span>
          <span>
            {user.address?.city} ({user.address?.street})
          </span>
        </div>
      </div>
    </div>
  );
};