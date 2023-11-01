import { useSelector } from "react-redux";
import { RootState } from "../store";
import { displayUserById } from "../reducer/UserSlice";
import { IArticle } from "../interface";

type ShowAuthorProps = Pick<IArticle, "userId">;
const ShowAuthor = ({ userId }:ShowAuthorProps) => {
  const author = useSelector((state: RootState) =>
    displayUserById(state, userId)
  );
  return (
    <div>
      {author ? author.firstName + " " + author.lastName : "unbekannte Author"}
    </div>
  );
};

export default ShowAuthor;
