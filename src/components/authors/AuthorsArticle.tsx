import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store";
import { displayAuthorsBlog, setBlogId } from "../../reducer/BlogSlice";
import ShowTime from "../ShowTime";
import ShowAuthor from "../ShowAuthor";

const AuthorArticle = () => {
  const dispatch = useDispatch();
  const authorId = useSelector((state: RootState) => state.users.authorId);
  const articles = useSelector((state: RootState) =>
    displayAuthorsBlog(state, authorId)
  );
  return (
    <div className="container px-5 py-8 flex flex-col gap-8">
      {articles.map((article) => (
        <article className=" odd:bg-slate-100 even:bg-slate-300 rounded-lg py-3 px-5 flex flex-col gap-6 text-BACKGROUND">
          <div className="flex items-center gap-8">
            <img className="w-14" alt="" src={article.imgUrl} />
            <h3 className="text-2xl font-Viga text-RED">{article.title}</h3>
          </div>

          <div className="px-5 text-COMMENT flex gap-3">
            <ShowTime date={article.date ? article.date : ""} />
            <ShowAuthor userId={article.userId ? article.userId : ""} />
          </div>
          <p>{article.content.slice(0, 200)}...</p>
          <div className="w-full"></div>
          <NavLink
            to={`/show_single_blog`}
            className="bg-CYAN w-fit px-8 py-2 rounded-lg text-BACKGROUND font-bold font-Viga"
          >
            <button
              onClick={() => {
                dispatch(setBlogId(article._id));
              }}
            >
              {" "}
              Show More ...
            </button>
          </NavLink>
        </article>
      ))}
    </div>
  );
};

export default AuthorArticle;
