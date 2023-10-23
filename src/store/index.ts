import { configureStore } from "@reduxjs/toolkit";
import blogReducer, { fetchBlogs } from "../reducer/BlogSlice";
import userReducer, { fetchUsers } from "../reducer/UserSlice";


const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
  },
});

store.dispatch(fetchBlogs())
store.dispatch(fetchUsers())

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
