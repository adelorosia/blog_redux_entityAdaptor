import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { IArticle } from "../interface";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../services";
import { RootState } from "../store";

interface IBlogSlice {
  status: "idle" | "loading" | "completed" | "failed";
  error: string | null;
  blogId: string;
  searchBlog: string;
}

const blogAdapter = createEntityAdapter<IArticle>({
  selectId: (article) => article._id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: IBlogSlice & EntityState<IArticle> =
  blogAdapter.getInitialState({
    status: "idle",
    error: null,
    blogId: "",
    searchBlog: "",
  });

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
  async (initialId: string) => {
    await deleteBlog(initialId);
    return initialId;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogId: (state, action) => {
      state.blogId = action.payload;
    },
    setSearchBlog: (state, action) => {
      state.searchBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "completed";
        blogAdapter.setAll(state, action.payload);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        (state.status = "failed"),
          (state.error = action.error.message || "An Error Accourred");
      })
      .addCase(addNewBlog.fulfilled, blogAdapter.addOne)
      .addCase(updateApiBlog.fulfilled, blogAdapter.updateOne)
      .addCase(deleteApiBlog.fulfilled, blogAdapter.removeOne);
  },
});

export const { selectAll: displayAllBlogs, selectById: displayBlogById } =
  blogAdapter.getSelectors((state: RootState) => state.blogs);

export const displayAuthorsBlog = createSelector(
  [displayAllBlogs, (_, userId) => userId],
  (blogs, userId) => blogs.filter((blog) => blog.userId === userId)
);

export const { setBlogId, setSearchBlog } = blogSlice.actions;

export default blogSlice.reducer;
