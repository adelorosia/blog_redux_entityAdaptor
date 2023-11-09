import SearchBox from "../SearchBox";
import { useSelector } from "react-redux";
import { displayAllBlogs } from "../../reducer/BlogSlice";
import Blog from "./Blog";
import { RootState } from "../../store";
import Spinner from "../Spinner";
import ErrorPage from "../../pages/ErrorPage";

const Blogs = () => {
  const searchValue = useSelector((state: RootState) => state.blogs.searchBlog);
  const blogs = useSelector(displayAllBlogs);
  const status = useSelector((state: RootState) => state.blogs.status);
  const renderedBlog = () => {
    switch (status) {
      case "loading":
        return <Spinner />;
      case "completed":
        return (
          <>
            {blogs
              .filter(
                (blog) =>
                  blog.title &&
                  blog.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((blog, index) => (
                <Blog key={index} blog={blog} />
              ))}
          </>
        );
      case "failed":
        return <ErrorPage />;
    }
  };
  return (
    <div className="container px-5 py-8 flex flex-col gap-8">
      <div className="flex justify-center">
        <SearchBox />
      </div>
      {renderedBlog()}
    </div>
  );
};

export default Blogs;
