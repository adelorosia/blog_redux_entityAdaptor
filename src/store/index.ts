import { configureStore } from "@reduxjs/toolkit";
import blogSlice, { fetchBlogs } from "../reducer/BlogSlice";
import userSlice, { fetchUsers } from "../reducer/UserSlice";

export const store = configureStore({
  reducer: {
    blogs: blogSlice,
    users: userSlice,
  },
});

store.dispatch(fetchBlogs())
store.dispatch(fetchUsers())


export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
