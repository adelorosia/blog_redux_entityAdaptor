import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/blog/HomePage";
import CreateBlogPage from "../pages/blog/CreateBlogPage";
import UpdateBlogPage from "../pages/blog/UpdateBlogPage";
import AuthorPage from "../pages/author/AuthorPage";
import CreateAuthorPage from "../pages/author/CreateAuthorPage";
import UpdateAuthorPage from "../pages/author/UpdateAuthorPage";

const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:'/',
        element:<HomePage />
      },
      {
        path:'/home',
        element:<HomePage />
      },
      {
        path:'/show_single_blog',
        element:<HomePage />
      },
      {
        path:'/create-blog',
        element:<CreateBlogPage />
      },
      {
        path:'/update-blog',
        element:<UpdateBlogPage />
      },
      {
        path:'/author',
        element:<AuthorPage />
      },
      {
        path:'/create-author',
        element:<CreateAuthorPage />
      },
      {
        path:'/author/:authorId',
        element:<AuthorPage />
      },
      {
        path:'/update-author/:authorId',
        element:<UpdateAuthorPage />
      },
    ]
  }
])

export default router