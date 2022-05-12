import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@app/store';
import { FetchStatus } from '@data/enum';
import getRamdomDateInBetween from '@helpers/getRandomDate';
import capitalizeFirstLetter from '@helpers/capitalizeFirstLetter';

const initialState: PostsState = {
  value: [],
  status: FetchStatus.idle,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async (dispatch, getState) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/';
    const response = await axios.get<Post[]>(url);
    const posts = response.data;
    const enhancedPosts = posts.map((post) => ({
      ...post,
      title: capitalizeFirstLetter(post.title),
      body: capitalizeFirstLetter(post.body),
      date: getRamdomDateInBetween('2003-01-01').toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      likes: Math.floor(Math.random() * 1000),
      replies: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 10000),
    }));
    return enhancedPosts;
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
