import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@app/store';
import { FetchStatus } from '@data/enum';

interface PostsState {
  value: Post[];
  status: FetchStatus;
  error: string | null;
}

const initialState: PostsState = {
  value: [],
  status: FetchStatus.idle,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async (dispatch, getState) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/';
    const response = await axios.get(url);
    return response.data;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = FetchStatus.loading;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = FetchStatus.succeed;
        state.value = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = FetchStatus.failed;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
