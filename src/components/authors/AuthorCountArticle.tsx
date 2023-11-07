import { useSelector } from "react-redux";
import { IAuthor } from "../../interface";
import { RootState } from "../../store";
import { displayAuthorBlog } from "../../reducer/BlogSlice";

type AuthorCountArticleProps = Pick<IAuthor, "_id">;
const AuthorCountArticle = ({ _id: authorId }: AuthorCountArticleProps) => {
  const blogs = useSelector((state: RootState) =>
    displayAuthorBlog(state, authorId)
  );
  return (
    <div>{`${blogs.length ? blogs.length + " " + "Articles" : "keine Article"}`}</div>
  );
};

export default AuthorCountArticle;
