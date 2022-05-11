import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersSlice from '@slices/usersSlice';
import postsSlice from '@slices/postsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
