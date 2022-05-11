import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@app/store';
import { FetchStatus } from '@data/enum';

interface UsersState {
  value: User[];
  status: FetchStatus;
  error: string | null;
}

const initialState: UsersState = {
  value: [],
  status: FetchStatus.idle,
  error: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async (dispatch, getState) => {
    const url = 'https://jsonplaceholder.typicode.com/users/';
    const response = await axios.get(url);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editUser: (state, action) => {
      const users = current(state).value;
      const userIndex = users.findIndex(({ id }) => id === action.payload.id);
      if (users[userIndex]) state.value[userIndex] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = FetchStatus.loading;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = FetchStatus.succeed;
        state.value = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = FetchStatus.failed;
      });
  },
});

export const { editUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
