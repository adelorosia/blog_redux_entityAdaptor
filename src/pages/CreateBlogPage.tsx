import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../reducer/UserSlice";
import React, { useState } from "react";
import { AppDispatch } from "../store";
import { addNewBlog } from "../reducer/BlogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(getAllAuthors);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    path: "",
    userId: "",
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
    formData.title,
    formData.path,
    formData.userId,
    formData.content,
  ].every(Boolean);

  const handleSubmitForm = async () => {
    try {
      if (canSave) {
        await dispatch(
          addNewBlog({
            _id: "",
            date: new Date().toISOString(),
            title: formData.title,
            imgUrl: formData.path,
            content: formData.content,
            userId: formData.userId,
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
          userId:"",
          title:"",
          content:"",
          path:""
        })
        navigate("/home")
      }
    } catch (error) {
      console.error("Data not save", error);
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
            value={formData.userId}
            name="userId"
            onChange={onFormChange}
          >
            <option value="">Authors</option>

            {users.map((user,index) => (
              <option
                key={index}
                value={user._id}
              >{`${user.firstName} ${user.lastName}`}</option>
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
              onClick={handleSubmitForm}
            >
              Add Article
            </button>
            <button className="bg-ORANGE px-8 py-2 rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPage;
