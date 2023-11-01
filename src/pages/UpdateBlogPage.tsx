import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { displayBlogById, updateApiBlog } from "../reducer/BlogSlice";
import { useState } from "react";
import { displayAllUsers } from "../reducer/UserSlice";

const UpdateBlogPage = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch<AppDispatch>()
  const blogId = useSelector((state: RootState) => state.blogs.blogId);
  const blog = useSelector((state: RootState) =>
    displayBlogById(state, blogId)
  );
  const users=useSelector(displayAllUsers)
  const [formData, setFormData] = useState({
    title: blog?.title,
    path: blog?.imgUrl,
    authorId: blog?.userId,
    content: blog?.content,
  });

  const onFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const canSave = [
    formData.title,
    formData.authorId,
    formData.content,
    formData.path,
  ].every(Boolean);

  const onSubmitForm = async () => {
    if (canSave) {
      try {
        await dispatch(
          updateApiBlog({
            _id: blogId,
            userId: formData.authorId || "",
            title: formData.title || "",
            content: formData.content || "",
            date: new Date().toISOString(),
            imgUrl: formData.path || "",
            reactions: {
              thumbSup: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          })
        );
        setFormData({
          title:"",
          content:"",
          path:"",
          authorId:""
        })
        navigate(`/blog/${blogId}`)
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="container px-5 flex justify-center">
        <div className="flex flex-col gap-4 items-center bg-CURRENT_LINE w-full lg:w-1/2 px-8 py-5 rounded-lg">
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={onFormChange}
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            placeholder="Path"
            name="path"
            value={formData.path}
            onChange={onFormChange}
          />
          <select
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            id=""
            name="authorId"
            value={formData.authorId}
            onChange={onFormChange}
          >
            <option value="">Authors</option>
          {
            users.map((user,index)=>(
              <option key={index} value={user._id}>{`${user.firstName} ${user.lastName}`}</option>
            ))
          }
          </select>
          <textarea
            className="w-full rounded-lg outline-0 px-3 py-2 text-BACKGROUND"
            id=""
            cols={30}
            rows={10}
            placeholder="Content"
            name="content"
            value={formData.content}
            onChange={onFormChange}
          ></textarea>
          <div className="flex px-8 py-2 gap-8">
            <button className="bg-CYAN px-8 py-2 rounded-lg" onClick={onSubmitForm}>
              Update Article
            </button>
            <button
              className="bg-ORANGE px-8 py-2 rounded-lg"
              onClick={() => navigate(`/blog/${blogId}`)}
            >
              Cancle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
