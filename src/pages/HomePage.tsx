import { useParams } from "react-router-dom";
import Blogs from "../components/blogs/Blogs";
import Blog from "../components/blogs/Blog";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBlogId } from "../reducer/BlogSlice";

const HomePage = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBlogId(blogId));
  }, [dispatch, blogId]);
  
  return <div>{blogId === undefined ? <Blogs /> : <Blog />}</div>;
};

export default HomePage;
