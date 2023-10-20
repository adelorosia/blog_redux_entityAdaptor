import { configureStore } from "@reduxjs/toolkit";
import blogReducer, { fetchBlogs } from "../reducer/BlogSlice";


const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

store.dispatch(fetchBlogs())

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
