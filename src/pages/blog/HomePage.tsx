import { useParams } from "react-router-dom";
import Blogs from "../../components/blogs/Blogs";
import Blog from "../../components/blogs/Blog";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBlogs, setBlogId } from "../../reducer/BlogSlice";
import { AppDispatch } from "../../store";

const HomePage = () => {
  const disptach = useDispatch<AppDispatch>();
  const { blogId } = useParams();
  useEffect(() => {
    disptach(fetchBlogs());
  }, [disptach]);
  useEffect(() => {
    disptach(setBlogId(blogId));
  }, [disptach, blogId]);

  return <div>{blogId === undefined ? <Blogs /> : <Blog />}</div>;
};

export default HomePage;
