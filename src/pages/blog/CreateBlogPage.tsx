import { useDispatch, useSelector } from "react-redux";
import { displayAllUsers } from "../../reducer/UserSlice";
import React, { useState } from "react";
import { AppDispatch } from "../../store";
import { addNewBlog } from "../../reducer/BlogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authors = useSelector(displayAllUsers);
  const [formData, setFormData] = useState({
    title: "",
    authorId: "",
    content: "",
  });

  const onFromChange = (
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
  const canSave = [formData.authorId, formData.content, formData.title].every(
    Boolean
  );
  const onFormSubmit = async () => {
    if (canSave) {
      await dispatch(
        addNewBlog({
          _id: "",
          title: formData.title,
          imgUrl: "",
          userId: formData.authorId,
          content: formData.content,
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
        content: "",
        authorId: "",
      });
      navigate("/home");
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
            value={formData.title}
            onChange={onFromChange}
            placeholder="Title"
          />

          <select
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            name="authorId"
            value={formData.authorId}
            onChange={onFromChange}
          >
            <option value="">Authors</option>

            {authors.map((author, index) => (
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
            onChange={onFromChange}
          ></textarea>
          <div className="flex px-8 py-2 gap-8">
            <button
              className="bg-CYAN px-8 py-2 rounded-lg"
              onClick={onFormSubmit}
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
