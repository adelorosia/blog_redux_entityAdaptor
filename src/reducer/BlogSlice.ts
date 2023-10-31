import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IArticle } from "../interface";
import { createBlogs, getAllBlogs } from "../services";
import { RootState } from "../store";

interface IBlogState {
  articles: IArticle[];
  status: "idle" | "loading" | "completed" | "failed";
  error: null | string;
  inputValueSearch: string;
}
const initialState: IBlogState = {
  articles: [],
  status: "idle",
  error: null,
  inputValueSearch: "",
};

export const fetchBlog = createAsyncThunk("blog/fetchBlog", async () => {
  const response = await getAllBlogs();
  return response.data;
});

export const addNewBlog = createAsyncThunk(
  "blog/addNewBlog",
  async (initialBlog: IArticle) => {
    const response = await createBlogs(initialBlog);
    return response.data;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setInputValueSearch: (state, action) => {
      state.inputValueSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.status = "completed";
        state.articles = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "an error accourred";
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        (state.status = "completed"), state.articles.push(action.payload);
      });
  },
});

export const displayAllBlogs = (state: RootState) => state.blog.articles;
export const displayBlogById = (state: RootState, blogId: string) =>
  state.blog.articles.find((article) => article._id === blogId);

export const { setInputValueSearch } = blogSlice.actions;
export default blogSlice.reducer;
