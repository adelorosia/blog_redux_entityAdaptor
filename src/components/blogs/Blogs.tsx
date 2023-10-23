import { NavLink } from "react-router-dom";
import SearchBox from "../SearchBox";
import { useSelector } from "react-redux";
import { displayAllBlogs } from "../../reducer/BlogSlice";
import { RootState } from "../../store";
import Spinner from "../Spinner";
import ErrorPage from "../../pages/ErrorPage";
import ShowTime from "../ShowTime";
import ShowAuthor from "../ShowAuthor";

const blogStatus = {
  idle: "idle",
  loading: "loading",
  completed: "completed",
  failed: "failed",
};

const Blogs = () => {
  const blogs = useSelector(displayAllBlogs);
  const status = useSelector((state: RootState) => state.blog.status);

  const renderedComponents = () => {
    switch (status) {
      case blogStatus.loading:
        return <Spinner />;
      case blogStatus.completed:
        return (
         <>
          {
            blogs.map((blog)=>(
              <article className=" odd:bg-slate-100 even:bg-slate-300 rounded-lg py-3 px-5 flex flex-col gap-6 text-BACKGROUND" key={blog._id}>
              <div className="flex items-center gap-8">
                <img className="w-14" alt="" src={blog.imgUrl} />
                <h3 className="text-2xl font-Viga text-RED">{blog.title}</h3>
              </div>
  
              <div className="px-5 text-COMMENT flex gap-3">
                <ShowTime timeStamp={blog.date} />
                <ShowAuthor userId={blog.userId} />
              </div>
              <p>{blog.content.slice(0,200)}...</p>
              <div className="w-full"></div>
              <NavLink
                to={`/blog/${blog._id}`}
                className="bg-CYAN w-fit px-8 py-2 rounded-lg text-BACKGROUND font-bold font-Viga"
              >
                Show More ...
              </NavLink>
            </article>
            ))
          }
         </>
        );
      case blogStatus.failed:
        return <ErrorPage />;
    }
  };

  return (
    <div className="container px-5 py-8 flex flex-col gap-8">
      <div className="flex justify-center">
        <SearchBox />
      </div>
      {renderedComponents()}
    </div>
  );
};

export default Blogs;
