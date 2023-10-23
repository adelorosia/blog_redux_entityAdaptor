import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../interface";
import { getAllUsers } from "../services";
import { RootState } from "../store";

interface IAuthorState {
  author: IAuthor[];
  status: "idle" | "loading" | "completed" | "faied";
  error: null | string;
}

const initialState: IAuthorState = {
  author: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await getAllUsers();
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "idle";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        (state.status = "completed"), (state.author = action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        (state.status = "faied"),
          (state.error = action.error.message || "an error accourred");
      });
  },
});

export const findUserById = (state: RootState, userId: string) =>
  state.user.author.find((user) => user._id === userId);

export default userSlice.reducer;
