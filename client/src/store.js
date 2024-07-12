import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import tasksReducer from './features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
});

export default store;
