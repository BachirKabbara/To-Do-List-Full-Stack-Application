import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.email === state.currentUser.email);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        state.currentUser = { ...state.currentUser, ...action.payload };
        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    deleteUser: (state) => {
      state.users = state.users.filter(user => user.email !== state.currentUser.email);
      state.currentUser = null;
      localStorage.setItem('users', JSON.stringify(state.users));
      localStorage.removeItem('currentUser');
    },
  },
});

export const { addUser, setUser, updateUser, logout, deleteUser } = userSlice.actions;

export default userSlice.reducer;
