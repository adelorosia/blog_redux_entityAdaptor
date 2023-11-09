import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { displayUserById, updateApiUser } from "../../reducer/UserSlice";

const UpdateAuthorPage = () => {
  const { authorId } = useParams();
  console.log(authorId);
  const author = useSelector((state: RootState) =>
    displayUserById(state, authorId ? authorId : "")
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: author?.firstName,
    lastName: author?.lastName,
    email: author?.email,
    photo: author?.photo,
  });

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitForm = async () => {
    await dispatch(
      updateApiUser({
        _id: authorId,
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        email: formData.email || "",
        photo: formData.photo || "",
      })
    );
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      photo: "",
    });
    navigate("/author");
  };
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="container px-5 flex justify-center">
        <div className="flex flex-col gap-4 items-center bg-CURRENT_LINE w-full lg:w-1/2 px-8 py-5 rounded-lg">
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={onFormChange}
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onFormChange}
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onFormChange}
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            placeholder="photo"
            name="photo"
            value={formData.photo}
            onChange={onFormChange}
          />
          <div className="flex px-8 py-2 gap-8">
            <button
              className="bg-CYAN px-8 py-2 rounded-lg"
              onClick={onSubmitForm}
            >
              Add Author
            </button>
            <button
              className="bg-ORANGE px-8 py-2 rounded-lg"
              onClick={() => navigate("/author")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAuthorPage;
