import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IArticle } from "../interface";
import { getAllBlogs } from "../services";
import { RootState } from "../store";

export interface IBlogState {
  article: IArticle[];
  status: "idle" | "loading" | "completed" | "failed";
  error: null | string;
  blogId: string;
}

const initialState: IBlogState = {
  article: [],
  status: "idle",
  error: null,
  blogId: "",
};

export const fetchBlogs = createAsyncThunk("/blog/fetchBlogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogId: (state, action) => {
      state.blogId = action.payload;
    },
  },
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

export const findBlogById = (state: RootState, blogId: string) =>
  state.blog.article.find((blog) => blog._id === blogId);

export const { setBlogId } = blogSlice.actions;

export default blogSlice.reducer;
