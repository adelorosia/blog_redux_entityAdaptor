import { useDispatch, useSelector } from "react-redux";
import { deleteApiUser, displayAllUsers } from "../../reducer/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
import AuthorCountArticle from "./AuthorCountArticle";
import { BiSolidUserPlus } from "react-icons/bi";
import { AppDispatch } from "../../store";

const Authors = () => {
  const navigate=useNavigate()
  const authors = useSelector(displayAllUsers);
  const dispatch = useDispatch<AppDispatch>();

  const deleteAuthor = async (authorId: string) => {
   return await dispatch(deleteApiUser(authorId));
  };
  return (
    <div className=" flex flex-col items-center gap-4">
      <div className="flex px-6 py-2 bg-CYAN text-BACKGROUND w-44 rounded-lg justify-center font-Viga gap-2 cursor-pointer" onClick={()=>navigate("/create-author")}>
        <BiSolidUserPlus className="w-6 h-6" />
        Add Authors
      </div>
      <div className="container px-5 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
        {authors.map((author, index) => (
          <div
            className="flex gap-6 w-full bg-COMMENT rounded-xl py-6 px-8"
            key={index}
          >
      
            <div>
              <img className="h-20 w-20" src={author.photo} alt="" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 font-Viga text-xl">
                <p>{author.firstName}</p>
                <p>{author.lastName}</p>
              </div>
              <div className=" text-gray-800">
                <p>{author.email}</p>
              </div>
              <div className="">
                <NavLink
                  to={`/author/${author._id}`}
                  className="flex gap-2 text-red-800 font-Viga text-2xl underline"
                >
                  <AuthorCountArticle _id={author._id} />
                </NavLink>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-GREEN rounded-lg text-BACKGROUND mt-4" onClick={()=>navigate(`/update-author/${author._id}`)}>
                  Edit
                </button>
                <button className="px-6 py-2 bg-RED rounded-lg text-BACKGROUND mt-4" onClick={()=>deleteAuthor(author._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;
