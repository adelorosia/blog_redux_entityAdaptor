import { useSelector } from "react-redux";
import { RootState } from "../store";
import { displayUserById } from "../reducer/UserSlice";

interface IshowAuthorProps{
  authorId:string
}
const ShowAuthor = ({authorId}:IshowAuthorProps) => {
  const author=useSelector((state:RootState)=>displayUserById(state,authorId))
  return (
    <div>
      {author?author.firstName+" "+author.lastName:"unbekannte Author"}
    </div>
  );
}

export default ShowAuthor;

