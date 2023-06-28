import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { id: null, email: null, profile: null },
  reducers: {
    updateState(state, action) {
      state.id = action.payload._id;
      state.email = action.payload.email;
      state.profile = action.payload.profile;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice;
