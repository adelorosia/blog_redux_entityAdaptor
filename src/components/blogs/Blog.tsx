import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { displayBlogById } from "../../reducer/BlogSlice";
import ShowAuthor from "../ShowAuthor";
import ShowTime from "../ShowTime";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate=useNavigate()
  const blogId = useSelector((state: RootState) => state.blog.blogId);
  const blog = useSelector((state: RootState) =>
    displayBlogById(state, blogId)
  );

  if(blog){
    return (
      <div className="container px-5 py-8 flex flex-col gap-8">
        <article className=" odd:bg-slate-100 even:bg-slate-300 rounded-lg py-3 px-5 flex flex-col gap-6 text-BACKGROUND">
          <div className="flex items-center gap-8">
            <img className="w-14" src={blog?.imgUrl} alt="" />
            <h3 className="text-2xl font-Viga text-RED">{blog?.title}</h3>
          </div>
          <div className="flex gap-2 px-8 text-COMMENT">
          <ShowAuthor authorId={blogId} />
            <ShowTime timeStamp={blog?.date} />
          </div>
          <p>{blog?.content}</p>
          <div>
          
          </div>
          <div className="flex gap-4 justify-center">
            <button className="py-2 bg-RED rounded-lg font-Viga uppercase w-32">
              Delete
            </button>
            <button className="py-2 bg-ORANGE rounded-lg font-Viga uppercase w-32">
              Edit
            </button>
            <button className="py-2 bg-GREEN w-32 rounded-lg font-Viga uppercase w-30" onClick={()=>navigate("/home")}>
              back
            </button>
          </div>
        </article>
      </div>
    );
  }else{ return <div>Not Found Blog</div>}
};
export default Blog;
