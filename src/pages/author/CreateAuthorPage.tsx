const CreateAuthorPage = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="container px-5 flex justify-center">
        <div className="flex flex-col gap-4 items-center bg-CURRENT_LINE w-full lg:w-1/2 px-8 py-5 rounded-lg">
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            placeholder="Last Name"
            name="lastName"
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            placeholder="photo"
            name="photo"
          />
          <div className="flex px-8 py-2 gap-8">
            <button className="bg-CYAN px-8 py-2 rounded-lg">Add Author</button>
            <button className="bg-ORANGE px-8 py-2 rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuthorPage;
