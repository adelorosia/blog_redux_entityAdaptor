import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  deleteApiBlog,
  displayBlogById,
  setBlogId,
} from "../../reducer/BlogSlice";
import { useNavigate } from "react-router-dom";
import ShowTime from "../ShowTime";
import ShowAuthor from "../ShowAuthor";
import ErrorPage from "../../pages/ErrorPage";

const ShowSingleBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const blogId = useSelector((state: RootState) => state.blogs.blogId);
  const blog = useSelector((state: RootState) =>
    displayBlogById(state, blogId)
  );

  const onHandlerDelete = async () => {
    try {
      await dispatch(deleteApiBlog(blogId));
      dispatch(setBlogId(""));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
 if(!blog){
  return <ErrorPage />
 }else{
  return (
    <div className="container px-5 py-8 flex flex-col gap-8">
      <article className=" odd:bg-slate-100 even:bg-slate-300 rounded-lg py-3 px-5 flex flex-col gap-6 text-BACKGROUND">
        <div className="flex items-center gap-8">
          <img className="w-14" src={blog?.imgUrl} alt="" />
          <h3 className="text-2xl font-Viga text-RED">{blog?.title}</h3>
        </div>
        <div className="flex gap-2 px-8 text-COMMENT">
        <ShowTime date={blog.date ? blog.date : ""} />
        <ShowAuthor userId={blog.userId ? blog.userId : ""} />
        </div>
        <p>{blog?.content}</p>
        <div></div>
        <div className="flex gap-4 justify-center">
          <button
            className="py-2 bg-RED rounded-lg font-Viga uppercase w-32"
            onClick={onHandlerDelete}
          >
            Delete
          </button>
          <button
            className="py-2 bg-ORANGE rounded-lg font-Viga uppercase w-32"
            onClick={() => navigate("/update-blog")}
          >
            Edit
          </button>
          <button
            className="py-2 bg-GREEN w-32 rounded-lg font-Viga uppercase w-30"
            onClick={() => {
              dispatch(setBlogId(""));
              navigate("/home");
            }}
          >
            back
          </button>
        </div>
      </article>
    </div>
  );
 }
};

export default ShowSingleBlog;
