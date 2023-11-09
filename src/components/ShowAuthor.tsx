import { useSelector } from "react-redux";
import { IArticle } from "../interface";
import { RootState } from "../store";
import { displayUserById } from "../reducer/UserSlice";

type TShowAuthorProps=Pick<IArticle,"userId">
const ShowAuthor = ({userId}:TShowAuthorProps) => {
  const user=useSelector((state:RootState)=>displayUserById(state,userId))
  return (
    <div>
      von {user?.firstName+" "+user?.lastName}
    </div>
  );
}

export default ShowAuthor;