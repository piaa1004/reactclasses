// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Thunk 비동기 액션 생성 (타입 접두사 + 비동기 콜백)
export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      if (!response.ok) {
        throw new Error(`사용자를 찾을 수 없습니다. (상태 코드: ${response.status})`);
      }

      const data = await response.json();
      return data; // 성공 시 리턴값이 fulfilled 액션의 payload가 됨
    } catch (error) {
      // 실패 시 에러 메시지를 rejected 액션의 payload로 전달
      return rejectWithValue(
        error.message || '데이터를 불러오는 중 오류가 발생했습니다.'
      );
    }
  }
);

// 2. 초기 상태
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// 3. 슬라이스 생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 동기 액션 (초기화)
    resetUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // [1] 요청 시작
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // [2] 요청 성공
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      // [3] 요청 실패
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      });
  },
});

// 동기 액션 생성자 export
export const { resetUser } = userSlice.actions;

// 리듀서 export
export default userSlice.reducer;