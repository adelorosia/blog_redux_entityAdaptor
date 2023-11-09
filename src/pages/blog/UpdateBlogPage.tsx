import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { displayBlogById, updateApiBlog } from "../../reducer/BlogSlice";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { displayAllUsers } from "../../reducer/UserSlice";

const UpdateBlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const blogId = useSelector((state: RootState) => state.blogs.blogId);
  const blog = useSelector((state: RootState) =>
    displayBlogById(state, blogId)
  );
  const author = useSelector(displayAllUsers);
  const [formData, setFormData] = useState({
    title: blog?.title,
    path: blog?.imgUrl,
    authorId: blog?.userId,
    content: blog?.content,
  });
  const onChangeForm = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const canSave = [
    formData.authorId,
    formData.content,
    formData.path,
    formData.title,
  ].every(Boolean);
  const onSubmitForm = async () => {
    if (canSave) {
      await dispatch(
        updateApiBlog({
          _id: blogId,
          title: formData.title || "",
          imgUrl: formData.path || "",
          userId: formData.authorId || "",
          content: formData.content || "",
          date: new Date().toISOString(),
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
        title: "",
        path: "",
        content: "",
        authorId: "",
      });
      navigate("/show_single_blog");
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
            onChange={onChangeForm}
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            placeholder="Path"
            name="path"
            value={formData.path}
            onChange={onChangeForm}
          />
          <select
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            id=""
            name="authorId"
            value={formData.authorId}
            onChange={onChangeForm}
          >
            <option value="">Authors</option>

            {author.map((author, index) => (
              <option key={index} value={author._id}>
                {author.firstName} {author.lastName}
              </option>
            ))}
          </select>
          <textarea
            className="w-full rounded-lg outline-0 px-3 py-2 text-BACKGROUND"
            id=""
            cols={30}
            rows={10}
            placeholder="Content"
            name="content"
            value={formData.content}
            onChange={onChangeForm}
          ></textarea>
          <div className="flex px-8 py-2 gap-8">
            <button className="bg-CYAN px-8 py-2 rounded-lg" onClick={onSubmitForm}>
              Update Article
            </button>
            <button className="bg-ORANGE px-8 py-2 rounded-lg" onClick={()=>navigate("/show_single_blog")}>Cancle</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
