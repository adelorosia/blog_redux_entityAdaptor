import { configureStore } from "@reduxjs/toolkit";
import blogReducer, { fetchBlog } from "../reducer/BlogSlice"
import userReducer, { fetchUser } from "../reducer/UserSlice"

export const store=configureStore({
  reducer:{
    blog:blogReducer,
    user:userReducer
  }
})
store.dispatch(fetchBlog())
store.dispatch(fetchUser())
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch