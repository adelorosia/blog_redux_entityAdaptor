import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../interface";
import { getAllUsers } from "../services";
import { RootState } from "../store";

interface IUserState {
  authors: IAuthor[];
  status: "idle" | "loading" | "completed" | "failed";
  error: null | string;
}
const initialState: IUserState = {
  authors: [],
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await getAllUsers();
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "completed";
        state.authors = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "an error accourred";
      });
  },
});

export const displayAllUsers = (state: RootState) => state.user.authors;
export const displayUserById = (state: RootState, userId: string) =>
  state.user.authors.find((author) => author._id === userId);

export default userSlice.reducer;
