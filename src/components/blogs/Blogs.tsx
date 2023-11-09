import { NavLink } from "react-router-dom";
import SearchBox from "../SearchBox";

const Blogs = () => {
  return (
    <div className="container px-5 py-8 flex flex-col gap-8">
      <div className="flex justify-center">
        <SearchBox />
      </div>
      <article className=" odd:bg-slate-100 even:bg-slate-300 rounded-lg py-3 px-5 flex flex-col gap-6 text-BACKGROUND">
        <div className="flex items-center gap-8">
          <img className="w-14" alt="" src="" />
          <h3 className="text-2xl font-Viga text-RED"></h3>
        </div>

        <div className="px-5 text-COMMENT flex gap-3"></div>
        <p></p>
        <div className="w-full"></div>
        <NavLink
          to={`/blog/`}
          className="bg-CYAN w-fit px-8 py-2 rounded-lg text-BACKGROUND font-bold font-Viga"
        >
          Show More ...
        </NavLink>
      </article>
    </div>
  );
};

export default Blogs;
