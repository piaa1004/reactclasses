import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p>서버에서 사용자 정보를 가져오는 중...</p>
    </div>
  );
};