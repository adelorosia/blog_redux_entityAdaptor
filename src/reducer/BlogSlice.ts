import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IArticle } from "../interface";
import { getAllBlogs } from "../services";
import { RootState } from "../store";

export interface IBlogState {
  article: IArticle[];
  status: "idle" | "loading" | "completed" | "failed";
  error: null | string;
}

const initialState: IBlogState = {
  article: [],
  status: "idle",
  error: null,
};

export const fetchBlogs = createAsyncThunk("/blog/fetchBlogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "completed";
        state.article = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error accourred";
      });
  },
});

export const displayAllBlogs = (state: RootState) => state.blog.article;

export default blogSlice.reducer;
