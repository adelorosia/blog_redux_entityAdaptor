import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IArticle } from "../interface";
import { createBlog, getAllBlogs } from "../services";
import { RootState } from "../store";

export interface IBlogState {
  article: IArticle[];
  status: "idle" | "loading" | "completed" | "failed";
  error: null | string;
  blogId: string;
  inputSearchValue: string;
}

const initialState: IBlogState = {
  article: [],
  status: "idle",
  error: null,
  blogId: "",
  inputSearchValue: "",
};

export const fetchBlogs = createAsyncThunk("/blog/fetchBlogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});

export const addNewBlog = createAsyncThunk(
  "/blog/addNewBlog",
  async (initialBlog: IArticle) => {
    const response = await createBlog(initialBlog);
    return response.data;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogId: (state, action) => {
      state.blogId = action.payload;
    },
    setInputSearchValue: (state, action) => {
      state.inputSearchValue = action.payload;
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
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.status = "completed";
        state.article.push(action.payload);
      });
  },
});

export const displayAllBlogs = (state: RootState) => state.blog.article;

export const findBlogById = (state: RootState, blogId: string) =>
  state.blog.article.find((blog) => blog._id === blogId);

export const { setBlogId, setInputSearchValue } = blogSlice.actions;

export default blogSlice.reducer;
