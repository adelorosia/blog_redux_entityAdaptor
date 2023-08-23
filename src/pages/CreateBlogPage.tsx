const CreateBlogPage = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="container px-5 flex justify-center">
        <div className="flex flex-col gap-4 items-center bg-CURRENT_LINE w-full lg:w-1/2 px-8 py-5 rounded-lg">
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            name="title"
            placeholder="Title"
          />
          <input
            className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND"
            type="text"
            placeholder="Path"
          />
          <select className="w-full rounded-lg py-2 outline-0 px-3  text-BACKGROUND">
            <option value="">Authors</option>

            <option></option>
          </select>
          <textarea
            className="w-full rounded-lg outline-0 px-3 py-2 text-BACKGROUND"
            id=""
            cols={30}
            rows={10}
            placeholder="Content"
          ></textarea>
          <div className="flex px-8 py-2 gap-8">
            <button className="bg-CYAN px-8 py-2 rounded-lg">
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
