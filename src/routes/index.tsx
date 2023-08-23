import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import CreateBlogPage from "../pages/CreateBlogPage";
import UpdateBlogPage from "../pages/UpdateBlogPage";

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
        path:'/blog/:blogId',
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
    ]
  }
])

export default router