import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  username: string | null;
}

const initialState: UserState = {
  userId: null,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    clearUserId(state) {
      state.userId = null;
      state.username = null;
    },
    setUsername(state, action : PayloadAction<string>){
      state.username = action.payload;
    }
  },
});

export const { setUserId, clearUserId, setUsername } = userSlice.actions;

export default userSlice.reducer;
