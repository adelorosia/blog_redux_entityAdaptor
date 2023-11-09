import { NavLink } from "react-router-dom";

import { BiSolidUserPlus } from "react-icons/bi";

const Authors = () => {
  return (
    <div className=" flex flex-col items-center gap-4">
      <div className="flex px-6 py-2 bg-CYAN text-BACKGROUND w-44 rounded-lg justify-center font-Viga gap-2 cursor-pointer">
        <BiSolidUserPlus className="w-6 h-6" />
        Add Authors
      </div>
      <div className="container px-5 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
        <div className="flex gap-6 w-full bg-COMMENT rounded-xl py-6 px-8">
          <div>
            <img className="h-20 w-20" src="" alt="" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 font-Viga text-xl"></div>
            <div className=" text-gray-800">
              <p></p>
            </div>
            <div className="">
              <NavLink
                to={`/author/`}
                className="flex gap-2 text-red-800 font-Viga text-2xl underline"
              ></NavLink>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-GREEN rounded-lg text-BACKGROUND mt-4">
                Edit
              </button>
              <button className="px-6 py-2 bg-RED rounded-lg text-BACKGROUND mt-4">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authors;
