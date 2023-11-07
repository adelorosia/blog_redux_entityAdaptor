import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import ShowAuthor from "../ShowAuthor";
import ShowTime from "../ShowTime";
import { displayAuthorBlog } from "../../reducer/BlogSlice";

const AuthorArticle = () => {
  const authorId = useSelector((state: RootState) => state.users.authorId);
  const blogs = useSelector((state: RootState) =>
    displayAuthorBlog(state, authorId)
  )
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedBlog = () => {
    return (
      <>
        {blogs.map((blog, index) => (
          <article
            className=" odd:bg-slate-100 even:bg-slate-300 rounded-lg py-3 px-5 flex flex-col gap-6 text-BACKGROUND"
            key={index}
          >
            <div className="flex items-center gap-8">
              <img className="w-14" alt="" src={blog.imgUrl} />
              <h3 className="text-2xl font-Viga text-RED">{blog.title}</h3>
            </div>

            <div className="px-5 text-COMMENT flex gap-3">
              <ShowAuthor userId={blog.userId} />
              <ShowTime date={blog.date} />
            </div>
            <p>{blog.content.slice(0, 300)}...</p>
            <div className="w-full"></div>
            <NavLink
              to={`/blog/${blog._id}`}
              className="bg-CYAN w-fit px-8 py-2 rounded-lg text-BACKGROUND font-bold font-Viga"
            >
              Show More ...
            </NavLink>
          </article>
        ))}
      </>
    );
  };
  return (
    <div className="container px-5 py-8 flex flex-col gap-8">
      {renderedBlog()}
    </div>
  );
};

export default AuthorArticle;
