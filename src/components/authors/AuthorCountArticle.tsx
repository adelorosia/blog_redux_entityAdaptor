import { useSelector } from "react-redux";
import { IArticle } from "../../interface";
import { RootState } from "../../store";
import { displayAuthorsBlog } from "../../reducer/BlogSlice";

type TAuthorCountArticleProps = Pick<IArticle, "userId">;
const AuthorCountArticle = ({ userId }: TAuthorCountArticleProps) => {
  const authorArticle = useSelector((state: RootState) =>
    displayAuthorsBlog(state, userId)
  );
  return <div>{authorArticle.length} Articles</div>;
};

export default AuthorCountArticle;
