import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayAllUsers } from "../reducer/UserSlice";
import React, { useState } from "react";
import { addNewBlog } from "../reducer/BlogSlice";
import { AppDispatch } from "../store";

const CreateBlogPage = () => {
  const navigate = useNavigate();
  const authors = useSelector(displayAllUsers);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    title: "",
    path: "",
    authorId: "",
    content: "",
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
    formData.authorId,
    formData.content,
    formData.path,
    formData.title,
  ].every(Boolean);

  const handlerAddNewBlog = async () => {
    if (canSave) {
      try {
        await dispatch(
          addNewBlog({
            _id: "",
            userId: formData.authorId,
            title: formData.title,
            imgUrl: formData.path,
            date: new Date().toISOString(),
            content: formData.content,
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
          content: "",
          authorId: "",
          path: "",
        });
        navigate("/home");
      } catch (error) {
        console.error("data is not save in database", error);
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
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={onFormChange}
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            placeholder="Path"
            value={formData.path}
            name="path"
            onChange={onFormChange}
          />
          <select
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            value={formData.authorId}
            name="authorId"
            onChange={onFormChange}
          >
            <option value="">Authors</option>

            {authors.map((author, index) => (
              <option
                key={index}
                value={author._id}
              >{`${author.firstName} ${author.lastName}`}</option>
            ))}
          </select>
          <textarea
            className="w-full rounded-lg outline-0 px-3 py-2 text-BACKGROUND"
            id=""
            cols={30}
            rows={10}
            placeholder="Content"
            value={formData.content}
            name="content"
            onChange={onFormChange}
          ></textarea>
          <div className="flex px-8 py-2 gap-8">
            <button
              className="bg-CYAN px-8 py-2 rounded-lg"
              onClick={handlerAddNewBlog}
            >
              Add Article
            </button>
            <button
              className="bg-ORANGE px-8 py-2 rounded-lg"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPage;
