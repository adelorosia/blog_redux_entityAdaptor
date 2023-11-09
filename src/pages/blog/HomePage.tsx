import { useDispatch, useSelector } from "react-redux";
import Blogs from "../../components/blogs/Blogs";
import { AppDispatch, RootState } from "../../store";
import ShowSingleBlog from "../../components/blogs/ShowSingleBlog";
import { fetchBlogs } from "../../reducer/BlogSlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch=useDispatch<AppDispatch>()
  const blogId=useSelector((state:RootState)=>state.blogs.blogId)
  console.log(blogId)

  useEffect(()=>{
    dispatch(fetchBlogs())
  },[dispatch])
  return (
    <div>
     {blogId===""?<Blogs />:<ShowSingleBlog />}
    </div>
  );
};

export default HomePage;
