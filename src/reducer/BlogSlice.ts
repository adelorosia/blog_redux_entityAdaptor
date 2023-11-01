import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IArticle } from "../interface";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../services";
import { RootState } from "../store";

interface IBlogState {
  article: IArticle[];
  status: "idle" | "loading" | "complated" | "failed";
  error: string | null;
  searchInput: string;
  blogId: string;
}

const initialState: IBlogState = {
  article: [],
  status: "idle",
  error: null,
  searchInput: "",
  blogId: "",
};

export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});

export const addNewBlog = createAsyncThunk(
  "/blogs/addNewBlog",
  async (initialBlog: IArticle) => {
    const response = await createBlog(initialBlog);
    return response.data;
  }
);

export const updateApiBlog = createAsyncThunk(
  "/blogs/updateApiBlog",
  async (initialBlog: IArticle) => {
    const response = await updateBlog(initialBlog, initialBlog._id);
    return response.data;
  }
);

export const deleteApiBlog = createAsyncThunk(
  "/blogs/deleteApiBlog",
  async (initialBlogId: string) => {
    await deleteBlog(initialBlogId);
    return initialBlogId;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
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
        state.status = "complated";
        state.article = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "an error accourred";
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.status = "complated";
        state.article.push(action.payload);
      })
      .addCase(updateApiBlog.fulfilled, (state, action) => {
        state.status = "complated";
        const { id } = action.payload;
        const index = state.article.findIndex((blog) => blog._id === id);
        state.article[index] = action.payload;
      })
      .addCase(deleteApiBlog.fulfilled, (state, action) => {
        state.status = "complated";
        state.article = state.article.filter(
          (blog) => blog._id !== action.payload
        );
      });
  },
});

export const displayAllBlogs = (state: RootState) => state.blogs.article;

export const displayBlogById = (state: RootState, blogId: string) =>
  state.blogs.article.find((blog) => blog._id === blogId);

export const { setSearchInput, setBlogId } = blogSlice.actions;
export default blogSlice.reducer;
