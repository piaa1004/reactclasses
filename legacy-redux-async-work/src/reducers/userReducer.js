// src/reducers/userReducer.js
import {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  RESET_USER, // 👈 RESET_USER import 확인
} from '../types/userTypes';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case RESET_USER: // 👈 초기 상태로 되돌리는 케이스
      return initialState;
    default:
      return state;
  }
};