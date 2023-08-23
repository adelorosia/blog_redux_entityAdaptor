const Blog = () => {

    return (
      <div className="container px-5 py-8 flex flex-col gap-8">
        <article className=" odd:bg-slate-100 even:bg-slate-300 rounded-lg py-3 px-5 flex flex-col gap-6 text-BACKGROUND">
          <div className="flex items-center gap-8">
            <img className="w-14" src="" alt="" />
            <h3 className="text-2xl font-Viga text-RED"></h3>
          </div>
          <div className="flex gap-2 px-8 text-COMMENT">
       
          </div>
          <p></p>
          <div>
       
          </div>
          <div className="flex gap-4 justify-center">
            <button className="py-2 bg-RED rounded-lg font-Viga uppercase w-32" >
              Delete
            </button>
            <button className="py-2 bg-ORANGE rounded-lg font-Viga uppercase w-32" >
              Edit
            </button>
            <button
              className="py-2 bg-GREEN w-32 rounded-lg font-Viga uppercase w-30"
            
            >
              back
            </button>
          </div>
        </article>
      </div>
    );

};
export default Blog;
