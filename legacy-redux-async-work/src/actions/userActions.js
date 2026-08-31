// src/actions/userActions.js
import {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  RESET_USER,
} from '../types/userTypes';

// 동기 액션 생성자들
export const fetchUserPending = () => ({
  type: FETCH_USER_PENDING,
});

export const fetchUserSuccess = (userData) => ({
  type: FETCH_USER_SUCCESS,
  payload: userData,
});

export const fetchUserFailure = (errorMessage) => ({
  type: FETCH_USER_FAILURE,
  payload: errorMessage,
});

// 👇 누락되었던 resetUser 함수
export const resetUser = () => ({
  type: RESET_USER,
});

// 비동기 Thunk 액션 생성자
export const fetchUserById = (userId) => {
  return async (dispatch, getState) => {
    dispatch(fetchUserPending());

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      if (!response.ok) {
        throw new Error(`사용자를 찾을 수 없습니다. (상태 코드: ${response.status})`);
      }

      const data = await response.json();
      dispatch(fetchUserSuccess(data));
    } catch (error) {
      dispatch(
        fetchUserFailure(error.message || '데이터를 불러오는 중 오류가 발생했습니다.')
      );
    }
  };
};