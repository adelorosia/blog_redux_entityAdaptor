import { NavLink } from "react-router-dom";
import { IArticle } from "../../interface";
import { useDispatch } from "react-redux";
import { setBlogId } from "../../reducer/BlogSlice";
import ShowAuthor from "../ShowAuthor";
import ShowTime from "../ShowTime";
import ErrorPage from "../../pages/ErrorPage";

type TBlogProps = { blog: Partial<IArticle> };
const Blog = ({ blog }: TBlogProps) => {
  const dispatch = useDispatch();
 if(!blog){
  return <ErrorPage />
 }else{
  return (
    <article className=" odd:bg-slate-100 even:bg-slate-300 rounded-lg py-3 px-5 flex flex-col gap-6 text-BACKGROUND">
      <div className="flex items-center gap-8">
        <img className="w-14" alt="" src={blog.imgUrl} />
        <h3 className="text-2xl font-Viga text-RED">{blog.title}</h3>
      </div>

      <div className="px-5 text-COMMENT flex gap-3">
        <ShowTime date={blog.date ? blog.date : ""} />
        <ShowAuthor userId={blog.userId ? blog.userId : ""} />
      </div>
      <p>{blog.content?.slice(0, 200)}...</p>
      <div className="w-full"></div>
      <NavLink
        to={`/show_single_blog`}
        className="bg-CYAN w-fit px-8 py-2 rounded-lg text-BACKGROUND font-bold font-Viga"
      >
        <button onClick={() => dispatch(setBlogId(blog._id))}>
          Show More ...
        </button>
      </NavLink>
    </article>
  );
 }
};
export default Blog;
